"use client";

import { Suspense, useCallback } from "react";

import studySyncDB from "@/api/studySyncDB";
import PageHeading from "@/app/dashboard/_components/PageHeading";
import { dbEndpoints } from "@/assets/data/api";
import { home, search } from "@/assets/data/dashboard/quiz";
import Spinner from "@/components/spinner/Spinner";
import DataTable from "@/components/table";
import { useFetchDataState } from "@/hooks/fetchData";
import { useTable } from "@/hooks/useTable";
import { QuizShallow, Status } from "@allTypes";
import { columns } from "./Columns";

const GenerateQuiz: React.FC = () => {
  const { state } = useFetchDataState<null, QuizShallow[]>({
    apiCall: useCallback(() => studySyncDB.get(dbEndpoints.quizzes), []),
  });

  const { table } = useTable({
    data: state.data || [],
    columns: columns,
  });

  return (
    <div className="flex flex-col">
      <PageHeading
        title={home.saved.title}
        description={home.saved.description}
        Icon={home.saved.Icon}
      />
      <Suspense fallback={<Spinner />}>
        <DataTable
          table={table}
          columns={columns}
          loading={state.status === Status.PENDING}
          searchKey={search.key}
          uploadEndpointDb={dbEndpoints.uploads}
          controlsConfig={{
            DELETE: {
              hidden: false,
              order: 3,
            },
            SEARCH: {
              hidden: false,
              order: 1,
            },
            VIEW: {
              hidden: false,
              order: 2,
            },
          }}
        />
      </Suspense>
    </div>
  );
};

export default GenerateQuiz;
