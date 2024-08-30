// Use tva

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, forwardRef } from "react";

const buttonVariants = cva(
  [
    "text-black inline-flex  items-center disabled:text-gray-400 disabled:cursor-not-allowed rounded-sm",
  ],
  {
    variants: {
      variant: { primary: {}, transparent: {} },
      size: { icon: ["p-2", "text-md"] },
    },
    defaultVariants: { variant: "primary" },
  }
);

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={cn(buttonVariants({ variant, size, className }))}
      />
    );
  }
);

export { Button };
