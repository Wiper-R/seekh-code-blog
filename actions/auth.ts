"use server";

import { auth } from "@/auth";
import prisma from "@/prisma";

async function getUser() {
  const session = await auth();
  if (!session) return null;
  const user = await prisma.user.findFirst({
    where: { email: session.user?.email! },
  });
  return user;
}
export { getUser };
