import { IconCircleX, IconRefresh } from "@tabler/icons-react";
import { cva } from "class-variance-authority";

import Spinner from "@/components/spinner/Spinner";
import { cn } from "@/lib/utils";
import {
  ButtonSize,
  ButtonVariant,
  ContentType,
  Icon,
  Status,
  Content as TContent,
} from "@allTypes";
import { CheckmarkAnimated, CircleCheck } from "@icons";

const variantColor = {
  default: "text-primary-foreground",
  destructive: "text-destructive-foreground",
  outline: "text-primary hover:text-accent-foreground",
  secondary: "text-secondary-foreground",
  ghost: "text-text hover:text-accent-foreground",
  link: "text-primary",
};

const contentVariants = cva("text-medium transition-all duration-300", {
  variants: {
    variant: { ...variantColor },
    size: {
      default: "text-base",
      sm: "text-sm",
      lg: "text-lg",
      xl: "text-xl",
      icon: "h-6 w-6",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const iconVariants = cva("size-4 stroke-2", {
  variants: {
    variant: { ...variantColor },
    size: {
      default: "size-4",
      sm: "size-[14px]",
      lg: "size-[18px] stroke-[2.5px]",
      xl: "size-5 stroke-[2.5px]",
      icon: "h-6 w-6",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const containerVariants = cva(
  "flex gap-1.5 items-center justify-center transition-all duration-300"
);

type Props = {
  children?: React.ReactNode;
  className?: string;
  iconClassName?: string;
  contentClassName?: string;
  isAnimation?: boolean;
  size?: ButtonSize;
  status?: Status;
  variant?: ButtonVariant;
  isAlwaysIcons?: boolean;
  contents?: {
    [key in Status]?: TContent;
  };
  type?: ContentType;
};

const StatusContent: React.FC<Props> = ({
  isAlwaysIcons = false,
  children,
  className,
  iconClassName,
  contentClassName,
  contents,
  isAnimation = true,
  size = "default",
  status = Status.IDLE,
  variant = "default",
  type = "icon-content",
}) => {
  const contentClassNameExtended = cn(
    contentVariants({ variant, size, className: contentClassName })
  );
  const iconClassNameExtended = cn(
    iconVariants({ variant, size, className: iconClassName })
  );
  const classNameExtended = cn(containerVariants({ className }));

  if (!status) return children;

  switch (status) {
    case Status.IDLE:
      return (
        <Content
          alwaysIcons={isAlwaysIcons}
          content={contents?.IDLE}
          iconClassName={`${iconClassNameExtended}`}
          DefaultIcon={IconRefresh}
          contentClassName={contentClassNameExtended}
          className={classNameExtended}
          type={type}
        >
          {children}
        </Content>
      );
    case Status.PENDING:
      return (
        <Content
          alwaysIcons={isAlwaysIcons}
          content={contents?.PENDING}
          iconClassName={`${iconClassNameExtended}`}
          DefaultIcon={Spinner}
          contentClassName={contentClassNameExtended}
          className={classNameExtended}
          type={type}
        >
          {children}
        </Content>
      );
    case Status.SUCCESS:
      return (
        <Content
          alwaysIcons={isAlwaysIcons}
          content={contents?.SUCCESS}
          iconClassName={`text-success stroke-success ${iconClassNameExtended}`}
          DefaultIcon={isAnimation ? CheckmarkAnimated : CircleCheck}
          contentClassName={contentClassNameExtended}
          className={classNameExtended}
          type={type}
        >
          {children}
        </Content>
      );
    case Status.ERROR:
      return (
        <Content
          alwaysIcons={isAlwaysIcons}
          content={contents?.ERROR}
          iconClassName={`text-destructive ${iconClassNameExtended}`}
          DefaultIcon={IconCircleX}
          contentClassName={contentClassNameExtended}
          className={classNameExtended}
          type={type}
        >
          {children}
        </Content>
      );
    default:
      return children;
  }
};

export default StatusContent;

type ContentProps = {
  alwaysIcons: boolean;
  children?: React.ReactNode;
  contentClassName?: string;
  className?: string;
  DefaultIcon: Icon;
  content?: TContent;
  iconClassName?: string;
  type: ContentType;
};

const Content: React.FC<ContentProps> = ({
  alwaysIcons,
  children,
  className,
  contentClassName,
  DefaultIcon,
  content,
  iconClassName,
  type,
}) => {
  const renderedAlwaysIcon = (content: TContent): React.ReactNode => {
    switch (content.type) {
      case "icon-only":
        return content.Icon ? (
          <content.Icon
            className={`${iconClassName} ${content.iconClassName || ""}`}
          />
        ) : (
          <DefaultIcon
            className={`${iconClassName} ${content.iconClassName || ""}`}
          />
        );
      case "content-only":
        return content.content ? (
          <span
            className={`${contentClassName} ${content.contentClassName || ""}`}
          >
            {content.content}
          </span>
        ) : (
          <div className={contentClassName}>{children}</div> || null
        );
      case "icon-content":
      default:
        return (
          <>
            {renderedAlwaysIcon({ ...content, type: "icon-only" })}
            {children &&
              renderedAlwaysIcon({ ...content, type: "content-only" })}
          </>
        );
    }
  };

  const renderedContent = (content: TContent): React.ReactNode => {
    switch (content.type) {
      case "icon-only":
        return content.Icon ? (
          <content.Icon
            className={`${iconClassName} ${content.iconClassName || ""}`}
          />
        ) : (
          <DefaultIcon
            className={`${iconClassName} ${content.iconClassName || ""}`}
          />
        );
      case "content-only":
        return content.content ? (
          <span
            className={`${contentClassName} ${content.contentClassName || ""}`}
          >
            {content.content}
          </span>
        ) : children ? (
          <div className={contentClassName}>{children}</div>
        ) : null;
      case "icon-content":
      default:
        return (
          <>
            {content?.Icon &&
              renderedAlwaysIcon({ ...content, type: "icon-only" })}
            {renderedAlwaysIcon({ ...content, type: "content-only" })}
          </>
        );
    }
  };

  return (
    <div className={className}>
      {alwaysIcons
        ? renderedAlwaysIcon(content || ({ type } as TContent))
        : renderedContent(content || ({ type } as TContent))}
    </div>
  );
};
