import { apiHandler } from "@/lib/api/api-handler";
import { zodHelper } from "@/lib/api/zod-helper";
import { signUpSchema } from "@/lib/validators/auth";
import db from "@/prisma/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ApiError } from "@/lib/api/error";
import { safeUser } from "@/lib/api/utils";

export const POST = apiHandler(async (request) => {
  const data = await zodHelper(request, signUpSchema);
  try {
    const hashed_password = await bcrypt.hash(data.password, 10);
    var user = await db.user.create({
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
  return NextResponse.json(safeUser(user));
});
