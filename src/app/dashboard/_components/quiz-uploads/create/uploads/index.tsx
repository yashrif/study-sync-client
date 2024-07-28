"use client";

import { useCallback } from "react";

import studySyncDB from "@/api/studySyncDB";
import { dbEndpoints } from "@/assets/data/api";
import { useApiHandler } from "@/hooks/useApiHandler";
import { useQuizUploadsContext } from "@/hooks/useQuizUploadsContext";
import { useTable } from "@/hooks/useTable";
import { TableControlTypes } from "@/types";
import { columns } from "../uploads/Columns";
import CreateAction from "../uploads/CreateAction";
import UploadsTable from "../uploads/Table";

const Uploads = () => {
  const {
    state: { uploads },
    dispatch,
  } = useQuizUploadsContext();
  const { handler } = useApiHandler({
    apiCall: useCallback(() => studySyncDB.get(dbEndpoints.uploads), []),
    dispatch,
  });

  const { table } = useTable({
    data: uploads,
    columns,
  });

  const onUpload = useCallback(() => {
    handler({});
  }, [handler]);

  return (
    <>
      <UploadsTable
        table={table}
        controlsConfig={{
          [TableControlTypes.UPLOAD]: {
            hidden: false,
            order: 2,
            variant: "outline",
            onClick: onUpload,
          },
          [TableControlTypes.SEARCH]: {
            hidden: false,
            order: 1,
            title: "Search Files",
          },
          [TableControlTypes.VIEW]: {
            hidden: false,
            order: 3,
            variant: "outline",
          },
        }}
      />

      <div className="w-full flex justify-between items-center gap-16 row-start-3 col-start-1">
        <CreateAction table={table} />
      </div>
    </>
  );
};

export default Uploads;
