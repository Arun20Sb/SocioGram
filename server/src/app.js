import express from "express";
import { router } from "./routes/user.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS, // Allow requests from the specified origin
    credentials: true, // Allow credentials (cookies, authentication headers, etc.) to be sent
  })
);

// configurations:
app.use(express.json()); // Parses JSON bodies
app.use(express.urlencoded({ extended: true })); // Parses form data
app.use(express.static("public")); // Serves static files
app.use(cookieParser()); // access and refresh token

// secured routes:
app.use("/api/v1/users", router);

export { app };
