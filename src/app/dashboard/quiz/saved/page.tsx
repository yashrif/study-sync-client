"use client";

import { Suspense } from "react";

import { dbEndpoints, serverEndpoints } from "@/assets/data/api";
import { home, search } from "@/assets/data/dashboard/quiz";
import Spinner from "@/components/spinner/Spinner";
import DataTable from "@/components/table";
import { useFetchDataState } from "@/hooks/fetchData";
import { QuizShallow, Status } from "@allTypes";
import PageHeading from "../../_components/PageHeading";
import { columns } from "./Columns";

const GenerateQuiz: React.FC = () => {
  const { state } = useFetchDataState<null, QuizShallow[]>({
    endpoint: serverEndpoints.quizzes,
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
          columns={columns}
          data={state.data || []}
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
