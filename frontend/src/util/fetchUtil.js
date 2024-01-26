const makeRequest = async (
    url,
    method = "GET",
    body = null,
    customHeaders = {},
    contentType = "application/json"
) => {
    try {
        const headers = {
            "Content-Type": contentType,
            ...customHeaders,
        };

        const response = await fetch(
            `${import.meta.env.VITE_SERVER_URL}/${url}`,
            {
                method,
                headers,
                body: body ? JSON.stringify(body) : null,
            }
        );

        // throw status code error if response failed.
        if (!response.ok) {
            throw new Error(`HTTP error! Status-code: ${response.status}`);
        }

        // Check the Content-Type of the response
        const responseType = response.headers.get("Content-Type") || "";

        // types of returns based on headers sent.
        // need to add return types as we go.
        if (responseType.includes("application/json")) {
            // return json
            return await response.json();
        } else {
            // return plain text as response if none of the above check
            return await response.text();
        }
    } catch (err) {
        console.error("Error making the request:", err.message);
        throw err;
    }
};

export default makeRequest;
