import { NextResponse } from "next/server";
import { ApiError } from "./error";

type HandlerType = (...params: any[]) => NextResponse | Promise<NextResponse>;

export function apiHandler(handler: HandlerType) {
  return async (...params: any[]) => {
    try {
      return await handler(...params);
    } catch (e) {
      if (e instanceof ApiError) {
        return NextResponse.json({ message: e.message }, { status: e.status });
      }
      throw e;
    }
  };
}
