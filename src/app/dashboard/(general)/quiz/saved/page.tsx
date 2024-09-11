"use client";

import { Suspense, useCallback } from "react";

import studySyncDB from "@/api/studySyncDB";
import PageHeading from "@/app/dashboard/_components/PageHeading";
import { dbEndpoints } from "@/assets/data/api";
import { home, search } from "@/assets/data/dashboard/quiz";
import Spinner from "@/components/spinner/Spinner";
import DataTable from "@/components/table";
import { toast } from "@/components/ui/use-toast";
import { useFetchData, useFetchState } from "@/hooks/fetchData";
import { useApiHandler } from "@/hooks/useApiHandler";
import { useQuizzesContext } from "@/hooks/useQuizzesContext";
import { useTable } from "@/hooks/useTable";
import { QuizShallow, QuizzesActionType, Status } from "@allTypes";
import { useColumns } from "./Columns";

const GenerateQuiz: React.FC = () => {
  const {
    state: { quizzes, status },
    dispatch,
  } = useQuizzesContext();

  useFetchData<null, QuizShallow[]>({
    apiCall: useCallback(() => studySyncDB.get(dbEndpoints.quizzes), []),
    dispatch,
  });

  const { table } = useTable({
    data: quizzes || [],
    columns: useColumns(),
  });

  const { state, dispatch: quizDelete } = useFetchState<null>();
  const { handler } = useApiHandler<null, null>({
    apiCall: useCallback(
      (_, pathVariable) =>
        studySyncDB.delete(`${dbEndpoints.quizzes}/${pathVariable}`),
      []
    ),
    dispatch: quizDelete,
  });

  const onDelete = async () => {
    try {
      const selectedQuizzes = table
        .getFilteredSelectedRowModel()
        .rows.map((row) => row.original);

      //TODO: Implement delete exception handling
      await Promise.all(
        selectedQuizzes.map(async (quiz) => {
          await handler({
            pathVariable: quiz.id,
          });
        })
      );

      dispatch({
        type: QuizzesActionType.SET_QUIZZES,
        payload: quizzes.filter(
          (quiz) => !selectedQuizzes.find((u) => u.id === quiz.id)
        ),
      });

      table.resetRowSelection();
      toast({
        title: "Deleted Successfully!",
        description: `Selected quizzes are successfully deleted.`,
        duration: 5000,
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Action failed!",
        description: `Failed to delete the selected quizzes.`,
        duration: 5000,
      });
    }
  };

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
          columns={useColumns()}
          loading={status === Status.PENDING}
          searchKey={search.key}
          uploadEndpointDb={dbEndpoints.uploads}
          controlsConfig={{
            DELETE: {
              hidden: false,
              order: 3,
              onClick: onDelete,
            },
            SEARCH: {
              hidden: false,
              order: 1,
              title: "Search by title",
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
