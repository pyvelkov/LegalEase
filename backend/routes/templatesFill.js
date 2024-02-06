import { Router } from "express";
import multer from "multer";
import pg from "pg";
import * as storage from "@google-cloud/storage";
import * as stream from "stream";
import { fillTemplate } from "../util/docUtils.js";
import getRawBody from "raw-body";

//  mergeParams allows us to get the URL params from the template (previous) router
const router = Router({ mergeParams: true });
const upload = multer();

router.get("/", async (req, res) => {
    res.status(404).send("Route not implemented yet.");
});

// Fill the specified template with values
router.post("/", upload.none(), async (req, res) => {
    // Configure SQL query to select all required template metadata
    const templateSqlQuery = {
        text: "select TMP_UUID, TMP_NAME, TMP_PATH \
                from public.TEMPLATES \
                where TMP_UUID = CAST ($1 as UUID)",
        values: [req.params.templateId],
    };

    // Establish new database connection
    const dbClient = new pg.Client();
    await dbClient.connect();

    // Execute queries in database and wait for success/fail response
    let dbRes;
    try {
        dbRes = await dbClient.query(templateSqlQuery);
    } catch (error) {
        console.error(error);
        res.status(500).send(
            "Error getting template metadata from DB: " + error
        );
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

    // Cast incoming field values from string to JSON
    const fieldValues = JSON.parse(req.body.fields);

    const filledTemplateFile = fillTemplate(templateFileBuffer, fieldValues);

    // Send back file response
    const responseStream = new stream.PassThrough();
    responseStream.end(filledTemplateFile);

    res.set("Content-disposition", "attachment; filename=" + req.body.fileName);
    res.set("Content-Type", "text/plain");

    responseStream.pipe(res);
});

export default router;
