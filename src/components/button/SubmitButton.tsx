import _ from "lodash";
import React from "react";

import { Status } from "@/types/status";
import StatusIcon from "@components/StatusIcon";
import { Button, ButtonProps, buttonVariants } from "@components/ui/button";

type Props = ButtonProps & {
  status?: Status;
};

const SubmitButton = React.forwardRef<HTMLButtonElement, Props>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      status = Status.IDLE,
      ...props
    },
    ref
  ) => {
    const filteredProps = { ..._.omit(props, "children") };

    return (
      <Button
        className={className}
        variant={variant}
        size={size}
        asChild={asChild}
        ref={ref}
        disabled={status === Status.PENDING}
        {...filteredProps}
      >
        {StatusIcon({ status, content: props.children })}
      </Button>
    );
  }
);
SubmitButton.displayName = "SubmitButton";

export { buttonVariants };
export default SubmitButton;
