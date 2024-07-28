import { ColumnDef } from "@tanstack/react-table";

import { routes } from "@/assets/data/routes";
import {
  Actions,
  Checkbox,
  ColumnHeader,
} from "@/components/table/ColumnTools";
import { Column, QuizShallow, TableAction } from "@/types";
import { IconBook2 } from "@tabler/icons-react";

/* ---------------------------- fields and values ---------------------------- */

const saved: {
  search: {
    key: string;
    placeholder: string;
  };
  columnConfig: {
    columns: Column<QuizShallow>[];
    actions: TableAction<QuizShallow>[];
  };
} = {
  search: {
    key: "title",
    placeholder: "Search by title",
  },

  columnConfig: {
    columns: [
      {
        type: "link",
        accessorKey: "title",
        title: "Title",
        formatter: (title) => {
          return title as string;
        },
        linkKey: "id",
        path: routes.dashboard.quiz.home,
        Icon() {
          return IconBook2;
        },
        iconClassName() {
          return "text-primary";
        },
      },
      {
        type: "no_link",
        accessorKey: "createDate",
        title: "Create Date",
        formatter: (date) => {
          return new Date(date as string).toLocaleDateString();
        },
      },
    ],
    actions: [
      {
        title: "View",
        onClick: () => console.log("View"),
      },
      {
        title: "Delete",
        onClick: () => console.log("Delete"),
      },
    ],
  },
};

const columnHeaders = saved.columnConfig.columns.map((column) =>
  ColumnHeader<QuizShallow>({ column }),
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
