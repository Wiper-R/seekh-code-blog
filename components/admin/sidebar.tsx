import Link from "next/link";
import SeekhCodeIcon from "@/public/seekh-code.png";
import { HomeIcon } from "lucide-react";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getUser } from "@/actions/auth";
import { SidebarItems } from "./sidebar-items";

export async function Sidebar() {
  const user = (await getUser())!;
  return (
    <aside className="h-full w-[300px] flex flex-col border-r flex-shrink-0">
      <div className="flex items-center p-4 border-b gap-4">
        <img src={SeekhCodeIcon.src} className="w-14" />
        <span>Seekh Code</span>
      </div>
      <SidebarItems />
      <div className="p-4 flex items-center gap-3 border-t">
        <Avatar>
          <AvatarImage src={user.image!} />
          <AvatarFallback>{user.name}</AvatarFallback>
        </Avatar>
        <div>
          <div>{user.name}</div>
          <div className="text-gray-400">@{user.username}</div>
        </div>
        <Link
          href="/"
          className={cn(
            buttonVariants({ size: "icon" }),
            "ml-auto dark:bg-muted dark:text-white"
          )}
        >
          <HomeIcon />
        </Link>
      </div>
    </aside>
  );
}
