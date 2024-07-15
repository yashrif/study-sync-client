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
  header?: (data: string) => JSX.Element;
  headerClassName?: string;
  formatter?: (data: string | Date | number | boolean) => string | number;
  linkKey?: string;
  Icon?: (props: FileIcon) => Icon;
  className?: (props: boolean) => string;
  iconClassName?: (props: boolean) => string;
  additionalElement?: (props: UploadSimple) => JSX.Element | null;
};

export type TableAction = {
  title: string;
  Icon?: Icon;
  className?: string;
  iconClassName?: string;
  titleClassName?: string;
  onClick: () => void;
};

export enum TableControlTypes {
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
