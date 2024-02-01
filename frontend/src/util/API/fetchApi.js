import makeRequest from "../fetchUtil";

export const uploadTemplate = async (UUID, payload) => {
    return await makeRequest(`templates/${UUID}`, "POST", payload);
};

export const getUploadedDocuments = async () => {
    return await makeRequest("templates/");
};
