import jwt, { VerifyOptions } from "jsonwebtoken";
import { SignOptions } from "jsonwebtoken";
import { SessionDocument } from "../models/session.model";
import { UserDocument } from "../models/user.model";
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../constants/env";
import { UserRole } from "../constants/roles";

export type AccessTokenPayload = {
  userId: UserDocument["_id"];
  sessionId: SessionDocument["_id"];
  role: UserRole;
};

export type RefreshTokenPayload = {
  sessionId: SessionDocument["_id"];
};

type SignOptionsAndSecret = SignOptions & { secret: string };
type VerifyOptionsAndSecret = VerifyOptions & { secret: string };

export const refreshTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: "30d",
  secret: JWT_REFRESH_SECRET,
};

export const accessTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: "15m",
  secret: JWT_ACCESS_SECRET,
};

export const refreshTokenVerifyOptions: VerifyOptionsAndSecret = {
  secret: JWT_REFRESH_SECRET,
};

export const accessTokenVerifyOptions: VerifyOptionsAndSecret = {
  secret: JWT_ACCESS_SECRET,
};

export const signToken = (
  payload: AccessTokenPayload | RefreshTokenPayload,
  options: SignOptionsAndSecret
) => {
  const { secret, ...signOpts } = options;

  return jwt.sign(payload, secret, { ...signOpts });
};

export const verifyToken = <TPayload extends object>(
  token: string,
  options: VerifyOptionsAndSecret
) => {
  try {
    const { secret, ...verifyOpts } = options;

    const payload = jwt.verify(token, secret, {
      ...verifyOpts,
    }) as TPayload;

    return { payload };
  } catch (error: any) {
    return { error: error.message };
  }
};
