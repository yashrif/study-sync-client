export type Column = {
  accessorKey: string;
  title: string;
  formatter?: (data: string | Date | number) => string | number;
  linkKey?: string;
};
