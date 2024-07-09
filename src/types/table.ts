import { ButtonVariant } from "@allTypes";

export type Column = {
  accessorKey: string;
  title: string;
  formatter?: (data: string | Date | number) => string | number;
  linkKey?: string;
  iconKey?: string;
};

export enum TableControls {
  Upload = "Upload",
  AddFolder = "AddFolder",
  Delete = "Delete",
  Search = "Search",
  View = "View",
}

export type TTableControls = {
  [key in TableControls]?: {
    show?: boolean;
    order?: number;
    className?: string;
    variant?: ButtonVariant;
    title?: string;
  };
};
