"use client";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { buttonVariants } from "../ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

type SidebarItemProps = {
  href: string;
  icon: LucideIcon;
  title: string;
};

export function SidebarItem(props: SidebarItemProps) {
  const pathname = usePathname();
  const href = "/admin" + props.href;
  const isActive = pathname.includes(props.href);
  const variant = isActive ? "default" : "ghost";
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant }),
        variant == "default" &&
          "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
        "justify-start"
      )}
    >
      <props.icon className="h-6 w-6 mr-2" />
      {props.title}
    </Link>
  );
}
