import AppErrorCode from "../../constants/app-error-code";
import { UNAUTHORIZED } from "../../constants/http";
import SessionModel from "../../models/session.model";
import UserModel from "../../models/user.model";
import appAssert from "../../utils/app-assert";
import { ONE_DAY_MS, thirtyDaysFromNow } from "../../utils/date";
import {
  accessTokenSignOptions,
  RefreshTokenPayload,
  refreshTokenSignOptions,
  refreshTokenVerifyOptions,
  signToken,
  verifyToken,
} from "../../utils/jwt";

export const refreshUserToken = async (refreshToken: string) => {
  // verify refresh token and extract session payload
  const { payload, error } = verifyToken<RefreshTokenPayload>(
    refreshToken,
    refreshTokenVerifyOptions
  );
  appAssert(
    !error && payload,
    UNAUTHORIZED,
    "Invalid refresh token",
    AppErrorCode.InvalidRefreshToken
  );

  // load session and ensure it is still valid
  const session = await SessionModel.findById(payload.sessionId);
  appAssert(
    session && session.expiresAt.getTime() > Date.now(),
    UNAUTHORIZED,
    "Invalid or expired session",
    AppErrorCode.InvalidRefreshToken
  );

  // load user to get role
  const user = await UserModel.findById(session.userId);
  appAssert(user, UNAUTHORIZED, "User not found", AppErrorCode.UserNotFound);

  // check whether the refresh token should be rotated
  const sessionNeedsRefresh =
    session.expiresAt.getTime() - Date.now() <= ONE_DAY_MS;

  // extend session expiry when nearing expiration
  if (sessionNeedsRefresh) {
    session.expiresAt = thirtyDaysFromNow();
    await session.save();
  }

  // issue a new refresh token only when rotation occurs
  const newRefreshToken = sessionNeedsRefresh
    ? signToken({ sessionId: session._id }, refreshTokenSignOptions)
    : undefined;

  // always issue a new access token
  const accessToken = signToken(
    {
      sessionId: session._id,
      userId: session.userId,
      role: user.role,
    },
    accessTokenSignOptions
  );

  return { newRefreshToken, accessToken };
};
