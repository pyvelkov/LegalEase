import makeRequest from "../fetchUtil";

/**
 * Request to upload a template with a UUID generated in dropzone component
 *
 * @param {String} UUID {the generated UUID from the frontend}
 * @param {FormData} payload {the body payload you are sending}
 * @return {Response} returns the appropriate response from backend
 */
export const uploadTemplate = async (UUID, payload) => {
    return await makeRequest(`templates/${UUID}`, "POST", payload);
};

/**
 * Request to get all uploaded templates to populate the Document Library
 *
 * @return {Response} returns the appropriate response from backend
 */
export const getUploadedDocuments = async () => {
    return await makeRequest("templates/");
};

/**
 * Request to get a specific template with the UUID
 *
 * @param {String} UUID {template record UUID}
 * @return {Response} returns the appropriate response from backend
 */
export const getSpecificTemplate = async (UUID) => {
    return await makeRequest(`templates/${UUID}`);
};

/**
 * Request to send the filled data of unique fields in each uploaded document from "templates" table.
 * Once filled sends file back to frontend.
 *
 * @param {string} UUID {template record UUID}
 * @param {FormData} payload {the body payload with filled in field values}
 * @return {Response} returns the filled in file as a reabable stream that is turned into a blob in frontend.
 */
export const fillDownloadTemplate = async (UUID, payload) => {
    return await makeRequest(`templates/${UUID}/filled`, "POST", payload);
};

/**
 * Request to delete a template record with UUID.
 *
 * @param {String} UUID {template record UUID}
 * @return {Response} returns appropriate response from backend.
 */
export const deleteTemplate = async (UUID) => {
    return await makeRequest(`templates/${UUID}`, "DELETE");
};
