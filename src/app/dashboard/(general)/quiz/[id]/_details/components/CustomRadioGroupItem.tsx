import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import React from "react";

import { useQuizContext } from "@/hooks/useQuizContext";
import { cn } from "@/lib/utils";

type Props = React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
  answer: string;
};

const CustomRadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  Props
>(({ className, value, answer, ...props }, ref) => {
  const {
    state: { isShowResults },
  } = useQuizContext();

  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "parent-container relative w-10 flex gap-10 items-center justify-center",
        className,
      )}
      value={value}
      {...props}
    >
      <div
        className={`size-8 flex items-center justify-center rounded-full text-primary hover:ring-2 hover:ring-inset hover:ring-primary cursor-pointer peer-hover:ring-2 transition-colors duration-150
        ${isShowResults && value === answer ? "ring-success ring-2 ring-inset text-success" : ""}`}
      >
        <span className="text-medium font-secondary font-semibold">
          {value}
        </span>
      </div>

      <RadioGroupPrimitive.Indicator
        className={`absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 size-8 flex items-center justify-center rounded-full cursor-pointer transition-colors duration-150
           ${isShowResults ? (value === answer ? "bg-success" : "bg-destructive") : "bg-primary"}`}
      >
        <span className="text-medium text-text-300 font-secondary font-semibold">
          {value}
        </span>
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
CustomRadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { CustomRadioGroupItem };
