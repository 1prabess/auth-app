import { CookieOptions, Response } from "express";
import { NODE_ENV } from "../constants/env";
import { fifteenMinutesFromNow, thirtyDaysFromNow } from "./date";

type AuthCookiesParams = {
  res: Response;
  refreshToken: string;
  accessToken: string;
};

const secure = NODE_ENV === "production";
const defaults: CookieOptions = {
  sameSite: true,
  httpOnly: true,
  secure,
};

export const getRefreshTokenCookieOptions = () => {
  return {
    ...defaults,
    expires: thirtyDaysFromNow(),
    path: "/auth/refresh",
  };
};

export const getAccessTokenCookieOptions = () => {
  return {
    ...defaults,
    expires: fifteenMinutesFromNow(),
  };
};

export const setAuthCookies = ({
  res,
  refreshToken,
  accessToken,
}: AuthCookiesParams) => {
  return res
    .cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions())
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions());
};

export const clearAuthCookies = (res: Response) => {
  return res.clearCookie("accessToken").clearCookie("refreshToken", {
    path: "/auth/refresh",
  });
};
