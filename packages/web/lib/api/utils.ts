import { User } from "@prisma/client";

export function safeUser(user: User) {
  const { password, updatedAt, ...safeUser } = user;
  return safeUser;
}
