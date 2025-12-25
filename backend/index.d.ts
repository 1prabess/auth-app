import { Types } from "mongoose";
import { UserRole } from "./src/constants/roles";

declare global {
  namespace Express {
    interface Request {
      userId: Types.ObjectId;
      sessionId: Types.ObjectId;
      role: UserRole;
    }
  }
}

export {};
