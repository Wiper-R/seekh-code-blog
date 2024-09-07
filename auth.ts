import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google, { GoogleProfile } from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/prisma";
import { normalizeSync } from "normalize-diacritics";

function generateUsername(name: string): string {
  let username = normalizeSync(name.trim().toLowerCase()).replace(
    /[^a-z0-9]/g,
    "-"
  );

  return username;
}

async function createUniqueUsername(name: string) {
  let baseUsername = generateUsername(name);
  let username = baseUsername;
  let exists = await prisma.user.count({ where: { username } });
  let randomSuffix = 0;

  while (exists) {
    randomSuffix += 1;
    username = `${baseUsername}-${randomSuffix}`;
    exists = await prisma.user.count({ where: { username } });
  }

  return username;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      async profile(profile) {
        const username = await createUniqueUsername(profile.login);
        return {
          email: profile.email,
          username,
          name: profile.name ?? profile.login,
          id: profile.id.toString(),
          image: profile.avatar_url,
        };
      },
    }),
    Google({
      async profile(profile: GoogleProfile) {
        const username = await createUniqueUsername(profile.name);
        return {
          email: profile.email,
          username,
          name: profile.name,
          image: profile.avatar_url,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/signin" },
});
