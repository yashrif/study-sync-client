import { ColumnDef } from "@tanstack/react-table";

import { saved } from "@/assets/data/dashboard/quiz";
import {
  Actions,
  Checkbox,
  ColumnHeader,
} from "@/components/table/ColumnTools";
import { QuizShallow } from "@/types";

const columnHeaders = saved.columnConfig.columns.map((column) =>
  ColumnHeader<QuizShallow>({ column })
);

export const columns: ColumnDef<QuizShallow>[] = [
  {
    ...Checkbox(),
  },
  ...columnHeaders,
  {
    ...Actions<QuizShallow>({
      actions: saved.columnConfig.actions,
      copyId: true,
    }),
  },
];
