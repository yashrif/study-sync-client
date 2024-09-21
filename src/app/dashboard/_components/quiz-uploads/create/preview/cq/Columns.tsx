import { ColumnDef } from "@tanstack/react-table";
import Markdown from "react-markdown";

import { Checkbox, ColumnHeader } from "@/components/table/ColumnTools";
import { ColumnConfig, CqRequest } from "@/types";

/* ---------------------------- fields and values --------------------------- */

const columnConfig: ColumnConfig<CqRequest> = {
  columns: [
    {
      type: "no_link",
      accessorKey: "question",
      title: "Question",
      showSort: false,
      headerClassName: "invisible",
    },
    {
      type: "no_link",
      accessorKey: "answer",
      title: "Answer",
      formatter: (answer) => {
        return (
          <Markdown className={"markdown first:!mt-0"}>
            {answer as string}
          </Markdown>
        );
      },
      headerClassName: "invisible",
    },
  ],
  actions: [],
};

export const cqColumns: ColumnDef<CqRequest>[] = [
  { ...Checkbox() },
  ...((
    {
      columns: columnConfig.columns,
      actions: [...columnConfig.actions],
    } as ColumnConfig<CqRequest>
  ).columns.map((column) =>
    ColumnHeader({ column })
  ) as ColumnDef<CqRequest>[]),
];
