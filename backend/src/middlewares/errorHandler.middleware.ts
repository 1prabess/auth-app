import { ErrorRequestHandler } from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/http";
import { Response } from "express";
import AppError from "../utils/AppError";
import z from "zod";

const handleAppError = (res: Response, error: AppError) => {
  return res.status(error.statusCode).json({
    message: error.message,
    errorCode: error.errorCode,
  });
};

const handleZodError = (res: Response, error: z.ZodError) => {
  const errors = error.issues.map((err) => ({
    path: err.path.join("."),
    message: err.message,
  }));
  return res.status(BAD_REQUEST).json({ message: "Validation error", errors });
};

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(`Path: ${req.path} `, error);

  if (error instanceof AppError) {
    return handleAppError(res, error);
  }

  if (error instanceof z.ZodError) {
    return handleZodError(res, error);
  }

  return res
    .status(INTERNAL_SERVER_ERROR)
    .json({ messagge: "Internal server error" });
};

export default errorHandler;
