import { ColumnDef } from "@tanstack/react-table";

import { Checkbox, ColumnHeader } from "@/components/table/ColumnTools";
import { Choices, ColumnConfig, McqRequest } from "@/types";

/* ---------------------------- fields and values --------------------------- */

const columnConfig: ColumnConfig<McqRequest> = {
  columns: [
    {
      type: "no_link",
      accessorKey: "question",
      title: "Question",
    },
    {
      type: "no_link",
      accessorKey: "answers",
      title: "Answer",
      headerClassName: "invisible",
      formatter: (field, obj) => {
        const answer = obj?.answers.findIndex((answer) => answer);
        return (
          <div className="flex flex-col gap-y-2.5 gap-x-12">
            {obj?.choices.map((choice, index) => (
              <div key={index} className="flex gap-1.5 items-center">
                <div
                  className={`size-4 rounded-full text-primary ${
                    index === answer
                      ? "bg-success text-white"
                      : "ring-1 ring-inset ring-primary"
                  } flex items-center justify-center`}
                >
                  <span className="text-[10px]">
                    {Object.values(Choices)[index]}
                  </span>
                </div>
                <span>{choice}</span>
              </div>
            ))}
          </div>
        );
      },
    },
  ],
  actions: [
    {
      title: "Delete",
      onClick: () => console.log("Delete"),
    },
  ],
};

export const mcqColumns: ColumnDef<McqRequest>[] = [
  { ...Checkbox() },
  ...((
    {
      columns: columnConfig.columns,
      actions: [...columnConfig.actions],
    } as ColumnConfig<McqRequest>
  ).columns.map((column) =>
    ColumnHeader({ column }),
  ) as ColumnDef<McqRequest>[]),
];
