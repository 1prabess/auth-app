import AppErrorCode from "../../constants/app-error-code";
import { UNAUTHORIZED } from "../../constants/http";
import SessionModel from "../../models/session.model";
import appAssert from "../../utils/app-assert";
import {
  AccessTokenPayload,
  accessTokenVerifyOptions,
  verifyToken,
} from "../../utils/jwt";

export const logoutUser = async (accessToken: string) => {
  // get payload
  const { payload, error } = verifyToken<AccessTokenPayload>(
    accessToken,
    accessTokenVerifyOptions
  );

  appAssert(
    !error && payload,
    UNAUTHORIZED,
    "Invalid access token",
    AppErrorCode.InvalidAccessToken
  );

  // remove session to log out
  await SessionModel.findByIdAndDelete(payload.sessionId);

  return;
};
