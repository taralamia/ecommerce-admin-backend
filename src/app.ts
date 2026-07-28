import express from "express";
import healthRouter from "./routes/health.route";
import {logger} from "./middlewares/logger.middleware";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use("/api/v1", healthRouter);

export default app;