"use client";

import { IconArrowRight, IconWifiOff } from "@tabler/icons-react";
import { notFound, useParams } from "next/navigation";
import { Suspense, useCallback } from "react";

import studySyncDB from "@/api/studySyncDB";
import PageHeading from "@/app/dashboard/_components/PageHeading";
import { serverEndpoints } from "@/assets/data/api";
import {
  actionButton,
  queryParams,
  quizDetails,
} from "@/assets/data/dashboard/quiz";
import IconButton from "@/components/button/IconButton";
import Spinner from "@/components/spinner/Spinner";
import SpinnerContainer from "@/components/spinner/SpinnerContainer";
import { useFetchData } from "@/hooks/fetchData";
import { useQueryString } from "@/hooks/useQueryString";
import { useQuizContext } from "@/hooks/useQuizContext";
import { Quiz, QuizActionType, QuizTypes, Status } from "@allTypes";
import List from "./_details";
import Overview from "./_overview";

const QuizDetails: React.FC = () => {
  const { id } = useParams();
  const { checkQueryString } = useQueryString();

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
    apiCall: useCallback(
      () => studySyncDB.get(`${serverEndpoints.quizzes}/${id}`),
      [id]
    ),
    dispatch,
  });

  const isMcqs = checkQueryString(queryParams.types.key, QuizTypes.MCQ);
  const isCqs = checkQueryString(queryParams.types.key, QuizTypes.CQ);

  if (status === Status.ERROR) return notFound();

  return (
    <div className="min-h-full">
      <PageHeading
        title={quizDetails.title}
        description={quizDetails.description}
        Icon={quizDetails.Icon}
        className="items-end"
      >
        <div className="flex gap-24 items-center">
          {isShowResults && (
            <span className="flex items-center gap-1.5 text-large text-primary font-medium">
              {evaluateStatus !== Status.ERROR && <span>Points:</span>}
              {evaluateStatus === Status.PENDING ? (
                <Spinner className="!size-5" />
              ) : evaluateStatus === Status.SUCCESS ? (
                <span>
                  {points}/
                  {(isMcqs ? quiz.mcqs?.length || 0 : 0) +
                    (isCqs ? quiz.cqs?.length || 0 : 0)}
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
                dispatch({
                  type: QuizActionType.SET_IS_TIMER_ACTIVE,
                  payload: false,
                });
              }}
            />
            <IconButton
              {...actionButton.reset}
              onClick={() => {
                formRef.current?.clear();
                dispatch({
                  type: QuizActionType.SET_IS_TIMER_ACTIVE,
                  payload: false,
                });
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
          <Suspense fallback={<SpinnerContainer />}>
            <List />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default QuizDetails;
