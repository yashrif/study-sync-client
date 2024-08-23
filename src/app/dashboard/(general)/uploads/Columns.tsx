import { ColumnDef } from "@tanstack/react-table";

import studySyncDB from "@/api/studySyncDB";
import studySyncServer from "@/api/studySyncServer";
import { dbEndpoints, serverEndpoints } from "@/assets/data/api";
import { fileTypeIcons } from "@/assets/data/dashboard/file";
import { routes } from "@/assets/data/routes";
import { CheckmarkAnimated } from "@/components/icons";
import {
  Actions,
  Checkbox,
  ColumnHeader,
} from "@/components/table/ColumnTools";
import { toast } from "@/components/ui/use-toast";
import { useFetchState } from "@/hooks/fetchData";
import { useUploadsContext } from "@/hooks/useUploadsContext";
import {
  Column,
  FetchActionType,
  Status,
  TableAction,
  UploadsActionType,
  UploadShallow,
} from "@allTypes";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";
import { IconRefresh, IconXboxX } from "@tabler/icons-react";
import { CircleCheck } from "lucide-react";

type IndexButtonProps = {
  data: UploadShallow;
};

const IndexButton: React.FC<IndexButtonProps> = ({ data }) => {
  const {
    state: { uploads },
    dispatch: uploadsDispatch,
  } = useUploadsContext();

  const { state, dispatch } = useFetchState<UploadShallow>();

  return (
    <div className="pl-12">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className="cursor-pointer"
              onClick={async () => {
                try {
                  dispatch({
                    type: FetchActionType.FETCH_START,
                  });
                  await studySyncServer.post(serverEndpoints.index, data.name);

                  await studySyncDB.patch(`${dbEndpoints.uploads}/${data.id}`, {
                    isIndexed: true,
                  });

                  dispatch({
                    type: FetchActionType.FETCH_SUCCESS,
                    payload: { ...data, isIndexed: true },
                  });

                  setTimeout(() => {
                    uploadsDispatch({
                      type: UploadsActionType.SET_UPLOADS,
                      payload: uploads.map((upload) =>
                        upload.id === data.id
                          ? { ...upload, isIndexed: true }
                          : upload
                      ),
                    });
                  }, 2000);
                } catch (err) {
                  console.log(err);
                  dispatch({
                    type: FetchActionType.FETCH_ERROR,
                  });
                  setTimeout(() => {
                    dispatch({
                      type: FetchActionType.FETCH_IDLE,
                    });
                  }, 2000);
                }
              }}
            >
              {data.isIndexed ? (
                <CircleCheck className="size-4 text-success hover:scale-125 duration-300" />
              ) : state.status === Status.SUCCESS ? (
                <CheckmarkAnimated className="size-4 pointer-events-none" />
              ) : state.status === Status.ERROR ? (
                <IconXboxX className="size-4 text-destructive pointer-events-none" />
              ) : (
                <IconRefresh
                  className={`size-4 text-primary ${
                    state.status === Status.PENDING
                      ? "animate-spin duration-1000"
                      : "hover:scale-125 duration-300"
                  }`}
                />
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-small">
              {data.isIndexed ? "Click to re-index" : "Click to start indexing"}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

const useColumnConfig = (): {
  columns: Column<UploadShallow>[];
  actions: TableAction<UploadShallow>[];
} => {
  const {
    state: { uploads },
    dispatch,
  } = useUploadsContext();

  return {
    columns: [
      {
        type: "link",
        accessorKey: "title",
        title: "Title",
        formatter: (title) => {
          return title as string;
        },
        linkKey: "id",
        path: routes.dashboard.study.home,
        Icon(props) {
          return fileTypeIcons({
            key: "type",
            value: props.value,
          });
        },
        iconClassName() {
          return "text-primary";
        },
      },
      {
        type: "no_link",
        accessorKey: "type",
        title: "Type",
        formatter: (type) => {
          return type as string;
        },
      },
      {
        type: "no_link",
        accessorKey: "isIndexed",
        title: "Indexing Status",
        formatter: (status, data) => {
          return <IndexButton data={data} />;
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
        onClick: async (data) => {
          try {
            await studySyncServer.delete(
              `${serverEndpoints.uploads}/${data?.name}`
            );
            await studySyncDB.delete(`${dbEndpoints.uploads}/${data?.id}`);
            dispatch({
              type: UploadsActionType.SET_UPLOADS,
              payload: uploads?.filter((upload) => upload.id !== data?.id),
            });
            toast({
              title: "Deleted Successfully!",
              description: `File with id: ${data?.id} is successfully deleted.`,
              duration: 5000,
            });
          } catch (err) {
            console.log(err);
            toast({
              title: "Action failed!",
              description: `Failed to delete file with the id: ${data?.id}.`,
              duration: 5000,
            });
          }
        },
      },
    ],
  };
};

export const useColumns = (): ColumnDef<UploadShallow>[] => {
  const columnHeaders = useColumnConfig().columns.map((column) =>
    ColumnHeader<UploadShallow>({ column })
  );

  return [
    {
      ...Checkbox(),
    },
    ...columnHeaders,
    {
      ...Actions<UploadShallow>({
        actions: useColumnConfig().actions,
        copyId: true,
      }),
    },
  ];
};
