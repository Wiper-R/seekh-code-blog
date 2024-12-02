import React, { type ComponentProps, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva([], {
  variants: {
    variant: {
      primary: ["bg-green-600 hover:bg-green-700 text-white"],
      secondary: ["bg-gray-200 dark:bg-white hover:dark:bg-gray-200"],
    },
    size: {
      default: "",
      lg: [
        "rounded text-base md:text-xl px-4 md:px-8 py-2 md:py-4 font-semibold",
      ],
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

type ButtonProps = VariantProps<typeof buttonVariants> &
  ComponentProps<"button">;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, className, ...props }, ref) => (
    <button
      {...props}
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
    />
  ),
);

Button.displayName = "Button";

export { Button, buttonVariants };
