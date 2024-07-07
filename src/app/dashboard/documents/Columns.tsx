import { ColumnDef } from "@tanstack/react-table";

import { columnConfig } from "@/assets/data/dashboard/documents";
import {
  Actions,
  Checkbox,
  ColumnHeader,
} from "@/components/table/ColumnTools";
import { UploadSimple } from "@/types/upload";

const columnHeaders = columnConfig.columns.map((column) =>
  ColumnHeader<UploadSimple>({ column })
);

export const columns: ColumnDef<UploadSimple>[] = [
  {
    ...Checkbox(),
  },
  ...columnHeaders,
  {
    ...Actions<UploadSimple>({ actions: columnConfig.actions, copyId: true }),
  },
];
