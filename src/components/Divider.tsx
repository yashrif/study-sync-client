import { IconSun } from "@tabler/icons-react";
import React from "react";

type Props = {
  className?: string;
};

const Divider: React.FC<Props> = ({ className }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="h-[1px] w-full rounded-full bg-border" />
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 px-4 bg-background">
        <IconSun className="stroke-accent" />
      </div>
    </div>
  );
};

export default Divider;
