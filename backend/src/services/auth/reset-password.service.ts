import AppErrorCode from "../../constants/app-error-code";
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from "../../constants/http";
import { VerificationCodeType } from "../../constants/verification-code-type";
import UserModel from "../../models/user.model";
import VerificationCodeModel from "../../models/verification.model";
import appAssert from "../../utils/app-assert";
import { hashPassword } from "../../utils/bcrypt";
import { getSafeUser } from "../../utils/user";

type ResetPasswordParams = {
  verificationCode: string;
  password: string;
};

export const resetPassword = async (data: ResetPasswordParams) => {
  const validCode = await VerificationCodeModel.findOne({
    _id: data.verificationCode,
    type: VerificationCodeType.PasswordReset,
    expiresAt: { $gt: new Date() },
  });
  appAssert(
    validCode,
    NOT_FOUND,
    "Invalid or expired code",
    AppErrorCode.InvalidVerificationCode
  );

  // update user password
  const updatedUser = await UserModel.findByIdAndUpdate(
    validCode.userId,
    {
      password: await hashPassword(data.password),
    },
    {
      new: true,
    }
  );

  // delete reset password code
  await validCode.deleteOne();

  appAssert(
    updatedUser,
    INTERNAL_SERVER_ERROR,
    "Failed to update password",
    AppErrorCode.InternalServerError
  );

  return {
    user: getSafeUser(updatedUser),
  };
};
