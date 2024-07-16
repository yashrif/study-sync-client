import { IconRefresh } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { memo } from "react";

import {
  columnConfig as columnConfigObj,
  isIndexedData,
} from "@/assets/data/dashboard/quiz";
import StatusIcon from "@/components/StatusIcon";
import { Checkbox, ColumnHeader } from "@/components/table/ColumnTools";
import { useQuizUploadsContext } from "@/hooks/useQuizUploadsContext";
import { ColumnConfig, Status } from "@/types";
import { UploadSimple } from "@/types/upload";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";
import { fileIndexing } from "./fileIndexing";

const IndexButton: React.FC<{ data: UploadSimple }> = memo(({ data }) => {
  IndexButton.displayName = "IndexButton";
  const {
    state: { indexStatus },
    dispatch,
  } = useQuizUploadsContext();

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
            <StatusIcon
              status={indexStatus[data.id]}
              className={`!size-4 hover:scale-[1.2] transition cursor-pointer ${
                indexStatus[data.id] === Status.PENDING
                  ? "animate-spin duration-1000"
                  : "duration-300"
              }
                  ${indexStatus[data.id] === Status.SUCCESS ? "!text-success stroke-success" : indexStatus[data.id] === Status.ERROR ? "!text-destructive" : ""}
                  `}
              Icons={{
                [Status.PENDING]: IconRefresh,
              }}
              isAnimation={!data.isIndexed}
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
});

export const columns: ColumnDef<UploadSimple>[] = [
  {
    ...Checkbox(),
  },
  ...((
    {
      columns: [
        ...columnConfigObj.columns,
        {
          ...isIndexedData,
          additionalElement(data) {
            return <IndexButton data={data} />;
          },
        },
      ],
      actions: [...columnConfigObj.actions],
    } as ColumnConfig
  ).columns.map((column) =>
    ColumnHeader({ column })
  ) as ColumnDef<UploadSimple>[]),
];
