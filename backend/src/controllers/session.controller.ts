import AppErrorCode from "../constants/app-error-code";
import { OK, UNAUTHORIZED } from "../constants/http";
import { deleteSession } from "../services/session/delete-session.service";
import { getSessions } from "../services/session/get-sessions.service";
import appAssert from "../utils/app-assert";
import catchErrors from "../utils/catchErrors";
import type { ApiSuccessResponse } from "../types/api.types";

export const getSessionsHandler = catchErrors(async (req, res) => {
  // get userId from request
  const userId = req.userId;
  appAssert(
    userId,
    UNAUTHORIZED,
    "Not authenticated",
    AppErrorCode.NotAuthenticated
  );

  // call getSessions service with userId and current sessionId
  const { sessions } = await getSessions(userId, req.sessionId);

  const response: ApiSuccessResponse<{ sessions: typeof sessions }> = {
    message: "Sessions fetched successfully",
    data: { sessions },
  };

  return res.status(OK).json(response);
});

export const deleteSessionHandler = catchErrors(async (req, res) => {
  // get id of the session to delete
  const sessionToDelete = req.params.id;

  // call deleteSession service with sessionId and the userId
  const { deletedSession } = await deleteSession(sessionToDelete, req.userId);

  const response: ApiSuccessResponse<{
    deletedSession: typeof deletedSession;
  }> = {
    message: "Session deleted successfully",
    data: { deletedSession },
  };

  return res.status(OK).json(response);
});
