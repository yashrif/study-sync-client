import React from "react";

import StatusContent from "@/components/StatusContent";
import { Content, ContentType, Status, Button as TButton } from "@/types";
import { Button } from "@components/ui/button";

type Props = TButton & {
  isAnimation?: boolean;
  contents?: {
    [key in Status]?: Content;
  };
  hidden?: boolean;
  alwaysIcons?: boolean;
  containerClassName?: string;
  contentType?: ContentType;
};

const IconButton = React.forwardRef<HTMLButtonElement, Props>(
  (
    {
      status,
      className,
      iconClassName,
      containerClassName,
      contentType,
      alwaysIcons = true,
      contentClassName,
      Icon,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Button
        disabled={status === Status.PENDING}
        className={className}
        {...props}
        ref={ref}
      >
        <StatusContent
          status={status || Status.IDLE}
          iconClassName={iconClassName}
          contentClassName={`font-medium ${contentClassName}`}
          contents={{
            [Status.IDLE]: { type: "icon-content", Icon: Icon },
          }}
          isAlwaysIcons={alwaysIcons}
          className={containerClassName}
          {...props}
          type={contentType}
        >
          {children || props.title ? <span>{props.title}</span> : undefined}
        </StatusContent>
      </Button>
    );
  }
);
IconButton.displayName = "SubmitButton";

export default IconButton;
