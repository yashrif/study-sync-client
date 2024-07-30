"use client";

import { notFound, useParams } from "next/navigation";
import { Suspense } from "react";

import { serverEndpoints } from "@/assets/data/api";
import { actionButton, quizDetails } from "@/assets/data/dashboard/quiz";
import IconButton from "@/components/button/IconButton";
import Spinner from "@/components/spinner/Spinner";
import { useFetchData } from "@/hooks/fetchData";
import { useQuizContext } from "@/hooks/useQuizContext";
import { Quiz, QuizActionType, Status } from "@allTypes";
import { IconArrowRight, IconWifiOff } from "@tabler/icons-react";
import PageHeading from "../../_components/PageHeading";
import List from "./_details";
import Overview from "./_overview";

const QuizDetails: React.FC = () => {
  const { id } = useParams();

  const {
    state: {
      points,
      status,
      evaluateStatus,
      formRef,
      isShowResults,
      quiz,
      isShowOverview,
    },
    dispatch,
  } = useQuizContext();

  useFetchData<null, Quiz>({
    endpoint: `${serverEndpoints.quizzes}/${id}`,
    dispatch,
  });

  if (status === Status.ERROR) return notFound();

  return (
    <div className="min-h-full">
      <PageHeading
        title={quizDetails.title}
        description={quizDetails.description}
        Icon={quizDetails.Icon}
      >
        <div className="flex gap-24 items-center">
          {isShowResults && (
            <span className="flex items-center gap-1.5 text-large text-primary font-medium">
              {evaluateStatus !== Status.ERROR && <span>Points:</span>}
              {evaluateStatus === Status.PENDING ? (
                <Spinner className="!size-5" />
              ) : evaluateStatus === Status.SUCCESS ? (
                <span>
                  {points}/{(quiz.mcqs?.length || 0) + (quiz.cqs?.length || 0)}
                </span>
              ) : (
                <IconWifiOff className="size-6 text-destructive" />
              )}
            </span>
          )}
          <div className="flex gap-4 items-center">
            <IconButton
              {...actionButton.submit}
              onClick={() => {
                formRef.current?.submit();
              }}
            />
            <IconButton
              {...actionButton.reset}
              onClick={() => {
                formRef.current?.clear();
              }}
            />
          </div>
        </div>
      </PageHeading>

      <div
        className={`relative h-full ${isShowOverview ? "grid grid-cols-[344px,auto,1fr]" : "flex"} gap-0`}
      >
        {isShowOverview && (
          <>
            <Suspense fallback={<Spinner />}>
              <Overview />
            </Suspense>
            <div />
            <div className="h-[calc(100%-32px)] w-0.5 bg-border rounded-full my-auto" />
          </>
        )}
        {!isShowOverview && (
          //TODO: add a relevant icon here
          <IconArrowRight
            className="fixed text-primary size-6 hover:scale-110 transition-all duration-300 cursor-pointer"
            onClick={() => {
              dispatch({
                type: QuizActionType.SET_IS_SHOW_OVERVIEW,
                payload: true,
              });
            }}
          />
        )}
        <div
          className={`w-full flex justify-center ${isShowOverview ? "pl-16" : ""}`}
        >
          {!isShowOverview && <div className="w-12" />}
          <Suspense fallback={<Spinner />}>
            <List />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default QuizDetails;
