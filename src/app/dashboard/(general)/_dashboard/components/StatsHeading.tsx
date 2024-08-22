import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { IconList } from "@/types";

const headingVariants = cva("w-full flex gap-1.5 justify-start items-center");

type Props = Omit<IconList, "description"> & {
  className?: string;
  style?: React.CSSProperties;
};

const StatsHeading: React.FC<Props> = ({ Icon, title, className, style }) => {
  return (
    <div className={cn(headingVariants({ className }))} style={style}>
      <Icon className="stroke-[2.5px] size-4" />
      <h3 className="text-left text-base">{title}</h3>
    </div>
  );
};

export default StatsHeading;
