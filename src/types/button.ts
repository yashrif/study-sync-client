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

export type Button = {
  title: string;
  href: string;
  variant: ButtonVariant;
  className?: string;
};
