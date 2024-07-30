import { ButtonProps } from "@/components/ui/button";
import { Icon, Status } from "@allTypes";

export type ButtonVariant =
  | "default"
  | "outline"
  | "link"
  | "destructive"
  | "secondary"
  | "ghost"
  | null
  | undefined;

export type ButtonSize =
  | "default"
  | "sm"
  | "lg"
  | "xl"
  | "icon"
  | null
  | undefined;

export type ButtonLink = {
  title: string;
  href: string;
  variant: ButtonVariant;
  className?: string;
};

export type Button = React.ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonProps & {
    Icon?: Icon;
    iconClassName?: string;
    contentClassName?: string;
    status?: Status;
  };

export type ContentType = "icon-content" | "icon-only" | "content-only";

export type Content =
  | {
      type: "icon-content";
      Icon?: Icon;
      content?: string;
      iconClassName?: string;
      contentClassName?: string;
    }
  | {
      type: "icon-only";
      Icon?: Icon;
      iconClassName?: string;
    }
  | {
      type: "content-only";
      content?: string;
      contentClassName?: string;
    };
