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

export type Button = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
  Icon?: Icon;
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconClassName?: string;
  disabled?: boolean;
  status?: Status;
};
