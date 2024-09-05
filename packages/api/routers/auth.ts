import express from "express";
import db from "../prisma/db";
import createUser from "shared/validators/createUser";
import loginUser from "shared/validators/loginUser";
import bcryptjs from "bcryptjs";
import { safeUser } from "../lib/utils";
import crypto from "crypto";
import moment from "shared/node_modules/moment";

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  const data = await createUser.parseAsync(req.body);
  const hashedPassword = await bcryptjs.hash(data.password, 10);
  const user = await db.user.create({
    data: {
      email: data.email,
      firstname: data.firstname,
      lastname: data.lastname,
      password: hashedPassword,
      username: data.username,
    },
  });
  res.json({ ...safeUser(user) }).status(201);
});

authRouter.post("/login", async (req, res) => {
  const data = await loginUser.parseAsync(req.body);
  const user = await db.user.findFirst({
    where: { OR: [{ email: data.username }, { username: data.username }] },
  });
  if (!user || !(await bcryptjs.compare(data.password, user.password))) {
    res.json({ message: "Invalid username or password" }).status(401);
    return;
  }

  const sessionToken = crypto.randomBytes(32).toString("hex");
  await prisma.session.create({
    data: {
      sessionToken,
      userId: user.id,
      expiresAt: moment().add({ hours: 12 }).toDate(),
    },
  });

  // TODO: Configure cookies for specific domain
  res.cookie("session", sessionToken, {
    httpOnly: true,
  });
  res.cookie("session", sessionToken, {
    httpOnly: true,
    domain: "http://localhost:3000",
  });
  res.json({ ...safeUser(user) });
});

export default authRouter;
