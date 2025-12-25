import { UNAUTHORIZED } from "../../constants/http";
import SessionModel from "../../models/session.model";
import UserModel from "../../models/user.model";
import appAssert from "../../utils/app-assert";
import {
  accessTokenSignOptions,
  refreshTokenSignOptions,
  signToken,
} from "../../utils/jwt";
import { getSafeUser } from "../../utils/user";

export type LoginUserParams = {
  email: string;
  password: string;
  userAgent?: string;
};

export const loginUser = async (data: LoginUserParams) => {
  // find the user
  const user = await UserModel.findOne({ email: data.email });
  appAssert(user, UNAUTHORIZED, "Invalid email or password");

  // validate the password
  const isPasswordValid = await user.comparePassword(data.password);
  appAssert(isPasswordValid, UNAUTHORIZED, "Invalid email or password");

  // create session
  const session = await SessionModel.create({
    userId: user._id,
    userAgent: data.userAgent,
  });

  // create refresh token
  const refreshToken = signToken(
    { sessionId: session._id },
    refreshTokenSignOptions
  );

  // create access token
  const accessToken = signToken(
    {
      sessionId: session._id,
      userId: user._id,
      role: user.role,
    },
    accessTokenSignOptions
  );

  // return result
  return {
    user: getSafeUser(user),
    refreshToken,
    accessToken,
  };
};
