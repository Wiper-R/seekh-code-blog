"use server";

import { LoginSchema, SignUpSchema } from "@/lib/validators/auth";
import { actionWrapper } from "./action-wrapper";
import bcrypt from "bcryptjs";
import db from "@/prisma/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";
import { ApiError } from "@/lib/api/error";
import { cookies } from "next/headers";
import moment from "moment";
import crypto from "crypto";

export const signUp = actionWrapper(async (_data: SignUpSchema) => {
  const data = await SignUpSchema.parseAsync(_data);
  try {
    const hashed_password = await bcrypt.hash(data.password, 10);
    await db.user.create({
      data: {
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        username: data.username,
        password: hashed_password,
      },
    });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code == "P2002") {
        throw new ApiError({ message: "User already exists", status: 400 });
      }
    }
    throw e;
  }
});

export const login = actionWrapper(async (_data: LoginSchema) => {
  const data = await LoginSchema.parseAsync(_data);
  const user = await db.user.findFirst({
    where: {
      OR: [{ username: data.username }, { email: data.username }],
    },
  });
  if (!user) {
    throw new ApiError({
      status: 401,
      message: "Invalid username/email or password",
    });
  }
  let result = await bcrypt.compare(data.password, user.password);
  if (!result) {
    throw new ApiError({
      status: 401,
      message: "Invalid username/email or password",
    });
  }

  const session = await db.session.create({
    data: {
      userId: user.id,
      expiresAt: moment().add({ hours: 12 }).toDate(),
      sessionToken: crypto.randomBytes(32).toString("hex"),
    },
  });

  cookies().set("session", session.sessionToken, {
    httpOnly: true,
    sameSite: "strict",
  });
});
