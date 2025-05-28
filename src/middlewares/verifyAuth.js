import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export const verifyAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Unauthorized - no token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Unauthorized - invalid token" });

    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong. Please try again later.",
      error: error.message,
    });
  }
};
