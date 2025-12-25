import AppErrorCode from "../constants/app-error-code";
import { HttpStatusCode } from "../constants/http";

class AppError extends Error {
  public statusCode: HttpStatusCode;
  public errorCode?: AppErrorCode;

  constructor(
    statusCode: HttpStatusCode,
    message: string,
    errorCode?: AppErrorCode
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}

export default AppError;
