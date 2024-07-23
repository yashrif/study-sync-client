import _ from "lodash";
import React from "react";

import { Status } from "@/types/status";
import StatusIcon from "@components/StatusIcon";
import { Button, ButtonProps, buttonVariants } from "@components/ui/button";

type Props = ButtonProps & {
  status?: Status;
};

const IconButton = React.forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const filteredProps = { ..._.omit(props, "children") };

  return (
    <Button disabled={props.status === Status.PENDING} {...filteredProps}>
      {StatusIcon({ status: props.status, content: props.children })}
    </Button>
  );
});
IconButton.displayName = "SubmitButton";

export { buttonVariants };
export default IconButton;
