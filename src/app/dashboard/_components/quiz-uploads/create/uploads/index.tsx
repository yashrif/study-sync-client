"use client";

import { useCallback } from "react";

import studySyncDB from "@/api/studySyncDB";
import { dbEndpoints } from "@/assets/data/api";
import { useApiHandler } from "@/hooks/useApiHandler";
import { useQuizUploadsContext } from "@/hooks/useQuizUploadsContext";
import { useTable } from "@/hooks/useTable";
import { columns } from "../../../uploads/Columns";
import UploadsTable from "../../../uploads/Table";
import CreateAction from "../uploads/CreateAction";

const Uploads = () => {
  const {
    state: { uploads, status },
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

  return (
    <>
      <UploadsTable handler={handler} table={table} status={status} />

      <div className="w-full flex justify-between items-center gap-16 row-start-3 col-start-1">
        <CreateAction table={table} />
      </div>
    </>
  );
};

export default Uploads;
