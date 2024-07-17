"use client";

import { notFound } from "next/navigation";
import { Suspense } from "react";

import { quizDetails } from "@/assets/data/dashboard/quiz";
import Spinner from "@/components/spinner/Spinner";
import { Button } from "@/components/ui/button";
import { useQuizContext } from "@/hooks/useQuizContext";
import { Status } from "@allTypes";
import { useFetchQuiz } from "../../../../hooks/fetchQuiz";
import PageHeading from "../../_components/PageHeading";
import List from "./_details";
import Overview from "./_overview";

const QuizDetails: React.FC = () => {
  const {
    state: { points, status, formRef, isShowResults, quiz },
  } = useQuizContext();

  useFetchQuiz();

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
              <span>Obtained Points:</span>
              {status === Status.PENDING ? (
                <Spinner className="!size-5" />
              ) : (
                <span>
                  {points}/{(quiz.mcqs?.length || 0) + (quiz.cqs?.length || 0)}
                </span>
              )}
            </span>
          )}
          <div className="flex gap-4 items-center">
            <Button
              type="submit"
              onClick={() => {
                formRef.current?.submit();
              }}
            >
              Submit
            </Button>
            <Button
              type="reset"
              variant={"outline"}
              onClick={() => {
                formRef.current?.clear();
              }}
            >
              Clear
            </Button>
          </div>
        </div>
      </PageHeading>

      <div className="h-full grid grid-cols-[280px,auto,1fr] gap-16">
        <Suspense fallback={<Spinner />}>
          <Overview />
        </Suspense>
        <div />
        <div className="h-[calc(100%-32px)] w-0.5 bg-border rounded-full my-auto" />
        <Suspense fallback={<Spinner />}>
          <List />
        </Suspense>
      </div>
    </div>
  );
};

export default QuizDetails;
