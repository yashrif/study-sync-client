import * as React from "react";

import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Icon } from "@/types";

const inputVariants = cva(
  "flex w-full font-medium placeholder:font-normal focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-color duration-300",
  {
    variants: {
      variant: {
        default:
          "rounded-lg text-primary border border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        underline:
          "rounded-none !px-0 bg-transparent focus-visible:text-text-400 font-medium placeholder:text-text border-b-[1.5px] border-b-text focus-visible:ring-offset-0 focus-visible:ring-0 outline-none  focus-visible:border-b-primary no-autofill-style",
      },
      dimension: {
        default: "h-10 px-3 py-2 text-base",
        sm: "h-9  px-3 py-1.5 rounded-sm text-sm",
        lg: "h-12 px-4 py-2 text-large",
      },
      spacing: {
        default: "pl-10",
        sm: "pl-10",
        lg: "pl-12",
      },
    },
    defaultVariants: {
      variant: "default",
      dimension: "default",
    },
  },
);

const iconVariants = cva(
  "absolute w-auto text-primary cursor-pointer hover:scale-110 transition-all duration-300",
  {
    variants: {
      dimension: {
        default: "h-6 top-1/2 -translate-y-1/2 left-3",
        sm: "h-5 top-1/2 -translate-y-1/2 left-3",
        lg: "h-7 top-1/2 -translate-y-1/2 left-4",
      },
    },
    defaultVariants: {
      dimension: "default",
    },
  },
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "underline";
  dimension?: "default" | "sm" | "lg";
  Icon?: Icon;
  iconStyle?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      variant = "default",
      dimension = "default",
      Icon,
      iconStyle,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            inputVariants({
              dimension,
              variant,
              spacing: dimension,
              className: `${className}`,
            }),
          )}
          ref={ref}
          {...props}
        />
        {Icon && (
          <Icon
            className={cn(iconVariants({ dimension, className: iconStyle }))}
          />
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
