import express from "express";
import bodyParser from "body-parser";
import wordRoutes from "./routes/wordRoutes.js";
import rootRoute from "./routes/rootRoute.js";
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
        origin: [originEnvVar, "https://legal-ease-eight.vercel.app"],
        methods: "*",
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);
const port = process.env.PORT;

app.use(bodyParser.json());

app.use("/", rootRoute);
// Use the wordRoutes for /editWordFile route
app.use("/wordRoutes", wordRoutes);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
