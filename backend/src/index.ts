import "dotenv/config";
import express from "express";
import connectDB from "./config/db";
import { NODE_ENV, PORT } from "./constants/env";
import errorHandler from "./middlewares/errorHandler.middleware";
import cookieParser from "cookie-parser";
import { OK } from "./constants/http";
import catchErrors from "./utils/catchErrors";
import authRoutes from "./routes/auth.route";

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

app.use("/auth", authRoutes);

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
