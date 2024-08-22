import { ColumnDef } from "@tanstack/react-table";

import studySyncDB from "@/api/studySyncDB";
import studySyncServer from "@/api/studySyncServer";
import { dbEndpoints, serverEndpoints } from "@/assets/data/api";
import { fileTypeIcons } from "@/assets/data/dashboard/file";
import { routes } from "@/assets/data/routes";
import {
  Actions,
  Checkbox,
  ColumnHeader,
} from "@/components/table/ColumnTools";
import { toast } from "@/components/ui/use-toast";
import { useUploadsContext } from "@/hooks/useUploadsContext";
import {
  Column,
  TableAction,
  UploadsActionType,
  UploadShallow,
} from "@allTypes";

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
