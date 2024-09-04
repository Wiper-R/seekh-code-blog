import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "./error";

type HandlerType = (
  request: NextRequest,
  response: NextResponse
) => NextResponse | Promise<NextResponse>;

export function apiHandler(handler: HandlerType) {
  return async (request: NextRequest, response: NextResponse) => {
    try {
      return await handler(request, response);
    } catch (e) {
      if (e instanceof ApiError) {
        return NextResponse.json({ error: e.message }, { status: e.status });
      }
      throw e;
    }
  };
}
