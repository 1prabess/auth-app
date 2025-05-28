import express from "express";
import {
  login,
  logout,
  register,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
} from "../controllers/auth.controller.js";
import { verifyAuth } from "../middlewares/verifyAuth.js";

const router = express.Router();

router.get("/check-auth", verifyAuth, checkAuth);

router.post("/register", register);

router.post("/login", login);

router.get("/logout", logout);

router.post("/verify-email", verifyEmail);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

export default router;
