/**
 * Generalized function for handling different kinds of fetch requests.
 *
 * @param {string} url {the url to be used in the route for backend}
 * @param {string} [method="GET"] {the fetch method as a string}
 * @param {RequestInit.body} [body=null] {the body (if any) as a payload}
 * @param {Object} [customHeaders={}]
 * @return {Response} {The response from the backend}
 */
const makeRequest = async (
    url,
    method = "GET",
    body = null,
    customHeaders = {}
    // contentType = "application/json"
) => {
    try {
        const headers = {
            // "Content-Type": contentType,
            ...customHeaders,
        };

        const response = await fetch(
            `${import.meta.env.VITE_SERVER_URL}/${url}`,
            {
                method,
                headers,
                body: body
                    ? body instanceof FormData
                        ? body
                        : JSON.stringify(body)
                    : null,
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
        } else if (responseType.includes("text/plain")) {
            // return plain text as response if none of the above check
            return await response.text();
        } else {
            return await response;
        }
    } catch (err) {
        console.error("Error making the request:", err.message);
        throw err;
    }
};

export default makeRequest;
