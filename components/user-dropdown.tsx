"use client";

import { User } from "next-auth";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function UserDropdown({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="rounded-xl">
          <AvatarImage src={user.image || undefined} />
          <AvatarFallback>{user.name}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {user.email == "rshivang12345@gmail.com" && (
          <Link href="/admin">
            <DropdownMenuItem>Admin</DropdownMenuItem>
          </Link>
        )}
        <DropdownMenuItem
          onClick={() => signOut()}
          className={cn("text-destructive focus:text-destructive")}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
