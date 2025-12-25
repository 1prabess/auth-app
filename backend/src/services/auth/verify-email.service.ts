import { INTERNAL_SERVER_ERROR, NOT_FOUND } from "../../constants/http";
import { VerificationCodeType } from "../../constants/verification-code-type";
import UserModel from "../../models/user.model";
import VerificationCodeModel from "../../models/verification.model";
import appAssert from "../../utils/app-assert";

export const verifyEmail = async (code: string) => {
  // get the verification code
  const validCode = await VerificationCodeModel.findOne({
    _id: code,
    type: VerificationCodeType.EmailVerification,
    expiresAt: { $gt: new Date() },
  });
  appAssert(validCode, NOT_FOUND, "Invalid or expired verification code");

  // get user by id and update
  const updatedUser = await UserModel.findByIdAndUpdate(
    validCode.userId,
    {
      verified: true,
    },
    { new: true }
  );
  appAssert(updatedUser, INTERNAL_SERVER_ERROR, "Failed to verify email");

  // delete verification code
  await validCode.deleteOne();

  return;
};
