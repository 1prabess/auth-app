import { Document, model, Schema } from "mongoose";
import { comparePassword, hashPassword } from "../utils/bcrypt";
import { UserRole } from "../constants/roles";

export interface UserDocument extends Document {
  email: string;
  password: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  role: UserRole;
  comparePassword: (val: string) => Promise<boolean>;
}

const userSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      min: 6,
    },

    role: {
      type: String,
      enum: Object.values(UserRole),
      required: true,
      default: UserRole.USER,
    },

    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified) {
    return;
  }

  this.password = await hashPassword(this.password);
});

userSchema.methods.comparePassword = async function (value: string) {
  return await comparePassword(value, this.password);
};

const UserModel = model<UserDocument>("User", userSchema);
export default UserModel;
