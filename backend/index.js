import express from "express";
import bodyParser from "body-parser";
import wordRoutes from "./routes/wordRoutes.js";
import templatesRoutes from "./routes/templates.js";
import templatesFillRoutes from "./routes/templatesFill.js";
import helmet from "helmet";
import * as auth from "./auth.js";
import { rateLimiter } from "./rateLimiter.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const originEnvVar =
    process.env.NODE_ENV == "production"
        ? process.env.CLIENT_URL_PROD
        : process.env.CLIENT_URL_DEV;

// MAIN APP ROUTER
const app = express();

// Use helmet
app.use(helmet());

// Turn on rate limiting for all routes
app.use(rateLimiter());

// Enable CORS
app.use(
    cors({
        origin: [originEnvVar, "https://legal-ease-gray.vercel.app"],
        methods: "*",
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);

// SUB ROUTERS
const templatesRouter = templatesRoutes; // /template/
const templatesFillRouter = templatesFillRoutes; // /template/:uuid/filled

// MAIN APP ROUTER CONFIG
//app.use("/wordRoutes", wordRoutes);
app.use("/templates", auth.isAuthorized(), templatesRouter);

// SUB ROUTERS CONFIG
// ------------------
// Template router config
templatesRouter.use("/:templateId/filled", templatesFillRouter);

// PING ROUTE
app.get("/", (req, res) => {
    res.json({ ping: "pong" });
});

app.use(bodyParser.json());

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
