import AppErrorCode from "../constants/app-error-code";
import { FORBIDDEN, OK, UNAUTHORIZED } from "../constants/http";
import { UserRole } from "../constants/roles";
import { getUser } from "../services/user/get-user.service";
import { getUsers } from "../services/user/get-users.service";
import appAssert from "../utils/app-assert";
import catchErrors from "../utils/catchErrors";

export const getUserHandler = catchErrors(async (req, res) => {
  const userId = req.userId;
  appAssert(
    userId,
    UNAUTHORIZED,
    "Not authenticated",
    AppErrorCode.InvalidAccessToken
  );

  const { user } = await getUser(userId);

  return res.status(OK).json({
    message: "User fetched successfully",
    user,
  });
});

export const getUsersHandler = catchErrors(async (req, res) => {
  const role = req.role;

  appAssert(role === UserRole.ADMIN, FORBIDDEN, "Access denied");

  const { users } = await getUsers();

  return res.status(OK).json({
    message: "Users fetched successfully",
    users,
  });
});
