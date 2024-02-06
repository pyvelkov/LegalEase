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
 * @param {String} UUID {the generated UUID from the frontend}
 * @return {Response} returns the appropriate response from backend
 */
export const getSpecificTemplate = async (UUID) => {
    return await makeRequest(`templates/${UUID}`);
};
