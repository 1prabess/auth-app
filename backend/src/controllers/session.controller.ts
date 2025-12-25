import { OK, UNAUTHORIZED } from "../constants/http";
import { deleteSession } from "../services/session/delete-session.service";
import { getSessions } from "../services/session/get-sessions.service";
import appAssert from "../utils/app-assert";
import catchErrors from "../utils/catchErrors";

export const getSessionsHandler = catchErrors(async (req, res) => {
  // get userId from request
  const userId = req.userId;
  appAssert(userId, UNAUTHORIZED, "Not authenticated");

  // call getSessions service with userId and current sessionId
  const { sessions } = await getSessions(userId, req.sessionId);

  return res
    .status(OK)
    .json({ message: "Sessions fetched successfully", sessions });
});

export const deleteSessionHandler = catchErrors(async (req, res) => {
  // get id of the session to delete
  const sessionToDelete = req.params.id;

  // call deleteSession service with sessionId and the userId
  const { deletedSession } = await deleteSession(sessionToDelete, req.userId);

  return res.status(OK).json({
    message: "Session deleted successfully",
    deletedSession,
  });
});
