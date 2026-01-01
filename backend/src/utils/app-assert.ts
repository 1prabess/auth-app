import AppErrorCode from "../constants/app-error-code";
import { HttpStatusCode } from "../constants/http";
import assert from "node:assert";
import AppError from "./app-error";

type AppAssert = (
  condition: any,
  httpStatusCode: HttpStatusCode,
  message: string,
  appErrorCode: AppErrorCode
) => asserts condition;

const appAssert: AppAssert = (
  condition,
  httpStatusCode,
  message,
  appErrorCode
) => {
  return assert(condition, new AppError(httpStatusCode, message, appErrorCode));
};

export default appAssert;
