import AppErrorCode from "../constants/app-error-code";
import { CREATED, OK, UNAUTHORIZED } from "../constants/http";
import {
  emailSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  verifyCodeSchema,
} from "../schemas/auth.schema";
import { forgotPassword } from "../services/auth/forgot-password.service";
import { loginUser } from "../services/auth/login-user.service";
import { logoutUser } from "../services/auth/logout-user.service";
import { refreshUserToken } from "../services/auth/refresh-user-token.service";
import { registerUser } from "../services/auth/register-user.service";
import { resetPassword } from "../services/auth/reset-password.service";
import { verifyEmail } from "../services/auth/verify-email.service";
import { ApiSuccessResponse } from "../types/api.types";
import { User } from "../types/user.types";
import appAssert from "../utils/app-assert";
import catchErrors from "../utils/catchErrors";
import {
  clearAuthCookies,
  getAccessTokenCookieOptions,
  getRefreshTokenCookieOptions,
  setAuthCookies,
} from "../utils/cookies";

export const registerHandler = catchErrors(async (req, res) => {
  // validate request
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  // call registerUser service
  const { user, refreshToken, accessToken } = await registerUser(request);

  // prepare response
  const response: ApiSuccessResponse<{ user: User }> = {
    message: "User created successfully",
    data: { user },
  };

  // set cookies and return response
  return setAuthCookies({ res, refreshToken, accessToken })
    .status(CREATED)
    .json(response);
});

export const loginHandler = catchErrors(async (req, res) => {
  // validate request
  const request = loginSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  // call loginUser service
  const { user, refreshToken, accessToken } = await loginUser(request);

  // prepare typed response
  const response: ApiSuccessResponse<{ user: User }> = {
    message: "Login successful",
    data: { user },
  };

  // set cookies and return response
  return setAuthCookies({ res, refreshToken, accessToken })
    .status(OK)
    .json(response);
});

export const logoutHandler = catchErrors(async (req, res) => {
  // get access token from cookies
  const accessToken = req.cookies.accessToken as string | undefined;

  appAssert(
    accessToken,
    UNAUTHORIZED,
    "missing access token",
    AppErrorCode.MissingAccessToken
  );

  // call logoutUser service
  await logoutUser(accessToken);

  // clear refresh & access token cookies and return response
  const response: ApiSuccessResponse<never> = {
    message: "Logout successful",
  };

  return clearAuthCookies(res).status(OK).json(response);
});

export const refreshUserTokenHandler = catchErrors(async (req, res) => {
  // get refresh token from cookies
  const refreshToken = req.cookies.refreshToken as string | undefined;

  // call refreshUserToken service
  const { newRefreshToken, accessToken } = await refreshUserToken(
    refreshToken || ""
  );

  // if a new refresh token was issued (token rotation), replace the existing refresh token cookie
  if (newRefreshToken) {
    res.cookie("refreshToken", newRefreshToken, getRefreshTokenCookieOptions());
  }

  // set new access token cookie
  res.cookie("accessToken", accessToken, getAccessTokenCookieOptions());

  // return typed response
  const response: ApiSuccessResponse<never> = {
    message: "Access token refreshed successfully",
  };

  return res.status(OK).json(response);
});

export const verifyEmailHandler = catchErrors(async (req, res) => {
  // validate verification code
  const verificationCode = verifyCodeSchema.parse(req.params.code);

  // call verifyEmail service
  await verifyEmail(verificationCode);

  const response: ApiSuccessResponse<never> = {
    message: "Verification complete",
  };

  return res.status(OK).json(response);
});

export const forgotPasswordHandler = catchErrors(async (req, res) => {
  // validate email
  const email = emailSchema.parse(req.body.email);

  // call forgotPassword service
  await forgotPassword(email);

  const response: ApiSuccessResponse<never> = {
    message: "An email to reset password has been sent",
  };

  return res.status(OK).json(response);
});

export const resetPasswordHandler = catchErrors(async (req, res) => {
  // validate request
  const request = resetPasswordSchema.parse(req.body);

  // call resetPassword service
  const { user } = await resetPassword(request);

  const response: ApiSuccessResponse<{ user: User }> = {
    message: "Password reset complete",
    data: { user },
  };

  return res.status(OK).json(response);
});
