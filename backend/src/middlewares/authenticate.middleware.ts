import { RequestHandler } from "express";
import appAssert from "../utils/app-assert";
import { UNAUTHORIZED } from "../constants/http";
import AppErrorCode from "../constants/app-error-code";
import {
  AccessTokenPayload,
  accessTokenVerifyOptions,
  verifyToken,
} from "../utils/jwt";

const authenticate: RequestHandler = async (req, _res, next) => {
  // get access token
  const accessToken = req.cookies.accessToken as string | undefined;
  appAssert(
    accessToken,
    UNAUTHORIZED,
    "Not authorized",
    AppErrorCode.InvalidAccessToken
  );

  // verify access token
  const { payload, error } = verifyToken<AccessTokenPayload>(
    accessToken,
    accessTokenVerifyOptions
  );
  appAssert(
    payload && !error,
    UNAUTHORIZED,
    "Invalid access token",
    AppErrorCode.InvalidAccessToken
  );

  // bind userId and sessionId to req
  req.userId = payload.userId;
  req.sessionId = payload.sessionId;
  req.role = payload.role;

  next();
};

export default authenticate;
