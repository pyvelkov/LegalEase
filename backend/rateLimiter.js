import { rateLimit } from "express-rate-limit";

const rateLimiter = (req, res, next) => {
    return rateLimit({
        windowMs: 1 * 60 * 1000, // time window for limit - 1 minute
        limit: 30, // Limit each IP to 30 requests per `window` (here, per 1 minute).
        standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
        // store: ... , // Redis, Memcached, etc. See below.
    });
};

export { rateLimiter };
