import { apiHandler } from "@/lib/api/api-handler";
import { zodHelper } from "@/lib/api/zod-helper";
import { createPostSchema } from "@/lib/validators/posts";
import db from "@/prisma/db";
import { NextResponse } from "next/server";

export const POST = apiHandler(async (request) => {
  const data = await zodHelper(request, createPostSchema);
  const post = await db.post.create({ data: { ...data, authorId: 1 } });
  return NextResponse.json({});
});
