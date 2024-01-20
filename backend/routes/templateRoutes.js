import { Router } from "express";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import multer from "multer";
import pg from "pg";
import * as storage from "@google-cloud/Storage";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router();
const fileUpload = multer();

// Download template file
router.get("/:uuid", async (req, res) => {
    const dbClient = new pg.Client();
    await dbClient.connect();

    const sqlQuery = {
        text: 'select * from public."TEMPLATES" where "TMP_UUID" = $1',
        values: [req.params.uuid],
    };

    try {
        const dbRes = await dbClient.query(sqlQuery);
        // This is where we will return useful data later on once file i/o works.
        res.status(200).send("Template downloaded successfully.");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error downloading template: " + error);
    } finally {
        await dbClient.end();
    }
});

// Upload a template
router.post("/:uuid", fileUpload.single("templateFile"), async (req, res) => {
    const templatePath = `templates/${req.params.uuid}`;
    //const templateFile = req.file;

    // Create new storage client for GCS and upload file to path in bucket
    /*const storageClient = new storage.Storage();
    await storageClient.bucket("legalease").file(templatePath).save(templateFile);

    uploadFromMemory().catch(console.error);

    process.on('unhandledRejection', err => {
        console.error(err.message);
        process.exitCode = 1;
      })*/

    // Establish new database connection
    const dbClient = new pg.Client();
    await dbClient.connect();

    // Construct SQL query to insert new template record
    const sqlQuery = {
        text: 'INSERT INTO public."TEMPLATES" VALUES ($1, $2, $3)',
        values: [req.params.uuid, req.body.templateName, templatePath],
    };

    // Execute query in database and wait for success/fail response
    try {
        const dbRes = await dbClient.query(sqlQuery);
        res.status(200).send("Template uploaded successfully.");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error uploading template: " + error);
    } finally {
        await dbClient.end();
    }
});

export default router;
