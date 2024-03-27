import fetch from "node-fetch";

const getUserInfo = async (token, tokenPayload) => {
    //Get userInfo URL from the decoded token
    const userInfoURL = tokenPayload.iss + "userInfo";

    const userInfoResponse = await fetch(userInfoURL, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });

    return userInfoResponse.json();
};

export { getUserInfo };
