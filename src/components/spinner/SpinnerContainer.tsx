import { cva } from "class-variance-authority";
import React from "react";

import { cn } from "@/lib/utils";
import Spinner from "./Spinner";

type Props = {
  containerClassName?: string;
  spinnerClassName?: string;
};

const spinnerVariants = cva("w-full h-full flex justify-center items-center ");

const SpinnerContainer: React.FC<Props> = ({
  containerClassName,
  spinnerClassName,
}) => {
  return (
    <div className={cn(spinnerVariants({ className: containerClassName }))}>
      <Spinner className={spinnerClassName} />
    </div>
  );
};

export default SpinnerContainer;
