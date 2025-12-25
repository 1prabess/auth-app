import { UserDocument } from "../models/user.model";

export const getSafeUser = (user: UserDocument) => {
  const obj = user.toObject();
  return {
    id: obj._id,
    email: obj.email,
    role: obj.role,
    verified: obj.verified,
    createdAt: obj.createdAt,
    updatedAt: obj.updatedAt,
    __v: obj.__v,
  };
};
