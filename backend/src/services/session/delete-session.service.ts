import SessionModel from "../../models/session.model";
import appAssert from "../../utils/app-assert";
import { NOT_FOUND } from "../../constants/http";
import { Types } from "mongoose";

export const deleteSession = async (
  sessionId: string,
  userId: Types.ObjectId
) => {
  // get the session to delete
  const session = await SessionModel.findOne({
    _id: sessionId,
    userId,
  });
  appAssert(session, NOT_FOUND, "Session not found");

  await session.deleteOne();

  return {
    deletedSession: session,
  };
};
