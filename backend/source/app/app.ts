import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import stockRoutes from "../api/routes/stock.routes";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";

const VERSION = "/api";

const app = express();

const env = process.env.NODE_ENV;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (env === "development") {
    app.use(morgan("dev"));
}
// setting up the environment variables according to the environment i.e production/ development
if (env === "development") {
    dotenv.config({
        path: path.join(__dirname, "../", "../", ".env.development"),
    });
} else {
    dotenv.config({
        path: path.join(__dirname, "../", "../", ".env.production"),
    });
}

// adding routes

app.use(VERSION, stockRoutes);

export default app;
