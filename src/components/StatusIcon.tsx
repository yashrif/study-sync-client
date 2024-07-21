import Spinner from "@/components/spinner/Spinner";
import { Icon, Status } from "@allTypes";
import { CheckmarkAnimated, CircleCheck } from "@components/icons";
import { IconRefresh } from "@tabler/icons-react";

type Props = {
  status?: Status;
  content?: React.ReactNode;
  className?: string;
  checkmarkStroke?: string;
  Icons?: {
    [key in Status]?: Icon;
  };
  isAnimation?: boolean;
};

const StatusIcon: React.FC<Props> = ({
  status,
  content,
  className,
  checkmarkStroke,
  Icons,
  isAnimation = true,
}) => {
  const customClass = `size-7 text-primary ${className}`;

  if (!status) return content;

  switch (status) {
    case Status.IDLE:
      return Icons && Icons.IDLE ? (
        <Icons.IDLE className={customClass} />
      ) : (
        content || <IconRefresh className={customClass} />
      );
    case Status.PENDING:
      return Icons && Icons.PENDING ? (
        <Icons.PENDING className={customClass} />
      ) : (
        <Spinner className={customClass} />
      );
    case Status.SUCCESS:
      return Icons && Icons.SUCCESS ? (
        <Icons.SUCCESS className={customClass} />
      ) : isAnimation ? (
        <CheckmarkAnimated className={customClass} stroke={checkmarkStroke} />
      ) : (
        <CircleCheck className={customClass} />
      );
    case Status.ERROR:
      return content;
    default:
      return content;
  }
};
export default StatusIcon;
