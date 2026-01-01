import "dotenv/config";
import express from "express";
import connectDB from "./config/db";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env";
import errorHandler from "./middlewares/error-handler.middleware";
import cookieParser from "cookie-parser";
import cors from "cors";
import { OK } from "./constants/http";
import catchErrors from "./utils/catchErrors";
import authRoutes from "./routes/auth.route";
import authenticate from "./middlewares/authenticate.middleware";
import userRoutes from "./routes/user.route";
import sessionRoutes from "./routes/session.route";

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(cors({ origin: APP_ORIGIN, credentials: true }));

app.use("/auth", authRoutes);
app.use("/user", authenticate, userRoutes);
app.use("/sessions", authenticate, sessionRoutes);

app.get(
  "/health",
  catchErrors(async (_req, res) => {
    return res.status(OK).json({ status: "healthy" });
  })
);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`App is listening on port ${PORT} in ${NODE_ENV} environment.`);
  await connectDB();
});
