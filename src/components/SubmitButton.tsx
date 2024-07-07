import error from "@lotties/error.json";
import _ from "lodash";
import * as React from "react";
import Lottie from "react-lottie";

import { Status } from "@/types/status";
import { CheckmarkAnimated } from "@icons";
import Spinner from "./Spinner";
import { Button, ButtonProps, buttonVariants } from "./ui/button";

const errorAnimation = {
  loop: true,
  autoplay: true,
  animationData: error,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const content = (status: Status, content: React.ReactNode) => {
  switch (status) {
    case Status.IDLE:
      return content;
    case Status.PENDING:
      return <Spinner className="size-6" />;
    case Status.SUCCESS:
      return <CheckmarkAnimated />;
    case Status.ERROR:
      return <Lottie options={errorAnimation} height={128} width={128} />;
    default:
      return content;
  }
};

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
        {content(status, props.children)}
      </Button>
    );
  }
);
SubmitButton.displayName = "SubmitButton";

export { buttonVariants };
export default SubmitButton;
