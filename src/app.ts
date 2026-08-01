import express from "express";
import routes from "./routes/index";
import {logger} from "./common/logger/logger.middleware";
import globalErrorHandler from "./common/errors/globalErrorHandler";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use("/api/v1", routes);
app.use(globalErrorHandler);
export default app;