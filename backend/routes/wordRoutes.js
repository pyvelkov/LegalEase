import { Router } from "express";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { getTemplateFromPath } from "../util/docUtils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router();

router.get("/templateTags", (req, res) => {

    // TODO: Implement template UUIDs

    const doc = getTemplateFromPath(resolve(__dirname,
        "../files/templates/Retainer Agreement - Corporate (for Corporation).docx"));

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
    
    const doc = getTemplateFromPath(resolve(__dirname,
        "../files/templates/Retainer Agreement - Corporate (for Corporation).docx"));

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
