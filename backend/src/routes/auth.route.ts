import { Router } from "express";
import {
  loginHandler,
  logoutHandler,
  refreshUserTokenHandler,
  registerHandler,
  verifyEmailHandler,
} from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.post("/register", registerHandler);
authRoutes.post("/login", loginHandler);
authRoutes.get("/logout", logoutHandler);
authRoutes.get("/refresh", refreshUserTokenHandler);
authRoutes.get("/email/verify/:code", verifyEmailHandler);

export default authRoutes;
