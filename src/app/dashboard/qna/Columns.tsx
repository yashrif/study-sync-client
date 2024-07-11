import { IconRefresh } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";

import {
  columnConfig as columnConfigObj,
  isIndexedData,
} from "@/assets/data/dashboard/qna";
import StatusIcon from "@/components/StatusIcon";
import { Checkbox, ColumnHeader } from "@/components/table/ColumnTools";
import { ColumnConfig, IndexStatus, Status } from "@/types";
import { UploadSimple } from "@/types/upload";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";
import { fileIndexing } from "./utils";
import { useMemo } from "react";

const IndexButton: React.FC<
  IndexStatus & {
    data: UploadSimple;
  }
> = (props) => {
  const { data, indexStatus } = props;
  const status = useMemo(() => indexStatus[data.id], [data.id, indexStatus]);

  if (data.id === "3b01dfad-3d7d-489b-8f63-bba41571d6d0") console.log(status);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className="pl-2"
            onClick={async () => {
              await fileIndexing(props);
            }}
          >
            <StatusIcon
              status={indexStatus[data.id]}
              className={`!size-4 hover:scale-[1.2] transition cursor-pointer ${
                indexStatus[data.id] === Status.PENDING
                  ? "animate-spin duration-1000"
                  : "duration-300"
              }
                  ${indexStatus[data.id] === Status.SUCCESS ? "!text-success" : indexStatus[data.id] === Status.ERROR ? "!text-destructive" : ""}
                  `}
              Icons={{
                [Status.PENDING]: IconRefresh,
              }}
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
};

export const columns = (props: IndexStatus): ColumnDef<UploadSimple>[] => [
  {
    ...Checkbox(),
  },
  ...(
    {
      columns: [
        ...columnConfigObj.columns,
        {
          ...isIndexedData,
          additionalElement(data) {
            return <IndexButton data={data} {...props} />;
          },
        },
      ],
      actions: [...columnConfigObj.actions],
    } as ColumnConfig
  ).columns.map((column) => ColumnHeader({ column })),
];
