import { Router } from "express";
import multer from "multer";
import pg from "pg";
import * as storage from "@google-cloud/storage";
import * as stream from "stream";
import {
    getTemplateFields,
    getGCPCredentials,
    pgConfig,
} from "../util/docUtil.js";

const router = Router();
const fileUpload = multer();

/* =================
 * Upload a standard template (ONLY FOR legalease account)
 * ================= */
router.post(
    "/:templateId",
    fileUpload.single("templateFile"),
    async (req, res) => {
        const userId = req.auth.payload.sub;

        if (userId != "google-oauth2|105395624693334090571") {
            // Admin route only accessible by legalease account
            res.status(403).send("Not authorized to use this route.");
            return;
        }

        const templatePath = `templates/${req.params.templateId}/${req.file.originalname}`;
        const templateFile = req.file.buffer;

        // Construct TEMPLATE SQL query to insert new template record
        const templateUuid = req.params.templateId,
            templateName = req.body.templateName,
            templateDateCreated = Date.now(); // Divide by 100 later to convert ms to s

        const templateSqlQuery = {
            text: "insert into public.standard_templates \
                   values ($1, $2, $3, to_timestamp($4/1000.0), 'SYSTEM')",
            values: [
                templateUuid,
                templateName,
                templatePath,
                templateDateCreated,
            ],
        };

        // Get all available template fields
        const templateFields = getTemplateFields(templateFile);

        // Construct TEMPLATE_FIELDS SQL query to insert new template fields record.
        const templateFieldSqlQuery = {
            text: "insert into public.template_fields \
                   values ($1, $2)",
            values: [templateUuid, JSON.stringify(templateFields)],
        };

        // Establish new database connection
        const dbClient = new pg.Client(pgConfig());
        await dbClient.connect();

        // Execute queries in database and wait for success/fail response
        try {
            const templateFieldQueryRes = await dbClient.query(
                templateFieldSqlQuery
            );
            const templateQueryRes = await dbClient.query(templateSqlQuery);
        } catch (error) {
            console.error(error);
            res.status(500).send(
                "Error writing template records to DB: " + error
            );
            return;
        } finally {
            await dbClient.end();
        }

        // Create new storage client for GCS and upload file to path in bucket
        try {
            const storageClient = new storage.Storage(getGCPCredentials());
            await storageClient
                .bucket("legalease")
                .file(templatePath)
                .save(stream.Readable.from(templateFile));
        } catch (error) {
            console.error(error);
            res.status(500).send("Error uploading template file to GCS.");
            return;
        }
        res.status(200).send("Template uploaded successfully.");
    }
);

// Delete the specified template record (ONLY FOR legalease account)
router.delete("/:templateId", async (req, res) => {
    const userId = req.auth.payload.sub;

    if (userId != "google-oauth2|105395624693334090571") {
        // Admin route only accessible by legalease account
        res.status(403).send("Not authorized to use this route.");
        return;
    }

    // Construct TEMPLATE SQL query to insert new template record
    const templateUuid = req.params.templateId;
    const templateDeleteSqlQuery = {
        text: "delete from public.standard_templates \
               where tmp_uuid = $1 \
               and tmp_user_id = 'SYSTEM'",
        values: [templateUuid],
    };

    // Establish new database connection
    const dbClient = new pg.Client(pgConfig());
    await dbClient.connect();

    // Execute queries in database and wait for success/fail response
    let templateQueryRes;
    try {
        templateQueryRes = await dbClient.query(templateDeleteSqlQuery);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting template record in DB: " + error);
        return;
    } finally {
        await dbClient.end();
    }

    // Return 404 if no records deleted, otherwise should only be 1 record
    // Only delete template file if we deleted a record in the DB already
    if (templateQueryRes.rowCount > 0) {
        const templatePath = `templates/${req.params.templateId}/`;

        // Create new storage client for GCS and delete file in bucket
        try {
            const storageClient = new storage.Storage(getGCPCredentials());
            await storageClient.bucket("legalease").deleteFiles({
                prefix: templatePath,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send("Error deleting template file from GCS.");
            return;
        }
        res.status(200).send("Template deleted successfully.");
    } else {
        res.status(404).send();
    }
});

export default router;
