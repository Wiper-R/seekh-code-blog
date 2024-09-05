import { ApiError } from "@/lib/api/error";
import { ZodError } from "zod";

type ServerActionReturnType<T> =
  | {
      success: true;
      data: T;
    }
  | { success: false; error: string };

type ServerAction<T, P extends any[]> = (
  ...params: P
) => Promise<ServerActionReturnType<T>>;

export const actionWrapper = <T, P extends any[]>(
  fn: (...params: P) => Promise<T>
): ServerAction<T, P> => {
  return async (...params: P): Promise<ServerActionReturnType<T>> => {
    try {
      const data = await fn(...params);
      return { success: true, data };
    } catch (e: unknown) {
      let message: string;
      if (e instanceof ApiError) {
        message = e.message;
      } else if (e instanceof ZodError) {
        message = e.errors
          .map((issue) => `${issue.path.join(".")} - ${issue.message}`)
          .join("\n");
      } else {
        throw e;
      }
      return { success: false, error: message };
    }
  };
};
