import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type MaxWidthWrapperProps = {} & ComponentProps<"div">;

export function MaxWidthWrapper({ className, ...props }: MaxWidthWrapperProps) {
  return <div className={cn("mx-auto max-w-7xl p-2", className)} {...props} />;
}
