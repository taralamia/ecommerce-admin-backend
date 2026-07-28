import { ZodError } from "zod";
import { QueryFailedError } from "typeorm";
import AppError from "./AppError";

interface ErrorResponse {
  statusCode: number;
  message: string;
}

const handleError = (error: unknown): ErrorResponse => {
  /**
   * Custom application errors
   */
  if (error instanceof AppError) {
    return {
      statusCode: error.statusCode,
      message: error.message,
    };
  }

  /**
   * Zod validation errors
   */
  if (error instanceof ZodError) {
    return {
      statusCode: 400,
      message: error.issues.map((issue) => issue.message).join(", "),
    };
  }

  /**
   * Database errors
   */
  if (error instanceof QueryFailedError) {
    return {
      statusCode: 400,
      message: "Database query failed.",
    };
  }

  /**
   * Default fallback
   */
  return {
    statusCode: 500,
    message: "Internal Server Error",
  };
};

export default handleError;