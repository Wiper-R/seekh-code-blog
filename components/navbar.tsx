import SeekhCodePng from "@/public/seekh-code.png";
import { MaxWidthWrapper } from "./MaxWidthWrapper";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { auth, signOut } from "@/auth";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { getUser } from "@/actions/auth";
import { UserDropdown } from "./user-dropdown";

export async function Navbar() {
  const session = await auth();
  const user = await getUser();
  return (
    <header className="bg-[#232323] p-3 shadow z-10">
      <MaxWidthWrapper className="flex justify-between items-center">
        <Link href="/">
          <img src={SeekhCodePng.src} className="w-14" />
        </Link>
        <div className="flex gap-10 items-center">
          {[
            ["Blog", "/blog"],
            ["Youtube", "https://youtube.com/@seekhcode"],
            ["Projects", "/projects"],
            ["Get in touch", "/get-in-touch"],
          ].map(([label, href]) => (
            <Link
              href={href}
              key={href}
              className="text-lg text-white relative after:content-[''] after:absolute after:block after:w-0 hover:after:w-full after:transition-all after:h-0.5 after:bg-white"
            >
              {label}
            </Link>
          ))}
          {session?.user ? (
            // <Avatar className="rounded-xl">
            //   <AvatarImage src={session.user.image || undefined} />
            //   <AvatarFallback>{session.user.name}</AvatarFallback>
            // </Avatar>
            <UserDropdown user={session.user} />
          ) : (
            <Link
              href="/signin"
              className={cn(
                "text-lg font-semibold bg-green-500 px-3 py-2 rounded text-black"
              )}
            >
              Sign In
            </Link>
          )}
        </div>
      </MaxWidthWrapper>
    </header>
  );
}
