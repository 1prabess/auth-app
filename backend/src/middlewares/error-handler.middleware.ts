import { ErrorRequestHandler } from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/http";
import { Response } from "express";
import AppError from "../utils/app-error";
import z from "zod";
import { ApiErrorResponse } from "../types/api.types";

const handleAppError = (res: Response, error: AppError) => {
  const response: ApiErrorResponse = {
    message: error.message,
    errorCode: error.errorCode,
  };
  return res.status(error.statusCode).json(response);
};

const handleZodError = (res: Response, error: z.ZodError) => {
  const firstError = error.issues[0];

  const response: ApiErrorResponse = {
    message: "Invalid input",
    errorCode: "VALIDATION_ERROR",
    validationError: {
      path: firstError.path.join("."),
      message: firstError.message,
    },
  };

  return res.status(BAD_REQUEST).json(response);
};

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(`Path: ${req.path} `, error);

  if (error instanceof AppError) {
    return handleAppError(res, error);
  }

  if (error instanceof z.ZodError) {
    return handleZodError(res, error);
  }

  return res.status(INTERNAL_SERVER_ERROR).json({
    message: "Internal server error",
    errorCode: "INTERNAL_SERVER_ERROR",
  });
};

export default errorHandler;
