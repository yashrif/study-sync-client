import { IconCircleX, IconRefresh } from "@tabler/icons-react";
import { cva } from "class-variance-authority";

import Spinner from "@/components/spinner/Spinner";
import { cn } from "@/lib/utils";
import { ButtonSize, ButtonVariant, Icon, Status } from "@allTypes";
import { CheckmarkAnimated, CircleCheck } from "@components/icons";

const variantColor = {
  default: "text-primary-foreground",
  destructive: "text-destructive-foreground",
  outline: "text-primary hover:text-accent-foreground",
  secondary: "text-secondary-foreground",
  ghost: "text-text hover:text-accent-foreground",
  link: "text-primary",
};

const contentVariants = cva("text-medium", {
  variants: {
    variant: variantColor,
    size: {
      default: "text-medium",
      sm: "text-small",
      lg: "text-large",
      xl: "text-xl",
      icon: "h-6 w-6",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const iconVariants = cva("size-4", {
  variants: {
    variant: variantColor,
    size: {
      default: "size-4",
      sm: "size-[14px]",
      lg: "size-[18px]",
      xl: "size-5",
      icon: "h-6 w-6",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type Props = {
  children?: React.ReactNode;
  className?: string;
  iconClassName?: string;
  isAnimation?: boolean;
  size?: ButtonSize;
  status?: Status;
  title?: string;
  variant?: ButtonVariant;
  Icons?: {
    [key in Status]?: {
      Icon?: Icon;
      className?: string;
    };
  };
};

const StatusContent: React.FC<Props> = ({
  children,
  className,
  iconClassName,
  Icons,
  isAnimation = true,
  size = "default",
  status = Status.IDLE,
  title,
  variant = "default",
}) => {
  const contentClassName = cn(
    contentVariants({ variant, size, className: "" })
  );
  const iconCustomClassName = cn(
    iconVariants({ variant, size, className: iconClassName })
  );

  if (!status) return children;

  switch (status) {
    case Status.IDLE:
      return (
        <Content
          Icon={Icons?.IDLE?.Icon}
          iconClassName={`${iconCustomClassName} ${Icons?.IDLE?.className}`}
          DefaultIcon={IconRefresh}
          contentClassName={contentClassName}
          className={className}
          content={children}
          title={title}
        />
      );
    case Status.PENDING:
      return (
        <Content
          Icon={Icons?.PENDING?.Icon}
          iconClassName={`${iconCustomClassName} ${Icons?.PENDING?.className}`}
          DefaultIcon={Spinner}
          contentClassName={contentClassName}
          className={className}
          content={children}
          title={title}
        />
      );
    case Status.SUCCESS:
      return (
        <Content
          Icon={Icons?.SUCCESS?.Icon}
          iconClassName={`text-success stroke-success ${iconCustomClassName} ${Icons?.SUCCESS?.className}`}
          DefaultIcon={isAnimation ? CheckmarkAnimated : CircleCheck}
          contentClassName={contentClassName}
          className={className}
          content={children}
          title={title}
        />
      );
    case Status.ERROR:
      return (
        <Content
          Icon={Icons?.SUCCESS?.Icon}
          iconClassName={`text-destructive ${iconCustomClassName} ${Icons?.SUCCESS?.className}`}
          DefaultIcon={IconCircleX}
          contentClassName={contentClassName}
          className={className}
          content={children}
          title={title}
        />
      );
    default:
      return children;
  }
};

export default StatusContent;

type ContentProps = {
  content?: React.ReactNode;
  contentClassName?: string;
  className?: string;
  DefaultIcon: Icon;
  Icon?: Icon;
  iconClassName?: string;
  title?: string;
};

const Content: React.FC<ContentProps> = ({
  content,
  className,
  contentClassName,
  DefaultIcon,
  Icon,
  iconClassName,
  title,
}) => {
  return Icon ? (
    <div className={`flex gap-1.5 items-center justify-center ${className}`}>
      <Icon className={iconClassName} />
      {content || (title && <span className={contentClassName}>{title}</span>)}
    </div>
  ) : content || title ? (
    <div className={className}>
      {content || (title && <span className={contentClassName}>{title}</span>)}
    </div>
  ) : (
    <DefaultIcon className={iconClassName} />
  );
};
