import * as React from "react";

import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-color duration-300",
  {
    variants: {
      variant: {
        default:
          "rounded-lg border border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        underline:
          "rounded-none !px-0 bg-transparent focus-visible:text-secondary font-medium placeholder:text-text border-b-[1.5px] border-b-text focus-visible:ring-offset-0 focus-visible:ring-0 outline-none  focus-visible:border-b-secondary no-autofill-style",
      },
      dimension: {
        default: "h-10 px-3 py-2 text-base",
        lg: "h-12 px-4 py-2 text-large",
      },
    },
    defaultVariants: {
      variant: "default",
      dimension: "default",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "underline";
  dimension?: "default" | "lg";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, variant = "default", dimension = "default", ...props },
    ref
  ) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ dimension, variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
