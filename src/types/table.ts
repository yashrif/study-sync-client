import {
  Button,
  ButtonSize,
  ButtonVariant,
  FileIcon,
  Icon,
  UploadSimple,
} from "@allTypes";

export type ColumnNoLink = {
  type: "no_link";
  accessorKey: keyof UploadSimple;
  title: string;
  header?: (data: string) => JSX.Element;
  headerClassName?: string;
  formatter?: (data: string | Date | number | boolean) => string | number;
  Icon?: (props: FileIcon) => Icon;
  className?: (props: boolean) => string;
  iconClassName?: (props: boolean) => string;
  additionalElement?: (props: UploadSimple) => JSX.Element | null;
};

export type Column =
  | ColumnNoLink
  | (Omit<ColumnNoLink, "type"> & {
      type: "link";
      linkKey: string;
      path: string;
    });

export type TableAction = {
  title: string;
  Icon?: Icon;
  className?: string;
  iconClassName?: string;
  titleClassName?: string;
  onClick: () => void;
};

export enum TableControlTypes {
  UPLOAD = "UPLOAD",
  ADD_FOLDER = "ADD_FOLDER",
  DELETE = "DELETE",
  SEARCH = "SEARCH",
  VIEW = "VIEW",
}

export type TTableControl = {
  hidden?: boolean;
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
