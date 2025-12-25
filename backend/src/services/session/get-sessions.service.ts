import { Types } from "mongoose";
import SessionModel from "../../models/session.model";

export const getSessions = async (
  userId: Types.ObjectId,
  sessionId: Types.ObjectId
) => {
  const sessions = await SessionModel.find(
    {
      userId,
      expiresAt: { $gt: new Date() },
    },
    {
      _id: 1,
      userAgent: 1,
      createdAt: 1,
      expiresAt: 1,
    }
  ).sort({ createdAt: -1 });

  // set isCurrent = true if it's the current session user is using
  const sessionsWithCurrent = sessions.map((session) => ({
    ...session.toObject(),
    isCurrent: session._id.toString() === sessionId.toString(),
  }));

  return {
    sessions: sessionsWithCurrent,
  };
};
