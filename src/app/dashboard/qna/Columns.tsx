import { IconRefresh } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";

import studySyncDB from "@/api/studySyncDB";
import studySyncServer from "@/api/studySyncServer";
import { dbEndpoints, serverEndpoints } from "@/assets/data/api";
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

const IndexButton: React.FC<
  IndexStatus & {
    data: UploadSimple;
  }
> = ({ data, indexStatus, setIndexStatus }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className="pl-2"
            onClick={async () => {
              await fileIndexing({ setIndexStatus, data });
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
          <p className="text-small">Click to start indexing</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const columns = ({
  indexStatus,
  setIndexStatus,
}: IndexStatus): ColumnDef<UploadSimple>[] => [
  {
    ...Checkbox(),
  },
  ...(
    {
      columns: [
        ...columnConfigObj.columns,
        {
          ...isIndexedData,
          additionalElement(props) {
            return !props.isIndexed ? (
              <IndexButton
                data={props}
                indexStatus={indexStatus}
                setIndexStatus={setIndexStatus}
              />
            ) : null;
          },
        },
      ],
      actions: [...columnConfigObj.actions],
    } as ColumnConfig
  ).columns.map((column) => ColumnHeader({ column })),
];
