import { APP_ORIGIN } from "../constants/env";
import { CREATED, OK, UNAUTHORIZED } from "../constants/http";
import {
  emailSchema,
  loginSchema,
  registerSchema,
  verifyCodeSchema,
} from "../schemas/auth.schema";
import { loginUser } from "../services/auth/loginUser.service";
import { logoutUser } from "../services/auth/logoutUser.service";
import { refreshUserToken } from "../services/auth/refreshUserToken.service";
import { registerUser } from "../services/auth/registerUser.service";
import { verifyEmail } from "../services/auth/verifyEmail.service";
import appAssert from "../utils/appAssert";
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

  // return response
  return setAuthCookies({ res, refreshToken, accessToken })
    .status(CREATED)
    .json({ message: "User created successfully", user });
});

export const loginHandler = catchErrors(async (req, res) => {
  // validate request
  const request = loginSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  // call loginUser service
  const { user, refreshToken, accessToken } = await loginUser(request);

  // return response
  return setAuthCookies({ res, refreshToken, accessToken })
    .status(OK)
    .json({ user });
});

export const logoutHandler = catchErrors(async (req, res) => {
  // get access token from cookies
  const accessToken = req.cookies.accessToken as string | undefined;
  appAssert(accessToken, UNAUTHORIZED, "Missing access token");

  // call logoutUser service
  await logoutUser(accessToken);

  // clear refresh & access token cookies and return response
  return clearAuthCookies(res)
    .status(OK)
    .json({ message: "Logout successfull" });
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
    res.cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions());
  }

  // set new refresh token
  return res
    .status(OK)
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .json({
      message: "Access token refreshed successfully",
    });
});

export const verifyEmailHandler = catchErrors(async (req, res) => {
  const verificationCode = verifyCodeSchema.parse(req.params.code);

  await verifyEmail(verificationCode);

  return res.redirect(`${APP_ORIGIN}/verify-success`);
});
