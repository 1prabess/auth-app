import { User } from "../models/user.model.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import { generateAndSetToken } from "../utils/generateAndSetToken.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../utils/sendEmail.js";

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

    res.status(StatusCodes.CREATED).json({
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

    res.status(StatusCodes.CREATED).json({
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
  res.status(200).json({ message: "hehe", jsj: "hello world" });
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(StatusCodes.OK).json({
    message: "User Logged out successfully",
  });
};
