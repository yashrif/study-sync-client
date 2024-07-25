import { IconLoader2 } from "@tabler/icons-react";
import React from "react";

type Props = {
  className?: string;
};

const Spinner: React.FC<Props> = ({ className }) => {
  return (
    <IconLoader2 className={`animate-spin size-6 text-primary ${className}`} />
  );
};

export default Spinner;
