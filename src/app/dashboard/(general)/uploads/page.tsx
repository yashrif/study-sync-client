"use client";

import { Suspense, useCallback } from "react";

import studySyncDB from "@/api/studySyncDB";
import studySyncServer from "@/api/studySyncServer";
import { dbEndpoints, serverEndpoints } from "@/assets/data/api";
import { home, search } from "@/assets/data/dashboard/uploads";
import Spinner from "@/components/spinner/Spinner";
import DataTable from "@/components/table";
import { toast } from "@/components/ui/use-toast";
import { useFetchData, useFetchState } from "@/hooks/fetchData";
import { useApiHandler } from "@/hooks/useApiHandler";
import { useTable } from "@/hooks/useTable";
import { useUploadsContext } from "@/hooks/useUploadsContext";
import {
  Status,
  TableControlTypes,
  UploadsActionType,
  UploadShallow,
} from "@/types";
import PageHeading from "../../_components/PageHeading";
import { useColumns } from "./Columns";

const Uploads: React.FC = () => {
  const {
    state: { uploads, status },
    dispatch,
  } = useUploadsContext();

  useFetchData<null, UploadShallow[]>({
    apiCall: useCallback(() => studySyncDB.get(dbEndpoints.uploads), []),
    dispatch,
  });

  const { table } = useTable({
    data: uploads || [],
    columns: useColumns(),
  });

  const { state: stateServer, dispatch: uploadDeleteServer } =
    useFetchState<null>();
  const { handler: handlerDeleteServer } = useApiHandler<null, null>({
    apiCall: useCallback(
      (_, pathVariable) =>
        studySyncServer.delete(`${serverEndpoints.uploads}/${pathVariable}`),
      []
    ),
    dispatch: uploadDeleteServer,
  });

  const { state: stateDb, dispatch: uploadDeleteDB } = useFetchState<null>();
  const { handler: handlerDeleteDb } = useApiHandler<null, null>({
    apiCall: useCallback(
      (_, pathVariable) =>
        studySyncDB.delete(`${dbEndpoints.uploads}/${pathVariable}`),
      []
    ),
    dispatch: uploadDeleteDB,
  });

  const { handler: refreshHandler } = useApiHandler({
    apiCall: useCallback(() => studySyncDB.get(dbEndpoints.uploads), []),
    dispatch,
  });

  const onDelete = async () => {
    try {
      const selectedUploads = table
        .getFilteredSelectedRowModel()
        .rows.map((row) => row.original);

      //TODO: Implement delete exception handling

      await Promise.all(
        selectedUploads.map(async (upload) => {
          await handlerDeleteServer({
            pathVariable: upload.name,
            isReset: true,
            fetchType: "lazy",
          });
        })
      );

      await Promise.all(
        selectedUploads.map(async (upload) => {
          await handlerDeleteDb({
            pathVariable: upload.id,
            isReset: true,
            fetchType: "lazy",
          });
        })
      );

      dispatch({
        type: UploadsActionType.SET_UPLOADS,
        payload: uploads.filter(
          (upload) => !selectedUploads.find((u) => u.id === upload.id)
        ),
      });

      table.resetRowSelection();
      toast({
        title: "Deleted Successfully!",
        description: `Selected files are successfully deleted.`,
        duration: 5000,
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Action failed!",
        description: `Failed to delete the selected files.`,
        duration: 5000,
      });
    }
  };

  const onUpload = useCallback(() => {
    refreshHandler({});
  }, [refreshHandler]);

  const deleteStatus = () => {
    switch (true) {
      case stateServer.status === Status.PENDING ||
        stateDb.status === Status.PENDING:
        return Status.PENDING;
      case stateServer.status === Status.ERROR ||
        stateDb.status === Status.ERROR:
        return Status.ERROR;
      case stateServer.status === Status.SUCCESS &&
        stateDb.status === Status.SUCCESS:
        return Status.SUCCESS;
      default:
        return Status.IDLE;
    }
  };

  return (
    <div className="flex flex-col">
      <PageHeading
        title={home.title}
        description={home.description}
        Icon={home.Icon}
      />
      <Suspense fallback={<Spinner />}>
        <DataTable
          table={table}
          columns={useColumns()}
          loading={status === Status.PENDING}
          searchKey={search.key}
          uploadEndpointDb={dbEndpoints.uploads}
          controlsConfig={{
            [TableControlTypes.UPLOAD]: {
              hidden: false,
              onClick: onUpload,
            },
            [TableControlTypes.ADD_FOLDER]: {
              hidden: false,
            },
            [TableControlTypes.DELETE]: {
              hidden: false,
              onClick: onDelete,
              status: deleteStatus(),
            },
            [TableControlTypes.SEARCH]: {
              hidden: false,
            },
            [TableControlTypes.VIEW]: {
              hidden: false,
            },
          }}
        />
      </Suspense>
    </div>
  );
};

export default Uploads;
