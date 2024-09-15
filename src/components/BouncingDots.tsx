import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  iconClassName?: string;
};

const containerVariants = cva("flex space-x-1 justify-center items-center");
const iconVariants = cva("size-2 bg-primary rounded-full animate-bounce", {
  variants: {
    position: {
      1: "[animation-delay:-0.5s]",
      2: "[animation-delay:-0.25s]",
      3: "",
    },
  },
  defaultVariants: {
    position: 3,
  },
});

const BouncingDots: React.FC<Props> = ({ className, iconClassName }) => {
  return (
    <div className={cn(containerVariants({ className }))}>
      <div
        className={cn(iconVariants({ className: iconClassName, position: 1 }))}
      />
      <div
        className={cn(iconVariants({ className: iconClassName, position: 2 }))}
      />
      <div
        className={cn(iconVariants({ className: iconClassName, position: 3 }))}
      />
    </div>
  );
};

export default BouncingDots;
