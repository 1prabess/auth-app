import express from "express";
import {
  login,
  logout,
  register,
  verifyEmail,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);

router.get("/login", login);

router.get("/logout", logout);

router.post("/verify-email", verifyEmail);

export default router;
