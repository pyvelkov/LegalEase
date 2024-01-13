import express from "express";
import bodyParser from "body-parser";
import wordRoutes from "./routes/wordRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();

// Enable CORS
app.use(cors());
const port = process.env.PORT;

app.use(bodyParser.json());

// Use the wordRoutes for /editWordFile route
app.use("/", wordRoutes);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
