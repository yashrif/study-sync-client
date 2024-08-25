import { IconLoader2 } from "@tabler/icons-react";
import { cva } from "class-variance-authority";
import React from "react";

import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

const spinnerVariants = cva("animate-spin size-6 text-primary");

const Spinner: React.FC<Props> = ({ className }) => {
  return <IconLoader2 className={cn(spinnerVariants({ className }))} />;
};

export default Spinner;
