import { loginSchema } from "@/lib/validators/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const rawData = await request.json();
  const data = await loginSchema.safeParseAsync(rawData);
  console.log(data);
  return NextResponse.json(data);
}
