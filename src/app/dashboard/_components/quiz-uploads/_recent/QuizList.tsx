"use client";

import { IconNotes } from "@tabler/icons-react";
import Link from "next/link";
import { useCallback, useEffect } from "react";

import studySyncDB from "@/api/studySyncDB";
import { dbEndpoints } from "@/assets/data/api";
import { recent } from "@/assets/data/dashboard/quiz";
import { links } from "@/assets/data/routes";
import Dropdown from "@/components/Dropdown";
import SpinnerContainer from "@/components/spinner/SpinnerContainer";
import { useFetchState } from "@/hooks/fetchData";
import { useApiHandler } from "@/hooks/useApiHandler";
import { QuizShallow, Status } from "@/types";
import { dateTimeFormatter } from "@/utils/dateFormatter";

const QuizList = () => {
  const {
    state: { data, status },
    dispatch,
  } = useFetchState<QuizShallow[]>();

  const { handler } = useApiHandler<null, QuizShallow[]>({
    apiCall: useCallback(() => studySyncDB.get(dbEndpoints.quizzes), []),
    dispatch,
  });

  useEffect(() => {
    handler({});
  }, [handler]);

  return (
    <div className="max-h-400px overflow-y-scroll">
      {status === Status.PENDING ? (
        <SpinnerContainer
          spinnerClassName="size-10"
          containerClassName="h-[250px]"
        />
      ) : (
        <div className="flex flex-col gap-3">
          {data?.slice(0, 5).map((quiz) => (
            <div
              key={quiz.id}
              className="flex justify-between gap-16 items-center"
            >
              <Link
                href={links.dashboard.quiz.details(quiz.id).href}
                className="anchor text-text-400 flex gap-2 items-center"
              >
                <IconNotes className="size-4 text-primary stroke-[2.5]" />
                <span className="max-w-[45ch] text-ellipsis overflow-hidden">
                  {quiz.title}
                </span>
              </Link>
              <div className="flex items-center gap-8">
                <span className="text-small text-text-200">
                  {dateTimeFormatter(quiz.createDate)}
                </span>
                <Dropdown
                  actions={[
                    {
                      ...recent.actions.delete,
                      onClick: async () => {
                        await studySyncDB.delete(
                          `${dbEndpoints.quizzes}/${quiz.id}`
                        );

                        handler({ isUpdateStatus: false });
                      },
                    },
                  ]}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizList;
