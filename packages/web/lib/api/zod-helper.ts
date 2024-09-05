import { NextRequest } from "next/server";
import { z, ZodSchema } from "zod";
import { ApiError } from "./error";

export async function zodHelper<T extends ZodSchema>(
  request: NextRequest,
  schema: T
): Promise<z.infer<T>> {
  const rawData = await request.json();
  const result = await schema.safeParseAsync(rawData);

  if (result.success) {
    return result.data;
  } else {
    throw new ApiError({
      message: result.error.errors
        .map((issue) => {
          return `${issue.path.join(".")} - ${issue.message}`;
        })
        .join("\n"),
      status: 400,
    });
  }
}
