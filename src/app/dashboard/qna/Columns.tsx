import { ColumnDef } from "@tanstack/react-table";

import { columnConfig } from "@/assets/data/dashboard/qna";
import {
  Actions,
  Checkbox,
  ColumnHeader,
} from "@/components/table/ColumnTools";
import { UploadSimple } from "@/types/upload";

const columnHeaders = columnConfig.columns.map((column) =>
  ColumnHeader<UploadSimple>({ column }),
);

export const columns: ColumnDef<UploadSimple>[] = [
  {
    ...Checkbox(),
  },
  ...columnHeaders,
];
