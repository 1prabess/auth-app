import { CREATED, OK, UNAUTHORIZED } from "../constants/http";
import { loginSchema, registerSchema } from "../schemas/auth.schema";
import { loginUser } from "../services/auth/loginUser.service";
import { logoutUser } from "../services/auth/logoutUser.service";
import { registerUser } from "../services/auth/registerUser.service";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";
import { clearAuthCookies, setAuthCookies } from "../utils/cookies";

export const registerHandler = catchErrors(async (req, res) => {
  // validate request
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  // call registerUser service
  const { user, refreshToken, accessToken } = await registerUser(request);

  // return response
  return setAuthCookies({ res, refreshToken, accessToken })
    .status(CREATED)
    .json({ message: "User created successfully", user });
});

export const loginHandler = catchErrors(async (req, res) => {
  // validate request
  const request = loginSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  // call loginUser service
  const { user, refreshToken, accessToken } = await loginUser(request);

  // return response
  return setAuthCookies({ res, refreshToken, accessToken })
    .status(OK)
    .json({ user });
});

export const logoutHandler = catchErrors(async (req, res) => {
  const accessToken = req.cookies.accessToken;
  appAssert(accessToken, UNAUTHORIZED, "Missing access token");

  // call logoutUser service
  await logoutUser(accessToken);

  // clear refresh & access token cookies and return response
  return clearAuthCookies(res)
    .status(OK)
    .json({ message: "Logout successfull" });
});
