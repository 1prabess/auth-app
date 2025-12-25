import UserModel from "../../models/user.model";
import { getSafeUser } from "../../utils/user";

export const getUsers = async () => {
  const users = await UserModel.find();

  const safeUsers = users.map((user) => getSafeUser(user));

  return { users: safeUsers };
};
