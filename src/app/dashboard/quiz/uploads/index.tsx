"use client";

import { Suspense, useCallback } from "react";

import studySyncDB from "@/api/studySyncDB";
import { serverEndpoints } from "@/assets/data/api";
import { create } from "@/assets/data/dashboard/quiz";
import Spinner from "@/components/spinner/Spinner";
import { useFetchUploads } from "@/hooks/fetchUploads";
import { useApiHandler } from "@/hooks/useApiHandler";
import { useQuizUploadsContext } from "@/hooks/useQuizUploadsContext";
import { useTable } from "@/hooks/useTable";
import { columns } from "./Columns";
import CreateAction from "./CreateAction";
import Table from "./Table";

const UploadList = () => {
  useFetchUploads();

  const {
    state: { uploads, status, indexStatus },
    dispatch,
  } = useQuizUploadsContext();
  const { handler } = useApiHandler({
    apiCall: useCallback(() => studySyncDB.get(serverEndpoints.uploads), []),
    dispatch,
  });

  const { table } = useTable({
    data: uploads,
    columns,
  });

  const onUpload = useCallback(() => {
    handler();
  }, [handler]);

  return (
    <div className="max-w-[700px] flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-primary">
          <create.Icon className="size-[30px] stroke-[2.5]" />
          <h2>{create.title}</h2>
        </div>
        <p className="text-medium text-text-200 max-w-prose">
          {create.description}
        </p>
      </div>
      <Suspense fallback={<Spinner />}>
        <div className="flex flex-col gap-8 items-center justify-center">
          <div className="divide-y-2 w-full">
            <Table table={table} onUpload={onUpload} />
          </div>
          <div className="w-full flex justify-between items-center gap-16">
            <CreateAction table={table} />
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default UploadList;
