import {
  Button,
  ButtonSize,
  ButtonVariant,
  FileIcon,
  Icon,
  UploadSimple,
} from "@allTypes";

export type Column = {
  accessorKey: keyof UploadSimple;
  title: string;
  formatter?: (data: string | Date | number | boolean) => string | number;
  linkKey?: string;
  Icon?: (props: FileIcon) => Icon;
  className?: (props: boolean) => string;
  iconClassName?: (props: boolean) => string;
  additionalElement?: (props: UploadSimple) => JSX.Element | null;
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

export type ColumnConfig = {
  columns: Column[];
  actions: Button[];
};
