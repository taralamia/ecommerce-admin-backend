import { ErrorRequestHandler } from "express";
import handleError from "./handleError";
import sendResponse from "../utils/sendResponse";

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  const { statusCode, message } = handleError(error);

  sendResponse(res, {
    statusCode,
    success: false,
    message,
  });
};

export default globalErrorHandler;