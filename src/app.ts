import express from "express";
import healthRouter from "./routes/health.route";
import {logger} from "./common/middlewares/logger.middleware";
import globalErrorHandler from "./common/middlewares/globalErrorHandler";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use("/api/v1", healthRouter);
app.use(globalErrorHandler);
export default app;