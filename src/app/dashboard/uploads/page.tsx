"use client";

import { Suspense, useCallback } from "react";

import studySyncDB from "@/api/studySyncDB";
import { dbEndpoints } from "@/assets/data/api";
import { home, search } from "@/assets/data/dashboard/uploads";
import Spinner from "@/components/spinner/Spinner";
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
import DataTable from "../../../components/table";
import PageHeading from "../_components/PageHeading";
import { useColumns } from "./Columns";

const Uploads: React.FC = () => {
  const {
    state: { uploads, status },
    dispatch,
  } = useUploadsContext();

  useFetchData<null, UploadShallow[]>({
    endpoint: dbEndpoints.uploads,
    dispatch,
  });

  const { table } = useTable({
    data: uploads || [],
    columns: useColumns(),
  });

  const { state, dispatch: uploadPost } = useFetchState<null>();
  const { handler } = useApiHandler<null, null>({
    apiCall: useCallback(
      (_, pathVariable) =>
        studySyncDB.delete(`${dbEndpoints.uploads}/${pathVariable}`),
      [],
    ),

    dispatch: uploadPost,
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
          await handler({
            pathVariable: upload.id,
          });
        }),
      );

      dispatch({
        type: UploadsActionType.SET_UPLOADS,
        payload: uploads.filter(
          (upload) => !selectedUploads.find((u) => u.id === upload.id),
        ),
      });

      table.resetRowSelection();
    } catch (err) {
      console.log(err);
    }
  };

  const onUpload = useCallback(() => {
    refreshHandler({});
  }, [refreshHandler]);

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
              status: state.status,
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
