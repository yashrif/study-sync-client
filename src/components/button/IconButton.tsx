import { Button as ButtonType } from "@/types";
import { Button } from "../ui/button";
import { HTMLAttributes, CSSProperties } from "react";

type Props = {
  show?: boolean;
  style?: CSSProperties;
};

const IconButton: React.FC<Props & ButtonType> = ({
  variant,
  size,
  show = true,
  style,
  Icon,
  className,
  iconClassName,
  title,
  onClick,
  ...rest
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      className={`${className}`}
      style={{
        visibility: show ? "visible" : "hidden",
        ...style,
      }}
      onClick={onClick ? onClick : () => {}}
      {...rest}
    >
      {Icon && (
        <Icon className={`h-4 w-auto stroke-[2.5px] ${iconClassName}`} />
      )}
      {title && <span>{title}</span>}
    </Button>
  );
};

export default IconButton;
