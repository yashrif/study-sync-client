import { Button as ButtonType } from "@/types";
import { Button } from "../ui/button";
import { HTMLAttributes, CSSProperties } from "react";

type Props = {
  show?: boolean;
  style?: CSSProperties;
};

const ControlButton: React.FC<Props & ButtonType> = ({
  variant,
  size,
  show = true,
  style,
  Icon,
  title,
  onClick,
  ...rest
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      className="flex items-center gap-1.5"
      style={{
        visibility: show ? "visible" : "hidden",
        ...style,
      }}
      onClick={onClick ? onClick : () => {}}
      {...rest}
    >
      {Icon && <Icon className="h-4 w-auto" />}
      {title}
    </Button>
  );
};

export default ControlButton;
