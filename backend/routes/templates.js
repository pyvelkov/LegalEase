import { Router } from "express";
import multer from "multer";
import pg from "pg";
import * as storage from "@google-cloud/storage";
import { Readable } from "stream";
import { getTemplateFields } from "../util/docUtil.js";

const router = Router();
const fileUpload = multer();

/* =================
 * Get ALL templates metadata (fields, date, etc.)
 * ================= */
router.get("/", async (req, res) => {
    const userId = req.auth.payload.sub;

    // Establish new database connection
    const dbClient = new pg.Client();
    await dbClient.connect();

    // Configure SQL query to select template metadata for all available templates
    const templateSqlQuery = {
        text: "select tmp_uuid, tmp_name, tmp_date_created, tmpf_fields \
                from public.templates_view \
                join public.template_fields \
                on tmp_uuid = tmpf_tmp_uuid \
                where tmp_user_id = $1",
        values: [userId],
    };

    // Execute queries in database and wait for success/fail response
    let dbRes;
    try {
        dbRes = await dbClient.query(templateSqlQuery);
    } catch (error) {
        console.error(error);
        res.status(500).send(
            "Error getting ALL templates metadata from DB: " + error
        );
        return;
    } finally {
        await dbClient.end();
    }

    // Return 204 if no records found
    dbRes.rowCount > 0
        ? res.status(200).json({ templates: dbRes.rows })
        : res.status(204).send();
});

/* =================
 * Get specified template file
 * ================= */
router.get("/:templateId", async (req, res) => {
    const userId = req.auth.payload.sub;

    // Establish new database connection
    const dbClient = new pg.Client();
    await dbClient.connect();

    // Configure SQL query to select all required template metadata
    const templateSqlQuery = {
        text: "select tmp_uuid, tmp_name, tmp_date_created, tmpf_fields \
                from public.templates_view \
                join public.template_fields \
                on tmp_uuid = tmpf_tmp_uuid \
                where tmp_uuid = cast ($1 as uuid) \
                and tmp_user_id = $2",
        values: [req.params.templateId, userId],
    };

    // Execute queries in database and wait for success/fail response
    let dbRes;
    try {
        dbRes = await dbClient.query(templateSqlQuery);
    } catch (error) {
        console.error(error);
        res.status(500).send(
            "Error getting template metadata from DB: " + error
        );
        return;
    } finally {
        await dbClient.end();
    }

    // Return 404 if no template record found
    if (dbRes.rowCount < 1) {
        res.status(404).send();
        return;
    }

    // Get template path value
    const templatePath = dbRes.rows[0].tmp_path;

    // Create new storage client for GCS and download template file from path
    let templateFile, templateFileBuffer;
    try {
        const storageClient = new storage.Storage();
        templateFile = await storageClient
            .bucket("legalease")
            .file(templatePath);
        templateFileBuffer = await getRawBody(templateFile.createReadStream());
    } catch (error) {
        console.error(error);
        res.status(500).send("Error downloading template file from GCS.");
        return;
    }

    // Send back file response
    const responseStream = new stream.PassThrough();
    responseStream.end(templateFileBuffer);
    res.set("Content-Type", "text/plain");
    res.set("Content-disposition", "attachment; filename=" + req.body.fileName);
    res.set("Access-Control-Expose-Headers", "Content-disposition");
    responseStream.pipe(res);
});

/* =================
 * Upload a template
 * ================= */
router.post(
    "/:templateId",
    fileUpload.single("templateFile"),
    async (req, res) => {
        const userId = req.auth.payload.sub;

        const templatePath = `templates/${req.params.templateId}/${req.file.originalname}`;
        const templateFile = req.file.buffer;

        // Create new storage client for GCS and upload file to path in bucket
        try {
            const storageClient = new storage.Storage();
            await storageClient
                .bucket("legalease")
                .file(templatePath)
                .save(Readable.from(templateFile));
        } catch (error) {
            console.error(error);
            res.status(500).send("Error uploading template file to GCS.");
            return;
        }

        // Construct TEMPLATE SQL query to insert new template record
        const templateUuid = req.params.templateId,
            templateName = req.body.templateName,
            templateDateCreated = Date.now(); // Divide by 100 later to convert ms to s

        const templateSqlQuery = {
            text: "insert into public.templates_view \
                   values ($1, $2, $3, to_timestamp($4/1000.0), $5)",
            values: [
                templateUuid,
                templateName,
                templatePath,
                templateDateCreated,
                userId,
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
        const dbClient = new pg.Client();
        await dbClient.connect();

        // Execute queries in database and wait for success/fail response
        try {
            const templateQueryRes = await dbClient.query(templateSqlQuery);
            const templateFieldQueryRes = await dbClient.query(
                templateFieldSqlQuery
            );
            res.status(200).send("Template uploaded successfully.");
        } catch (error) {
            // Consider adding code here to delete template file if DB write failed.
            console.error(error);
            res.status(500).send(
                "Error writing template records to DB: " + error
            );
            return;
        } finally {
            await dbClient.end();
        }
    }
);

// Delete the specified template record
router.delete("/:templateId", async (req, res) => {
    const userId = req.auth.payload.sub;
    const templatePath = `templates/${req.params.templateId}/`;

    // Create new storage client for GCS and delete file in bucket
    try {
        const storageClient = new storage.Storage();
        await storageClient.bucket("legalease").deleteFiles({
            prefix: templatePath,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting template file from GCS.");
        return;
    }

    // Construct TEMPLATE SQL query to insert new template record
    const templateUuid = req.params.templateId;
    const templateDeleteSqlQuery = {
        text: "delete from public.templates_view \
               where tmp_uuid = $1 \
               and tmp_user_id = $2",
        values: [templateUuid, userId],
    };

    // Establish new database connection
    const dbClient = new pg.Client();
    await dbClient.connect();

    // Execute queries in database and wait for success/fail response
    let templateQueryRes;
    try {
        templateQueryRes = await dbClient.query(templateDeleteSqlQuery);
    } catch (error) {
        // Consider adding code here to delete template file if DB write failed.
        console.error(error);
        res.status(500).send("Error deleting template record in DB: " + error);
        return;
    } finally {
        await dbClient.end();
    }

    // Return 404 if no records deleted, otherwise should only be 1 record
    templateQueryRes.rowCount > 0
        ? res.status(200).send("Template deleted successfully.")
        : res.status(404).send();
});

export default router;
