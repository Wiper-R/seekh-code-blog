import express from "express";
import db from "../prisma/db";
import { safeUser } from "../lib/utils";

const userRouter = express.Router();

userRouter.get("/@me", async (req, res) => {
  const sessionToken = req.cookies["session"];
  if (!sessionToken) {
    res.status(401).send({});
    return;
  }

  const session = await db.session.findFirst({ where: { sessionToken } });
  if (!session) {
    res.status(401).send({});
    return;
  }

  const user = await db.user.findFirst({ where: { id: session.userId } });

  return res.json({ ...safeUser(user) });
});

export default userRouter;
