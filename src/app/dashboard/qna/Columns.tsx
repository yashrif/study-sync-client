import { ColumnDef } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";

import studySyncDB from "@/api/studySyncDB";
import studySyncServer from "@/api/studySyncServer";
import { dbEndpoints, serverEndpoints } from "@/assets/data/api";
import {
  columnConfig as columnConfigObj,
  isIndexedData,
} from "@/assets/data/dashboard/qna";
import StatusIcon from "@/components/StatusIcon";
import { Checkbox, ColumnHeader } from "@/components/table/ColumnTools";
import { ColumnConfig, Status } from "@/types";
import { UploadSimple } from "@/types/upload";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";
import { IconRefresh } from "@tabler/icons-react";

const IndexButton: React.FC<{
  data: UploadSimple;
  indexInfo: { id: string | undefined; status: Status };
  setIndexInfo: Dispatch<
    SetStateAction<{
      id: string | undefined;
      status: Status;
    }>
  >;
}> = ({ data, indexInfo, setIndexInfo }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className="pl-2"
            onClick={async () => {
              try {
                setIndexInfo({ id: data.id, status: Status.PENDING });
                await studySyncServer.post(serverEndpoints.index, data);

                await studySyncDB.patch(`${dbEndpoints.uploads}/${data.id}`, {
                  isIndexed: true,
                });

                setIndexInfo({ id: data.id, status: Status.SUCCESS });
              } catch (error) {
                console.error(error);
                setIndexInfo({ id: data.id, status: Status.ERROR });
              } finally {
                setTimeout(() => {
                  setIndexInfo({ id: data.id, status: Status.IDLE });
                }, 2500);
              }
            }}
          >
            <StatusIcon
              status={indexInfo.id === data.id ? indexInfo.status : Status.IDLE}
              className={`!size-4 hover:scale-[1.2] transition cursor-pointer ${
                indexInfo.id === data.id && indexInfo.status === Status.PENDING
                  ? "animate-spin duration-1000"
                  : "duration-300"
              }
                  ${indexInfo.id === data.id && indexInfo.status === Status.SUCCESS ? "!text-success" : indexInfo.status === Status.ERROR ? "!text-destructive" : ""}
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

export const columns = (
  indexInfo: { id: string | undefined; status: Status },
  setIndexInfo: Dispatch<
    SetStateAction<{
      id: string | undefined;
      status: Status;
    }>
  >
): ColumnDef<UploadSimple>[] => [
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
                indexInfo={indexInfo}
                setIndexInfo={setIndexInfo}
              />
            ) : null;
          },
        },
      ],
      actions: [...columnConfigObj.actions],
    } as ColumnConfig
  ).columns.map((column) => ColumnHeader({ column })),
];
