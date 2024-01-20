import { readFileSync, writeFileSync } from "fs";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";

// Gets template file from path and returns a new DOCXTemplater object.
// ==> Consider adding optional parameters for docxtemplater options.
const getTemplateFromPath = (path) => {
    const template = readFileSync(path, "binary");

    // Unzip the content of the file since word files are considered zipped files.?!
    const zip = new PizZip(template);

    // This will parse the template, and will throw an error if the template is
    // invalid, for example, if the template is "{firstName" (no closing tag)
    // === May need additional error handling ===
    return new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
    });
};

export { getTemplateFromPath };