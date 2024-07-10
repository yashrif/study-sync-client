import {
  ButtonSize,
  ButtonVariant,
  FileIcon,
  Icon,
  UploadSimple,
} from "@allTypes";

export type Column = {
  accessorKey: keyof UploadSimple;
  title: string;
  formatter?: (data: string | Date | number) => string | number;
  linkKey?: string;
  Icon?: (props: FileIcon) => Icon;
  className?: string;
};

export enum TableControls {
  Upload = "Upload",
  AddFolder = "AddFolder",
  Delete = "Delete",
  Search = "Search",
  View = "View",
}

export type TTableControl = {
  show?: boolean;
  order?: number;
  className?: string;
  variant?: ButtonVariant;
  title?: string;
  Icon?: Icon;
  size?: ButtonSize;
};
