import { auth } from "express-oauth2-jwt-bearer";

// Checks if bearer token is valid
// Valid = 200, Invalid = 401
const isAuthorized = (req, res, next) => {
    // Will need to move these options to ENV file later
    return auth({
        audience: "localhost:5000",
        issuerBaseURL: `https://dev-rg5i0swetew6scr4.us.auth0.com/`,
    });
};

export { isAuthorized };
