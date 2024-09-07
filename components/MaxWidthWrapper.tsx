import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type MaxWidthWrapperProps = {} & ComponentProps<"div">;

export function MaxWidthWrapper({ className, ...props }: MaxWidthWrapperProps) {
  return (
    <div className={cn("mx-auto max-w-[1440px] px-4", className)} {...props} />
  );
}
