import { User } from "../models/user.model.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import { generateAndSetToken } from "../utils/generateAndSetToken.js";
import {
  sendResetPasswordEmail,
  sendResetPasswordSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../utils/sendEmail.js";
import crypto from "crypto";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "All fields are required" });

    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    await user.save();

    generateAndSetToken(res, user._id);

    await sendVerificationEmail(verificationToken, email);

    return res.status(StatusCodes.CREATED).json({
      message: "User registered successfully",
      data: { userId: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong. Please try again later.",
      error: error.message,
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { verificationCode } = req.body;

    const user = await User.findOne({
      verificationToken: verificationCode,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user)
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: "Invalid verification code" });

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    await user.save();

    await sendWelcomeEmail(user.email);

    return res.status(StatusCodes.CREATED).json({
      message: "User verified successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong. Please try again later.",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(StatusCodes.CONFLICT).json({
        message: "Invalid Credentials",
      });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(StatusCodes.CONFLICT).json({
        message: "Invalid Credentials",
      });

    generateAndSetToken(res, user._id);

    user.lastLogin = new Date();

    return res.status(StatusCodes.OK).json({
      message: "User logged in successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong. Please try again later.",
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  return res.status(StatusCodes.OK).json({
    message: "User Logged out successfully",
  });
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: "User not found" });

    const resetPasswordToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordTokenExpiresAt = Date.now() + 1 * 60 * 60 * 10000;

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordTokenExpiresAt = resetPasswordTokenExpiresAt;

    await user.save();

    await sendResetPasswordEmail(resetPasswordToken, user.email);

    return res.status(StatusCodes.CREATED).json({
      message: "Reset password link sent to the email successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong. Please try again later.",
      error: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const { token } = req.params;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user)
      return res.status(StatusCodes.CONFLICT).json({
        message: "Invalid or expired token",
      });

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;

    await user.save();

    await sendResetPasswordSuccessEmail(user.email);

    return res.status(StatusCodes.CREATED).json({
      message: "Password has been reset successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong. Please try again later.",
      error: error.message,
    });
  }
};
