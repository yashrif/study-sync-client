import { Icon } from "@allTypes";

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

export type Button = {
  title: string;
  Icon?: Icon;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: () => void;
  className?: string;
};
