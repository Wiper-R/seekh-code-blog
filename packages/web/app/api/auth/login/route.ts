import { apiHandler } from "@/lib/api/api-handler";
import { ApiError } from "@/lib/api/error";
import { safeUser } from "@/lib/api/utils";
import { zodHelper } from "@/lib/api/zod-helper";
import { loginSchema } from "@/lib/validators/auth";
import db from "@/prisma/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import moment from "moment";
import crypto from "crypto";

export const POST = apiHandler(async (request, response) => {
  console.log(response);
  const data = await zodHelper(request, loginSchema);
  const user = await db.user.findFirst({
    where: {
      OR: [
        { username: data.username_or_email },
        { email: data.username_or_email },
      ],
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
  return NextResponse.json(safeUser(user));
});
