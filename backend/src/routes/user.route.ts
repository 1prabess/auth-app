import { Router } from "express";
import {
  getUserHandler,
  getUsersHandler,
} from "../controllers/user.controller";
import authorize from "../middlewares/authorize.middleware";
import { UserRole } from "../constants/roles";

const userRoutes = Router();

userRoutes.get("/", getUserHandler);
userRoutes.get("/users", authorize(UserRole.ADMIN), getUsersHandler);

export default userRoutes;
