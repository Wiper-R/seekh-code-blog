import { ApiError } from "@/lib/api/error";
import { safeUser } from "@/lib/api/utils";
import db from "@/prisma/db";
import { cookies } from "next/headers";

export async function getSession() {
  const sessionToken = cookies().get("session");
  if (!sessionToken) {
    throw new ApiError({ message: "Unauthorized", status: 401 });
  }
  const session = await db.session.findFirst({
    where: { sessionToken: sessionToken.value },
  });

  if (!session) {
    cookies().delete("session");
    throw new ApiError({ message: "Unauthorized", status: 401 });
  }

  const user = await db.user.findFirst({ where: { id: session.userId } });
  return safeUser(user!);
}
