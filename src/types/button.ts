export type Button = {
  title: string;
  href: string;
  variant:
    | "default"
    | "outline"
    | "link"
    | "destructive"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  className?: string;
};
