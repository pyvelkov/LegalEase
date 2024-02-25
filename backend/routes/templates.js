import { Router } from "express";
import multer from "multer";
import pg from "pg";
import * as storage from "@google-cloud/storage";
import { Readable } from "stream";
import { getTemplateFields } from "../util/docUtils.js";

const router = Router();
const fileUpload = multer();

/* =================
 * Get ALL templates metadata (fields, date, etc.)
 * ================= */
router.get("/", async (req, res) => {
    // Establish new database connection
    const dbClient = new pg.Client();
    await dbClient.connect();

    // Configure SQL query to select template metadata for all available templates
    const templateSqlQuery = {
        text: "select TMP_UUID, TMP_NAME, TMP_DATE_CREATED, TMPF_FIELDS \
                from public.TEMPLATES join public.TEMPLATE_FIELDS \
                on TMP_UUID = TMPF_TMP_UUID",
        values: [],
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
 * Get specific template metadata (fields, date, etc.)
 * ================= */
router.get("/:templateId", async (req, res) => {
    // Establish new database connection
    const dbClient = new pg.Client();
    await dbClient.connect();

    // Configure SQL query to select all required template metadata
    const templateSqlQuery = {
        text: "select TMP_UUID, TMP_NAME, TMP_DATE_CREATED, TMPF_FIELDS \
                from public.TEMPLATES join public.TEMPLATE_FIELDS \
                on TMP_UUID = TMPF_TMP_UUID \
                where TMP_UUID = CAST ($1 as UUID)",
        values: [req.params.templateId],
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

    // Return 404 if no records found, otherwise should only be 1 record
    dbRes.rowCount > 0
        ? res.status(200).json(dbRes.rows[0])
        : res.status(404).send();
});

/* =================
 * Upload a template
 * ================= */
router.post(
    "/:templateId",
    fileUpload.single("templateFile"),
    async (req, res) => {
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
            text: "insert into public.TEMPLATES values ($1, $2, $3, to_timestamp($4/1000.0))",
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
            text: "insert into public.TEMPLATE_FIELDS values ($1, $2)",
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

export default router;
