import AppErrorCode from "../constants/appErrorCode";
import { HttpStatusCode } from "../constants/http";
import assert from "node:assert";
import AppError from "./AppError";

type AppAssert = (
  condition: any,
  httpStatusCode: HttpStatusCode,
  message: string,
  appErrorCode?: AppErrorCode
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
