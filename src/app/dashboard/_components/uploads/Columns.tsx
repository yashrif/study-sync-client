import { IconRefresh } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { Dispatch, memo } from "react";

import { fileTypeIcons } from "@/assets/data/dashboard/file";
import { routes } from "@/assets/data/routes";
import StatusContent from "@/components/StatusContent";
import { Checkbox, ColumnHeader } from "@/components/table/ColumnTools";
import { Column, ColumnConfig, Status } from "@/types";
import { IndexAction, IndexStatus, UploadShallow } from "@/types/upload";
import { dateFormatter } from "@/utils/dateFormatter";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";
import { fileIndexing } from "./fileIndexing";

/* ---------------------------- fields and values --------------------------- */

const columnConfig: ColumnConfig<UploadShallow> = {
  columns: [
    {
      type: "link",
      accessorKey: "title",
      title: "Document",
      formatter: (title) => {
        return title as string;
      },
      linkKey: "id",
      path: routes.dashboard.uploads,
      className() {
        return "text-base no-underline font-semibold";
      },
    },
    {
      type: "no_link",
      accessorKey: "name",
      title: "Name",
      headerClassName: "invisible",
      formatter: (type) => {
        return type as string;
      },
      Icon(props) {
        return fileTypeIcons({
          key: "type",
          value: props.value,
        });
      },
    },
    {
      type: "no_link",
      accessorKey: "createDate",
      title: "Create Date",
      headerClassName: "hidden",
      formatter: (date) => {
        return dateFormatter(date as string, "numeric");
      },
      Icon(props) {
        return fileTypeIcons(props);
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
};

const isIndexedData: Column<UploadShallow> = {
  type: "no_link",
  accessorKey: "isIndexed",
  title: "Index Status",
  headerClassName: "hidden",
  formatter: (isIndexed) => {
    return isIndexed ? "Indexed" : "Not Indexed";
  },
  Icon(props) {
    return fileTypeIcons(props);
  },
  className(props) {
    return `${props ? "text-success" : "text-destructive"}`;
  },
  iconClassName(props) {
    return props ? "text-success" : "text-destructive";
  },
};

/* ---------------------------- IndexButton component ---------------------------- */

type IndexButtonProps = {
  data: UploadShallow;
  indexStatus: IndexStatus;
  dispatch: Dispatch<IndexAction>;
};

const IndexButton: React.FC<IndexButtonProps> = memo(
  ({ data, dispatch, indexStatus }) => {
    IndexButton.displayName = "IndexButton";

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className="pl-2"
              onClick={async () => {
                await fileIndexing({ data, dispatch });
              }}
            >
              <StatusContent
                status={indexStatus[data.id]}
                isAlwaysIcons
                type="icon-only"
                className={`!size-4 hover:scale-[1.2] transition cursor-pointer ${
                  indexStatus[data.id] === Status.PENDING
                    ? "animate-spin duration-1000"
                    : "duration-300"
                }
                  ${
                    indexStatus[data.id] === Status.SUCCESS
                      ? "!text-success stroke-success"
                      : indexStatus[data.id] === Status.ERROR
                        ? "!text-destructive"
                        : ""
                  }
                  `}
                contents={{
                  [Status.PENDING]: { type: "icon-only", Icon: IconRefresh },
                }}
                isAnimation={!data.isIndexed}
                iconClassName={`stroke-primary ${
                  indexStatus[data.id] === Status.SUCCESS
                    ? "stroke-success"
                    : indexStatus[data.id] === Status.ERROR
                      ? "stroke-destructive"
                      : ""
                }`}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-small">
              {indexStatus[data.id] === Status.SUCCESS
                ? "Click to re-index"
                : "Click to start indexing"}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);

/* ---------------------------- columns ---------------------------- */

type ColumnProps = {
  indexStatus: IndexStatus;
  dispatch: Dispatch<IndexAction>;
};

export const columns = (props: ColumnProps): ColumnDef<UploadShallow>[] => [
  {
    ...Checkbox(),
  },
  ...((
    {
      columns: [
        ...columnConfig.columns,
        {
          ...isIndexedData,
          additionalElement(data) {
            return <IndexButton data={data} {...props} />;
          },
        },
      ],
      actions: [...columnConfig.actions],
    } as ColumnConfig<UploadShallow>
  ).columns.map((column) =>
    ColumnHeader({ column })
  ) as ColumnDef<UploadShallow>[]),
];
