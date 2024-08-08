"use client";

import { useCallback } from "react";

import studySyncDB from "@/api/studySyncDB";
import { dbEndpoints } from "@/assets/data/api";
import { create } from "@/assets/data/dashboard/planner";
import { useApiHandler } from "@/hooks/useApiHandler";
import { usePlannerUploadsContext } from "@/hooks/usePlannerUploadsContext";
import { useTable } from "@/hooks/useTable";
import SectionHeading from "../../../_components/SectionHeading";
import { columns } from "../../../_components/uploads/Columns";
import UploadsTable from "../../../_components/uploads/Table";
import CreateAction from "./CreateAction";

const CreateQuiz = () => {
  const {
    state: { uploads, indexStatus, status },
    dispatch,
  } = usePlannerUploadsContext();
  const { handler } = useApiHandler({
    apiCall: useCallback(() => studySyncDB.get(dbEndpoints.uploads), []),
    dispatch,
  });

  const { table } = useTable({
    data: uploads,
    columns: columns({
      indexStatus,
      dispatch,
    }),
  });

  return (
    <div className="flex flex-col gap-8">
      <SectionHeading {...create.steps[1]} />
      <div className="grid grid-cols-[minmax(700px,1fr),1fr] items-center gap-x-24 gap-y-8">
        <UploadsTable handler={handler} table={table} status={status} />
        <CreateAction table={table} indexStatus={indexStatus} />
      </div>
    </div>
  );
};

export default CreateQuiz;
