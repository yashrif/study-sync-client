"use client";

import { useCallback } from "react";

import { create, home } from "@/assets/data/dashboard/planner";
import PageHeading from "../../_components/PageHeading";
import SectionHeading from "../../_components/SectionHeading";
import { useFetchState } from "@/hooks/fetchData";
import { useApiHandler } from "@/hooks/useApiHandler";
import studySyncDB from "@/api/studySyncDB";
import { dbEndpoints } from "@/assets/data/api";
import { useTable } from "@/hooks/useTable";
import { columns } from "../../_components/uploads/Columns";

const CreateQuiz = () => {
  const {
    state: { data, status },
    dispatch,
  } = useFetchState();
  const { handler } = useApiHandler({
    apiCall: useCallback(() => studySyncDB.get(dbEndpoints.uploads), []),
    dispatch,
  });

  // const { table } = useTable({
  //   data: uploads,
  //   columns,
  // });

  return (
    <div>
      <PageHeading
        title={home.create.title}
        description={home.create.description}
        Icon={home.create.Icon}
      />
      <div className="flex flex-col gap-8">
        <SectionHeading {...create.steps[1]} />
      </div>
    </div>
  );
};

export default CreateQuiz;
