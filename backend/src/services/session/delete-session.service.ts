import SessionModel from "../../models/session.model";
import appAssert from "../../utils/app-assert";
import { NOT_FOUND } from "../../constants/http";
import { Types } from "mongoose";
import AppErrorCode from "../../constants/app-error-code";

export const deleteSession = async (
  sessionId: string,
  userId: Types.ObjectId
) => {
  // get the session to delete
  const session = await SessionModel.findOne({
    _id: sessionId,
    userId,
  });
  appAssert(
    session,
    NOT_FOUND,
    "Session not found",
    AppErrorCode.SessionNotFound
  );

  await session.deleteOne();

  return {
    deletedSession: session,
  };
};
