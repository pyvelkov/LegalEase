import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";

// Uses provided template file and returns a new DOCXTemplater object.
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

// Handle all tag type, name and options detection
const processTemplateFields = (uniqueFields) => {
    // All currently supported field types
    const availableFieldTypes = [
        "text",
        "num",
        "date",
        "dropdown",
        "multi",
        "option",
        "if",
    ];
    let fields = [];
    let commitField = false;

    // Queue used to determine parent of a field when applicable
    let parents = [];
    let parentLevelCounter = 0;

    uniqueFields.map((field) => {
        // Initialize name, type, options and dependencies for each field
        let name = "",
            type = "",
            options = [],
            dependencies = [];

        // Drop curly braces at beginning and end and split by chunks
        const splitResult = field.slice(1, -1).split("_");
        // Drop # or / at beginning of tag if present
        type = splitResult[0].replaceAll(/[#/]/g, "");

        // If not a valid standard field type
        if (!availableFieldTypes.includes(type.toLowerCase())) {
            type = "INVALID";
        }

        // Name for all tags is everything after the tag type except invalid
        name = type != "INVALID" ? splitResult.slice(1).join(" ") : "INVALID";

        // Determine if current tag is opening tag, closing tag or just regular field
        // based on first character of tag
        if (field[1] == "#") {
            // opening tag
            let parentQueueName;
            if (type == "dropdown" || type == "if") {
                parentLevelCounter++;
                parentQueueName = parentLevelCounter + "." + name;
            } else {
                // for dropdown or multi options
                parentQueueName = name;
            }
            parents.push(parentQueueName);
        } else if (field[1] == "/") {
            // closing tag
            if (type == "dropdown") {
                const fieldNameIdx = parents.findIndex((element) =>
                    element.includes(parentLevelCounter + ".")
                );
                // Get all options
                options = parents.splice(fieldNameIdx + 1);
                // Remove finished field name from parents queue
                parents.pop();
                parentLevelCounter--;
                commitField = true;
            } else if (type == "if") {
                parents.pop();
                parentLevelCounter--;
                commitField = false;
            } else {
                // for options tags
                commitField = false;
            }
        } else {
            // regular field (text, date, num)
            options = type == "INVALID" ? "INVALID" : "";
            commitField = true;
        }

        // OLDER LOGIC, leaving as comment for future reference
        // Based on the type of field, find the field name and options (if applicable)
        /*switch (type) {
            // Dropdown and multi types are special cases since they contain list of options
            case "multi":
            // fall through
            case "dropdown":
                if (field[1] == "#") {
                    // Start tag '#'
                    parentLevelCounter++;
                    parents.push(parentLevelCounter + "." + name);
                } else {
                    // End tag '/'
                    const fieldNameIdx = parents.findIndex((element) =>
                        element.includes(parentLevelCounter + ".")
                    );
                    // Get all options
                    options = parents.splice(fieldNameIdx + 1);
                    // Remove finished field name from parents queue
                    parents.pop();
                    parentLevelCounter--;
                    commitField = true;
                }
                break;

            case "option":
                // Options for fields do not need to be added as fields, only to parents queue
                if (field[1] == "#") parents.push(name);
                commitField = false;
                break;

            case "INVALID":
                options = "INVALID";
                commitField = true;
                break;

            // For TEXT, DATE and NUM
            default:
                options = "";
                commitField = true;
        }*/
        if (commitField) {
            // Set dependencies
            if (parentLevelCounter > 0) {
                const parentFieldNameIdx = parents.findIndex((element) =>
                    element.includes(parentLevelCounter + ".")
                );
                const parentFieldName = parents[parentFieldNameIdx].replace(
                    parentLevelCounter + ".",
                    ""
                );
                // Handles case for IF dependencies
                if (parents[parentFieldNameIdx] != parents.at(-1)) {
                    dependencies = parentFieldName + ":" + parents.at(-1);
                } else {
                    dependencies = parentFieldName;
                }
            } else {
                dependencies = "";
            }

            fields.push({
                fieldTag: field,
                fieldName: name.trim(),
                fieldType: type,
                fieldOptions: options,
                fieldDependencies: dependencies,
            });
            commitField = false;
        }
    });

    return fields;
};

// Returns all unique template fields in JSON object with field types and options
const getTemplateFields = (templateFile) => {
    const doc = getTemplateFromFile(templateFile);

    const fullDocText = doc.getFullText();

    // Apply regular expression to full document text and filter for unique matches only
    const uniqueDocFields = fullDocText
        .match(/({.[^}]+})/g)
        .filter((value, index, array) => {
            return array.indexOf(value) === index;
        });

    return processTemplateFields(uniqueDocFields);
};

// Returns map of fields and values ready to use with docxtemplater
const prepareFieldsForFill = (fieldValues) => {
    let preparedFields = {};

    // Populate field values to the corresponding tag
    fieldValues.map((field) => {
        // Rebuild full tag name from field type and name
        let tagName = `${field.fieldType}_${field.fieldName.replaceAll(
            " ",
            "_"
        )}`;

        // Handle dropdown and multi options in a special case
        if (["dropdown", "multi"].includes(field.fieldType)) {
            // Set main dropdown or multi tag to true
            preparedFields[tagName] = true;

            // Set all of the selected options to true
            if (Array.isArray(field.fieldValue)) {
                // This is for multi
                field.fieldValue.map((option) => {
                    preparedFields["option_" + option] = true;
                });
            } else {
                // This is for dropdown (single fieldValue)
                preparedFields["option_" + field.fieldValue] = true;
            }
        } else {
            // For regular fields [text, date, num]
            preparedFields[tagName] = field.fieldValue;
        }
    });

    return preparedFields;
};

// Fills given template with the provided field values
const fillTemplate = (templateFile, fieldValues) => {
    const doc = getTemplateFromFile(templateFile);

    // Get map of fields and values ready to use with docxtemplater
    const preparedFieldValues = prepareFieldsForFill(fieldValues);

    // Render tags with values and return filled template
    doc.render(preparedFieldValues);
    const filledTemplate = doc
        .getZip()
        .generate({ type: "nodebuffer", compression: "DEFLATE" });

    return filledTemplate;
};

const getGCPCredentials = () => {
    // for Vercel, use environment variables
    return process.env.GCP_PRIVATE_KEY
        ? {
              credentials: {
                  client_email: process.env.GCP_SERVICE_ACCOUNT_EMAIL,
                  private_key: process.env.GCP_PRIVATE_KEY,
              },
              projectId: process.env.GCP_PROJECT_ID,
          }
        : // for local development, use gcloud CLI
          {};
};

const pgConfig = () => {
    return {
        connectionString: process.env.PGURL,
    };
};

export { fillTemplate, getTemplateFields, getGCPCredentials, pgConfig };
