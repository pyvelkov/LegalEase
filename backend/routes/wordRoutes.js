import { Router } from "express";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router();

router.post("/editWordFile", (req, res) => {
    const doc = getTemplateFromPath(
        resolve(
            __dirname,
            "../files/templates/Retainer Agreement - Corporate (for Corporation).docx"
        )
    );

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
