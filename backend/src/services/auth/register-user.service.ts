import AppErrorCode from "../../constants/app-error-code";
import { CONFLICT } from "../../constants/http";
import { VerificationCodeType } from "../../constants/verification-code-type";
import SessionModel from "../../models/session.model";
import UserModel from "../../models/user.model";
import VerificationCodeModel from "../../models/verification.model";
import appAssert from "../../utils/app-assert";
import { oneYearFromNow } from "../../utils/date";
import { getVerificationEmailTemplate } from "../../utils/email-templates";
import {
  accessTokenSignOptions,
  refreshTokenSignOptions,
  signToken,
} from "../../utils/jwt";
import { sendEmail } from "../../utils/mailer";
import { getSafeUser } from "../../utils/user";

export type RegisterUserParams = {
  email: string;
  password: string;
  userAgent?: string;
};

export const registerUser = async (data: RegisterUserParams) => {
  // check for existing user
  const existingUser = await UserModel.exists({ email: data.email });

  appAssert(
    !existingUser,
    CONFLICT,
    "User already exists",
    AppErrorCode.EmailAlreadyExists
  );

  // create a new user
  const user = await UserModel.create({
    email: data.email,
    password: data.password,
  });

  // create verification
  const verificationCode = await VerificationCodeModel.create({
    userId: user._id,
    type: VerificationCodeType.EmailVerification,
    expiresAt: oneYearFromNow(),
  });

  // send verification email
  await sendEmail(
    user.email,
    "Email Verification Code",
    getVerificationEmailTemplate(verificationCode._id.toString())
  );

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
    { sessionId: session._id, userId: user._id, role: user.role },
    accessTokenSignOptions
  );
  return { user: getSafeUser(user), refreshToken, accessToken };
};
