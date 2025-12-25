import { APP_ORIGIN } from "../../constants/env";
import { NOT_FOUND } from "../../constants/http";
import { VerificationCodeType } from "../../constants/verification-code-type";
import UserModel from "../../models/user.model";
import VerificationCodeModel from "../../models/verification.model";
import appAssert from "../../utils/app-assert";
import { oneHourFromNow } from "../../utils/date";
import { getPasswordResetEmailTemplate } from "../../utils/email-templates";
import { sendEmail } from "../../utils/mailer";

export const forgotPassword = async (email: string) => {
  // get the user by email
  const user = await UserModel.findOne({ email });
  appAssert(user, NOT_FOUND, "No user found");

  // create a verification code for password reset
  const expiresAt = oneHourFromNow();
  const code = await VerificationCodeModel.create({
    userId: user._id,
    type: VerificationCodeType.PasswordReset,
    expiresAt,
  });

  // create resetUrl
  const resetUrl = `${APP_ORIGIN}/password/reset?code=${
    code._id
  }&exp=${expiresAt.getTime()}`;

  // send reset url email
  await sendEmail(
    user.email,
    "Password Reset",
    getPasswordResetEmailTemplate(resetUrl)
  );

  return;
};
