import { apiHandler } from "@/lib/api/api-handler";
import { zodHelper } from "@/lib/api/zod-helper";
import { signUpSchema } from "@/lib/validators/auth";
import { NextResponse } from "next/server";

export const POST = apiHandler(async (request) => {
  const data = await zodHelper(request, signUpSchema);
  console.log(data);
  return NextResponse.json(data);
});
