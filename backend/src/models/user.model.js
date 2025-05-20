import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    lastLogin: {
      type: Date,
      default: Date.now,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    resetPasswordToken: {
      type: String,
    },

    resetPasswordTokenExpiresAt: {
      type: Date,
    },

    verificationToken: {
      type: String,
    },

    verificationTokenExpiresAt: {
      type: Date,
    },
  },
  { timestamps: true, versionKey: false }
);

export const User = mongoose.model("User", userSchema);
