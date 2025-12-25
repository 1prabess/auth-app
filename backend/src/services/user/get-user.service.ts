import { Types } from "mongoose";
import { NOT_FOUND } from "../../constants/http";
import UserModel from "../../models/user.model";
import appAssert from "../../utils/app-assert";
import { getSafeUser } from "../../utils/user";

export const getUser = async (userId: Types.ObjectId) => {
  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  return { user: getSafeUser(user) };
};
