import { Document, model, Schema, Types } from "mongoose";
import { thirtyDaysFromNow } from "../utils/date";

export interface SessionDocument extends Document {
  userId: Types.ObjectId;
  userAgent?: string;
  createdAt: Date;
  expiresAt: Date;
}

const sessionSchema = new Schema<SessionDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  userAgent: {
    type: String,
  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },

  expiresAt: {
    type: Date,
    required: true,
    default: thirtyDaysFromNow,
  },
});

const SessionModel = model<SessionDocument>("Session", sessionSchema);
export default SessionModel;
