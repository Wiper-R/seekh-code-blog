import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type Props = ComponentProps<"div">;

export function MaxWidthWrapper({ className, ...props }: Props) {
  return (
    <div className={cn("max-w-[1440px] mx-auto px-4", className)} {...props} />
  );
}
