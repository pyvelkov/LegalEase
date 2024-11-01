import makeRequest from "../fetchUtil";

/**
 * Request to upload a template with a UUID generated in dropzone component
 *
 * @param {String} UUID {the generated UUID from the frontend}
 * @param {FormData} payload {the body payload you are sending}
 * @param {String} token {the authentication user token to be sent}
 * @return {Response} returns the appropriate response from backend
 */
export const uploadTemplate = async (UUID, payload, token) => {
    return await makeRequest(token, `templates/${UUID}`, "POST", payload);
};

/**
 * Request to get all uploaded templates to populate the Document Library
 *
 * @param {String} token {the authentication user token to be sent}
 * @return {Response} returns the appropriate response from backend
 */
export const getUploadedDocuments = async (token) => {
    return await makeRequest(token, "templates/");
};

/**
 * Request to get a specific template with the UUID
 *
 * @param {String} UUID {template record UUID}
 * @param {String} token {the authentication user token to be sent}
 * @return {Response} returns the appropriate response from backend
 */
export const getSpecificTemplate = async (UUID, token) => {
    return await makeRequest(token, `templates/${UUID}/info`);
};

/**
 * Request to send the filled data of unique fields in each uploaded document from "templates" table.
 * Once filled sends file back to frontend.
 *
 * @param {string} UUID {template record UUID}
 * @param {FormData} payload {the body payload with filled in field values}
 * @param {String} token {the authentication user token to be sent}
 * @return {Response} returns the filled in file as a reabable stream that is turned into a blob in frontend.
 */
export const fillDownloadTemplate = async (UUID, payload, token) => {
    return await makeRequest(
        token,
        `templates/${UUID}/filled`,
        "POST",
        payload
    );
};

/**
 * Request to get a specific template file with the UUID
 *
 * @param {String} UUID {template record UUID}
 * @param {String} token {the authentication user token to be sent}
 * @return {Response} returns the appropriate file for the template from backend
 */
export const getSpecificTemplateFile = async (UUID, token) => {
    return await makeRequest(token, `templates/${UUID}`);
};

/**
 * Request to delete a template record with UUID.
 *
 * @param {String} UUID {template record UUID}
 * @param {String} token {the authentication user token to be sent}
 * @return {Response} returns appropriate response from backend.
 */
export const deleteTemplate = async (UUID, token) => {
    return await makeRequest(token, `templates/${UUID}`, "DELETE");
};
