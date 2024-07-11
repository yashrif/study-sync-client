import { IconRefresh } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";

import {
  columnConfig as columnConfigObj,
  isIndexedData,
} from "@/assets/data/dashboard/qna";
import StatusIcon from "@/components/StatusIcon";
import { Checkbox, ColumnHeader } from "@/components/table/ColumnTools";
import { ColumnConfig, IndexStates, Status } from "@/types";
import { UploadSimple } from "@/types/upload";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";
import { fileIndexing } from "@utils/fileIndexing";
import { memo } from "react";

const IndexButton: React.FC<
  IndexStates & {
    data: UploadSimple;
  }
> = memo((props) => {
  IndexButton.displayName = "IndexButton";
  const { data, indexStatus } = props;

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
              status={indexStatus[data.id]?.status}
              className={`!size-4 hover:scale-[1.2] transition cursor-pointer ${
                indexStatus[data.id]?.status === Status.PENDING
                  ? "animate-spin duration-1000"
                  : "duration-300"
              }
                  ${indexStatus[data.id]?.status === Status.SUCCESS ? "!text-success" : indexStatus[data.id]?.status === Status.ERROR ? "!text-destructive" : ""}
                  `}
              Icons={{
                [Status.PENDING]: IconRefresh,
              }}
              isAnimation={indexStatus[data.id]?.animation}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-small">
            {indexStatus[data.id]?.status === Status.SUCCESS
              ? "Click to re-index"
              : "Click to start indexing"}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});

export const columns = (props: IndexStates): ColumnDef<UploadSimple>[] => [
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
