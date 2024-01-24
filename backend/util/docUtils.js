import { readFileSync, writeFileSync } from "fs";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";

// TODO: make this work with a file buffer instead of path
// Gets template file from path and returns a new DOCXTemplater object.
// ==> Consider adding optional parameters for docxtemplater options.
const getTemplateFromFile = (file) => {

    // Unzip the content of the file since word files are considered zipped files.?!
    const zip = new PizZip(file);

    // This will parse the template, and will throw an error if the template is
    // invalid, for example, if the template is "{firstName" (no closing tag)
    // === May need additional error handling ===
    return new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
    });
};

// Handle all tag type detection
const processTemplateFields = (uniqueFields) => {

    const availableFieldTypes = ["dropdown", "text", "date", "num"];
    let fields = [];

    uniqueFields.map((field) => {

        // Initialize name, type and options for each field
        let name = "", type = "", options = [];

        // Drop curly braces at beginning and end and split by chunks
        const splitResult = field.slice(1, -1).split("_");
        
        // Determine the type of field
        if (availableFieldTypes.includes(splitResult[0].toLowerCase())){
            type = splitResult[0];
        }
        else {
            // If not a standard field type
            type = "INVALID";
        }

        // Based on the type of field, find the field name and options (if applicable)
        switch (type){
            
            // Dropdown field type is special case since it contains list of options
            case "dropdown":
                
                // Take the whole tag after the first type identifier section
                // Name is everything up until first quote char
                // Everything after is options 
                splitResult.slice(1).map((tagSection) => {
                    if (!tagSection.includes("\"")){
                        name += " " + tagSection;
                    }
                    else {
                        options.push(tagSection.slice(1, -1));
                    }
                });
                break;
            
            case "INVALID":
                name = "INVALID";
                options = "INVALID";
                break;

            // For TEXT, DATE and NUM
            default:
                name = splitResult.slice(1).join(" ");
                options = "";

        }  

        fields.push({
            fieldName: name.trim(),
            fieldType: type,
            fieldOptions: options
        });
    });

    return fields;
};

// TODO: Call from template/:uuid/tags route
// Returns all unique tags from the given template
const getTemplateFields = (templateFile) => {

    const doc = getTemplateFromFile(templateFile);

    const fullDocText = doc.getFullText();

    // Apply regular expression to full document text and filter for unique matches only
    const uniqueDocFields = fullDocText.match(/({.[^}]+})/g).filter(
        (value, index, array) => {
            return array.indexOf(value) === index
        }); 

    return processTemplateFields(uniqueDocFields);
};

// TODO: change this to export function that returns tags instead
export { processTemplateFields, getTemplateFields };