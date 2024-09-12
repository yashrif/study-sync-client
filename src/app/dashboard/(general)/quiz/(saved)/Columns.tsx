import { IconBook2 } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

import studySyncDB from "@/api/studySyncDB";
import { dbEndpoints } from "@/assets/data/api";
import { routes } from "@/assets/data/routes";
import {
  Actions,
  Checkbox,
  ColumnHeader,
} from "@/components/table/ColumnTools";
import { toast } from "@/components/ui/use-toast";
import { useQuizzesContext } from "@/hooks/useQuizzesContext";
import { Column, QuizShallow, QuizzesActionType, TableAction } from "@/types";

/* ---------------------------- fields and values ---------------------------- */

const useColumnConfig = (): {
  columns: Column<QuizShallow>[];
  actions: TableAction<QuizShallow>[];
} => {
  const { push } = useRouter();
  const {
    state: { quizzes },
    dispatch,
  } = useQuizzesContext();

  return {
    columns: [
      {
        type: "link",
        accessorKey: "title",
        title: "Title",
        formatter: (title) => {
          return title as string;
        },
        linkKey: "id",
        path: routes.dashboard.quiz.home,
        Icon() {
          return IconBook2;
        },
        iconClassName() {
          return "text-primary";
        },
      },
      {
        type: "no_link",
        accessorKey: "createDate",
        title: "Create Date",
        formatter: (date) => {
          return new Date(date as string).toLocaleDateString();
        },
      },
    ],
    actions: [
      {
        title: "View",
        onClick: (data) =>
          data ? push(routes.dashboard.quiz.details(data.id)) : null,
      },
      {
        title: "Delete",
        onClick: async (data) => {
          try {
            await studySyncDB.delete(`${dbEndpoints.quizzes}/${data?.id}`);
            dispatch({
              type: QuizzesActionType.SET_QUIZZES,
              payload: quizzes?.filter((quiz) => quiz.id !== data?.id),
            });
            toast({
              title: "Deleted Successfully!",
              description: `Quiz with id: ${data?.id} is successfully deleted.`,
              duration: 5000,
            });
          } catch (err) {
            console.log(err);
            toast({
              title: "Action failed!",
              description: `Failed to delete quiz with the id: ${data?.id}.`,
              duration: 5000,
            });
          }
        },
      },
    ],
  };
};

export const useColumns = (): ColumnDef<QuizShallow>[] => {
  const columnHeaders = useColumnConfig().columns.map((column) =>
    ColumnHeader<QuizShallow>({ column })
  );

  return [
    {
      ...Checkbox(),
    },
    ...columnHeaders,
    {
      ...Actions<QuizShallow>({
        actions: useColumnConfig().actions,
      }),
    },
  ];
};
