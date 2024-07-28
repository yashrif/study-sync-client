import { Icon } from "@allTypes";

export type HTMLInputTypes =
  | "text"
  | "password"
  | "email"
  | "tel"
  | "url"
  | "number"
  | "range"
  | "date"
  | "datetime-local"
  | "month"
  | "week"
  | "time"
  | "color"
  | "checkbox"
  | "radio"
  | "file"
  | "hidden"
  | "submit"
  | "reset"
  | "button"
  | "image"
  | "search";

export type FormField = {
  label: string;
  type: HTMLInputTypes;
  placeholder: string;
  id: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  Icon?: Icon;
};
