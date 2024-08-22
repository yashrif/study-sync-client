import { IconBook2, IconExternalLink, IconTrash } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";

import { routes } from "@/assets/data/routes";
import {
  Actions,
  Checkbox,
  ColumnHeader,
} from "@/components/table/ColumnTools";
import { Badge } from "@/components/ui/badge";
import { Column, PlannerShallow, TableAction } from "@/types";
import { MAX_TOPICS_PER_ROW } from "@/utils/constants";
import { shadeGenerator } from "@/utils/colorGenerator";

/* ---------------------------- fields and values ---------------------------- */

const saved: {
  search: {
    key: string;
    placeholder: string;
  };
  columnConfig: {
    columns: Column<PlannerShallow>[];
    actions: TableAction<PlannerShallow>[];
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
        path: routes.dashboard.planner.home,
        Icon() {
          return IconBook2;
        },
        iconClassName() {
          return "text-primary";
        },
      },
      {
        type: "no_link",
        accessorKey: "topics",
        title: "Topics",
        formatter: (topics) => {
          return (
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {typeof topics !== "string" &&
                topics.slice(0, MAX_TOPICS_PER_ROW).map((topic) => (
                  <Badge
                    key={topic.id}
                    style={{
                      color: topic.color,
                      backgroundColor: shadeGenerator(topic.color, 20),
                      borderColor: topic.color,
                    }}
                  >
                    {topic.name}
                  </Badge>
                ))}
              {topics.length > MAX_TOPICS_PER_ROW && (
                <Badge>+ {topics.length - 9}</Badge>
              )}
            </div>
          );
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
        Icon: IconExternalLink,
        onClick: () => console.log("View"),
      },
      {
        title: "Delete",
        Icon: IconTrash,
        className: "text-destructive",
        onClick: () => console.log("Delete"),
      },
    ],
  },
};

const columnHeaders = saved.columnConfig.columns.map((column) =>
  ColumnHeader<PlannerShallow>({ column })
);

export const columns: ColumnDef<PlannerShallow>[] = [
  {
    ...Checkbox(),
  },
  ...columnHeaders,
  {
    ...Actions<PlannerShallow>({
      actions: saved.columnConfig.actions,
    }),
  },
];
