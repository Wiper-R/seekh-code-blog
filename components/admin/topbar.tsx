"use client";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type TopbarProps = {
  className?: string;
} & PropsWithChildren;

export function Topbar({ children, className }: TopbarProps) {
  return (
    <div className={cn("w-full p-4 border-b-4 flex gap-10", className)}>
      {children}
    </div>
  );
}

export function TopbarTitle({ title }: { title: string }) {
  return <h4 className="text-3xl font-semibold">{title}</h4>;
}
