enum AppErrorCode {
  InvalidAccessToken = "InvalidAccessToken",
  InvalidRefreshToken = "InvalidRefreshToken",
  MissingAccessToken = "MissingAccessToken",
  UserNotFound = "UserNotFound",
  EmailAlreadyExists = "EmailAlreadyExists",
  ValidationError = "ValidationError",
  InternalServerError = "InternalServerError",
  InvalidCredentials = "InvalidCredentials",
  InvalidVerificationCode = "InvalidVerificationCode",
  AccessDenied = "AccessDenied",
  SessionNotFound = "SessionNotFound",
  NotAuthenticated = "NotAuthenticated",
}

export default AppErrorCode;
