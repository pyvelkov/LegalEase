import makeRequest from "../fetchUtil";

export const getTest = async () => {
    return await makeRequest("test/testGet");
};
export const postTest = async (payload) => {
    return await makeRequest("test/testPost", "POST", payload);
};
