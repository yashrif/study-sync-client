import { cva } from "class-variance-authority";
import _ from "lodash";
import React from "react";

import StatusContent from "@/components/StatusContent";
import { cn } from "@/lib/utils";
import { Content, ContentType, Status, Button as TButton } from "@/types";
import { Button } from "@components/ui/button";

type Props = TButton & {
  isAnimation?: boolean;
  contents?: {
    [key in Status]?: Content;
  };
  hidden?: boolean;
  isAlwaysIcons?: boolean;
  containerClassName?: string;
  contentType?: ContentType;
};

const successIconVariants = cva("stroke-white");

const IconButton = React.forwardRef<HTMLButtonElement, Props>(
  (
    {
      status,
      className,
      iconClassName,
      containerClassName,
      contentType,
      isAlwaysIcons = true,
      contentClassName,
      Icon,
      children,
      contents,
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
          contents={
            _.isEmpty(contents)
              ? {
                  [Status.IDLE]: { type: "icon-content", Icon: Icon },
                }
              : {
                  ...contents,
                  [Status.SUCCESS]: _.isEmpty(contents[Status.SUCCESS])
                    ? {
                        type: "icon-only",
                        iconClassName: "stroke-white",
                      }
                    : contents[Status.SUCCESS].type === "content-only"
                      ? {
                          ...contents[Status.SUCCESS],
                        }
                      : {
                          ...contents[Status.SUCCESS],
                          iconClassName: cn(
                            successIconVariants({
                              className: contents[Status.SUCCESS],
                            })
                          ),
                        },
                }
          }
          isAlwaysIcons={isAlwaysIcons}
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
