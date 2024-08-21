import { cva } from "class-variance-authority";
import randomColor from "randomcolor";
import { useMemo } from "react";

import { cn } from "@/lib/utils";

type Variant = "outline" | "default";
type Size = "default" | "sm" | "lg" | "xl";

type Props = {
  className?: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  style?: React.CSSProperties;
  color?: string;
  isRandomColor?: boolean;
};

const avatarVariants = cva(
  "flex items-center justify-center text-medium rounded-full",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        outline: "ring-1 ring-inset ring-primary text-primary",
      },
      size: {
        default: "size-10",
        sm: "size-8",
        lg: "size-12",
        xl: "size-16",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Avatar: React.FC<Props> = ({
  children,
  className,
  variant = "default",
  size,
  style,
  color,
  isRandomColor = false,
}) => {
  let avatarContent: string | string[] | React.ReactNode = children;
  if (typeof children === "string")
    avatarContent = (
      children.split(" ").length > 1
        ? children
            .split(" ")
            .map((word) => word[0])
            .join("")
        : children.slice(0, 2)
    ).toUpperCase();
  else if (Array.isArray(children))
    avatarContent = children
      .filter(
        (word) =>
          word && typeof word === "string" && word.length > 0 && word != " "
      )
      .map((word) => word[0])
      .join("")
      .toUpperCase();

  const generatedColor = useMemo(
    () => (isRandomColor ? randomColor({ luminosity: "bright" }) : undefined),
    [isRandomColor]
  );

  return (
    <div
      style={{
        backgroundColor:
          variant === "default"
            ? color
              ? color
              : isRandomColor
                ? generatedColor
                : undefined
            : "undefined",
        boxShadow:
          variant === "outline"
            ? color
              ? color
              : isRandomColor
                ? `inset 0 0 0 1px ${generatedColor}`
                : ""
            : "",
        color:
          variant === "outline"
            ? color
              ? color
              : isRandomColor
                ? generatedColor
                : undefined
            : undefined,
        ...style,
      }}
      className={cn(avatarVariants({ variant, size, className }))}
    >
      {avatarContent}
    </div>
  );
};

export default Avatar;
