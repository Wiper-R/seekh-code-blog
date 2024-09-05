import { getSession } from "@/auth/utils";
import { apiHandler } from "@/lib/api/api-handler";
import { ApiError } from "@/lib/api/error";
import { NextResponse } from "next/server";

export const GET = apiHandler(
  async (_, { params: { username } }: { params: { username: string } }) => {
    if (username == "@me") {
      const session = await getSession();
      return NextResponse.json({ ...session });
    }
    throw new ApiError({ message: "User not found", status: 404 });
  }
);
