import { RequestHandler } from "express";
import { UserRole } from "../constants/roles";
import AppError from "../utils/app-error";
import { FORBIDDEN } from "../constants/http";

const authorize = (...roles: UserRole[]): RequestHandler => {
  return (req, _res, next) => {
    if (!req.role || !roles.includes(req.role)) {
      return next(new AppError(FORBIDDEN, "Access denied"));
    }

    next();
  };
};

export default authorize;
