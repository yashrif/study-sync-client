import * as React from "react";

import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Icon, InputSizes } from "@/types";

const inputVariants = cva(
  "flex w-full placeholder:font-normal focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-color duration-300",
  {
    variants: {
      variant: {
        default:
          "rounded-md text-text border border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        underline:
          "rounded-none bg-transparent font-medium text-primary focus-visible:text-primary font-medium placeholder:text-text border-b-[1.5px] border-b-text focus-visible:ring-offset-0 focus-visible:ring-0 outline-none  focus-visible:border-b-primary no-autofill-style",
      },
      dimension: {
        default: "h-10 px-3 py-2 text-base",
        sm: "h-9  px-3 py-1.5 rounded-sm text-sm",
        md: "h-10 px-3 py-2 text-base",
        lg: "h-12 px-4 py-2 text-large",
      },
      spacing: {
        default: "",
        sm: "pl-10",
        md: "pl-12",
        lg: "pl-16",
      },
    },
    defaultVariants: {
      variant: "default",
      dimension: "default",
    },
  },
);

const iconVariants = cva(
  "absolute w-auto stroke-[2.5px] text-primary cursor-pointer hover:scale-110 transition-all duration-300",
  {
    variants: {
      dimension: {
        default: "h-6 top-1/2 -translate-y-1/2 left-3",
        sm: "h-5 top-1/2 -translate-y-1/2 left-3",
        md: "h-6 top-1/2 -translate-y-1/2 left-3",
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
  dimension?: InputSizes;
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
      <div className="relative !mt-0">
        <input
          type={type}
          className={cn(
            inputVariants({
              dimension,
              variant,
              spacing: Icon ? dimension : "default",
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
