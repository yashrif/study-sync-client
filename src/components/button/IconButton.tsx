import { CSSProperties } from "react";

import { Button as ButtonType, Status } from "@/types";
import { Button } from "@components/ui/button";
import StatusIcon from "../StatusIcon";

type Props = {
  show?: boolean;
  style?: CSSProperties;
  showStatus?: boolean;
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
  status,
  showStatus,
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
      {showStatus ? (
        <StatusIcon
          status={status}
          className={`!size-4 hover:scale-[1.2] transition cursor-pointer ${
            status === Status.PENDING
              ? "animate-spin duration-1000"
              : "duration-300"
          } ${status === Status.SUCCESS ? "!text-success stroke-success" : status === Status.ERROR ? "!text-destructive" : ""}
            ${iconClassName}
          `}
          Icons={{
            [Status.IDLE]: Icon,
          }}
        />
      ) : (
        Icon && (
          <Icon className={`h-4 w-auto stroke-[2.5px] ${iconClassName}`} />
        )
      )}
      {title && (
        <span className={`${status ? "text-transparent" : ""}`}>{title}</span>
      )}
    </Button>
  );
};

export default IconButton;
