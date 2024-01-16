import { Router } from "express";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { readFileSync, writeFileSync } from "fs";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router();

router.get("/templateTags", (req, res) => {

    // TODO: Implement template UUIDs

    // Read in template file
    // TODO: Add all this boiletplate docxtemplater code into utility function.
    const templatePath = resolve(
        __dirname,
        "../files/templates/Retainer Agreement - Corporate (for Corporation).docx"
    );
    const template = readFileSync(templatePath, "binary");

    // Unzip the content of the file since word files are considered zipped files.?!
    const zip = new PizZip(template);

    // This will parse the template, and will throw an error if the template is
    // invalid, for example, if the template is "{firstName" (no closing tag)
    // === May need additional error handling ===
    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
    });

    const fullDocText = doc.getFullText();

    // Apply regular expression to full document text and filter for unique matches only
    const uniqueDocTags = fullDocText.match(/({\w+})/g).filter(
        (value, index, array) => {
            return array.indexOf(value) === index
        });

    // Structure response JSON object
    let tags = [];
    uniqueDocTags.forEach((tag) => {
        tags.push({
            tagName: tag.slice(1, -1),
            tagType: "text"
        });
    });

    res.json(tags);

});

router.post("/editWordFile", (req, res) => {
    const templatePath = resolve(
        __dirname,
        "../files/templates/Retainer Agreement - Corporate (for Corporation).docx"
    );
    const template = readFileSync(templatePath, "binary");
    // Unzip the content of the file since word files are considered zipped files.?!
    const zip = new PizZip(template);

    // This will parse the template, and will throw an error if the template is
    // invalid, for example, if the template is "{firstName" (no closing tag)
    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
    });

    const data = req.body;

    // apparently not needed since v4 of docxtemplater
    // doc.setOptions({
    //     delimiters: {
    //         start: "{{",
    //         end: "}}",
    //     },
    // });

    doc.setData(data);

    try {
        doc.render();
        const output = doc
            .getZip()
            .generate({ type: "nodebuffer", compression: "DEFLATE" });
        const outputPath = resolve(
            __dirname,
            "../files/generatedFiles/output.docx"
        );
        writeFileSync(outputPath, output);
        res.send("Word file successfully edited.");
    } catch (error) {
        res.status(500).send("Error editing Word file: " + error);
    }
});

export default router;
