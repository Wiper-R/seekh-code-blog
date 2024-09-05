import express, { NextFunction, Request, Response } from "express";
import authRouter from "./routers/auth";
import { ZodError } from "shared/node_modules/zod";
import userRouter from "./routers/user";
import "dotenv/config";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// Error Handler
function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    next(err);
    return;
  }

  if (err instanceof ZodError) {
    res
      .json({
        message: err.errors
          .map((issue) => `${issue.path.join(".")} - ${issue.message}`)
          .join("\n"),
      })
      .status(400);
  }

  next(err);
}

app.use(errorHandler);

app.listen(5000, () => {
  console.log(`Listening on port ${5000}`);
});
