import { Button as ButtonType } from "@/types";
import { Button } from "../ui/button";

type Props = {
  show?: boolean;
};

const ControlButton: React.FC<Props & ButtonType> = ({
  variant,
  size,
  show = true,
  Icon,
  title,
  onClick,
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      className="flex items-center gap-1.5"
      style={{
        visibility: show ? "visible" : "hidden",
      }}
      onClick={onClick ? onClick : () => {}}
    >
      {Icon && <Icon className="h-4 w-auto" />}
      {title}
    </Button>
  );
};

export default ControlButton;
