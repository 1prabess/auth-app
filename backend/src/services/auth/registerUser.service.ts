import { CONFLICT } from "../../constants/http";
import SessionModel from "../../models/session.model";
import UserModel from "../../models/user.model";
import appAssert from "../../utils/appAssert";
import {
  accessTokenSignOptions,
  refreshTokenSignOptions,
  signToken,
} from "../../utils/jwt";

export type RegisterUserParams = {
  email: string;
  password: string;
  userAgent?: string;
};

export const registerUser = async (data: RegisterUserParams) => {
  // check for existing user
  const existingUser = await UserModel.exists({ email: data.email });

  appAssert(!existingUser, CONFLICT, "User already exists");

  // create a new user
  const user = await UserModel.create({
    email: data.email,
    password: data.password,
  });

  const safeUser = {
    id: user._id,
    email: user.email,
    verified: user.verified,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    __v: user.__v,
  };

  // create a new session
  const session = await SessionModel.create({
    userId: user._id,
    userAgent: data.userAgent,
  });

  // sign refresh token
  const refreshToken = signToken(
    { sessionId: session._id },
    refreshTokenSignOptions
  );

  // sign access token
  const accessToken = signToken(
    { sessionId: session._id, userId: user._id },
    accessTokenSignOptions
  );
  return { user: safeUser, refreshToken, accessToken };
};
