import { Types } from "mongoose";
import { NOT_FOUND } from "../../constants/http";
import UserModel from "../../models/user.model";
import appAssert from "../../utils/app-assert";
import { getSafeUser } from "../../utils/user";
import AppErrorCode from "../../constants/app-error-code";

export const getUser = async (userId: Types.ObjectId) => {
  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found", AppErrorCode.UserNotFound);

  return { user: getSafeUser(user) };
};
