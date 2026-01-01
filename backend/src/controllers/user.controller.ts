import AppErrorCode from "../constants/app-error-code";
import { FORBIDDEN, OK, UNAUTHORIZED } from "../constants/http";
import { UserRole } from "../constants/roles";
import { getUser } from "../services/user/get-user.service";
import { getUsers } from "../services/user/get-users.service";
import appAssert from "../utils/app-assert";
import catchErrors from "../utils/catchErrors";
import type { ApiSuccessResponse } from "../types/api.types";
import { User } from "../types/user.types";

export const getUserHandler = catchErrors(async (req, res) => {
  const userId = req.userId;

  appAssert(
    userId,
    UNAUTHORIZED,
    "Not authenticated",
    AppErrorCode.InvalidAccessToken
  );

  const { user } = await getUser(userId);

  const response: ApiSuccessResponse<{ user: User }> = {
    message: "User fetched successfully",
    data: { user },
  };

  return res.status(OK).json(response);
});

export const getUsersHandler = catchErrors(async (req, res) => {
  const role = req.role;

  appAssert(
    role === UserRole.ADMIN,
    FORBIDDEN,
    "Access denied",
    AppErrorCode.AccessDenied
  );

  const { users } = await getUsers();

  const response: ApiSuccessResponse<{ users: User[] }> = {
    message: "Users fetched successfully",
    data: { users },
  };

  return res.status(OK).json(response);
});
