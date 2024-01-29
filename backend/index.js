import express from "express";
import bodyParser from "body-parser";
import wordRoutes from "./routes/wordRoutes.js";
import templateRoutes from "./routes/template.js";
import testRoutes from "./routes/testRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();

const originEnvVar =
    process.env.NODE_ENV == "production"
        ? process.env.CLIENT_URL_PROD
        : process.env.CLIENT_URL_DEV;

// Enable CORS
app.use(
    cors({
        origin: [originEnvVar, "https://legal-ease-gray.vercel.app"],
        methods: "*",
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);
const port = process.env.PORT;

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({ ping: "pong" });
});

// Use the wordRoutes for /editWordFile route
app.use("/wordRoutes", wordRoutes);
app.use("/templates", templateRoutes);

// test routes - need to delete after
app.use("/test", testRoutes);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
