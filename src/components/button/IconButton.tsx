import React from "react";

import StatusContent from "@/components/StatusContent";
import { Icon, Status, Button as TButton } from "@/types";
import { Button } from "@components/ui/button";

type Props = TButton & {
  isAnimation?: boolean;
  Icons?: {
    [key in Status]?: {
      Icon?: Icon;
      className?: string;
    };
  };
  hidden?: boolean;
};

const IconButton = React.forwardRef<HTMLButtonElement, Props>(
  (
    { status, iconClassName, contentClassName, Icon, children, ...props },
    ref,
  ) => {
    return (
      <Button disabled={status === Status.PENDING} {...props} ref={ref}>
        <StatusContent
          status={status || Status.IDLE}
          iconClassName={iconClassName}
          contentClassName={`font-medium ${contentClassName}`}
          {...props}
          Icons={{
            [Status.IDLE]: { Icon: Icon },
          }}
          alwaysIcons={true}
        >
          {children}
        </StatusContent>
      </Button>
    );
  },
);
IconButton.displayName = "SubmitButton";

export default IconButton;
