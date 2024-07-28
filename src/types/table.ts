import {
  Button,
  ButtonSize,
  ButtonVariant,
  FileTypes,
  Icon,
  Status,
} from "@allTypes";

export type ColumnNoLink<T> = {
  type: "no_link";
  accessorKey: keyof T;
  title: string;
  header?: (data: string) => JSX.Element;
  showSort?: boolean;
  headerClassName?: string;
  formatter?: (field: T[keyof T], row?: T) => string | number | React.ReactNode;
  Icon?: (props: FileIcon<T>) => Icon;
  className?: (props: boolean) => string;
  iconClassName?: (props: boolean) => string;
  additionalElement?: (props: T) => JSX.Element | null;
};

export type Column<T> =
  | ColumnNoLink<T>
  | (Omit<ColumnNoLink<T>, "type"> & {
      type: "link";
      linkKey: keyof T;
      path: string;
    });

export type TableAction<T> = {
  title: string;
  Icon?: Icon;
  className?: string;
  iconClassName?: string;
  titleClassName?: string;
  onClick: (data?: T) => void;
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
  onClick?: () => void;
  status?: Status;
};

export type ColumnConfig<T> = {
  columns: Column<T>[];
  actions: Button[];
};

export type FileIcon<T> = {
  key: keyof T;
  value: T & {
    type?: FileTypes;
  };
};
