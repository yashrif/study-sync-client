"use client";

import { notFound } from "next/navigation";
import { Suspense } from "react";

import { quizDetails } from "@/assets/data/dashboard/quiz";
import Spinner from "@/components/spinner/Spinner";
import { Button } from "@/components/ui/button";
import { useQuizContext } from "@/hooks/useQuizContext";
import { Status } from "@allTypes";
import PageHeading from "../../_components/PageHeading";
import Details from "./_details";
import Overview from "./_overview";
import { useFetchQuiz } from "../../../../hooks/fetchQuiz";

type Props = {
  params: {
    id: string;
  };
};

const QuizDetails: React.FC<Props> = ({ params: { id } }) => {
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
          {isShowResults && points !== undefined && (
            <span className="text-large text-primary font-medium">
              Obtained Points: {points}/
              {(quiz.mcqs?.length || 0) + (quiz.cqs?.length || 0)}
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
          <Details />
        </Suspense>
      </div>
    </div>
  );
};

export default QuizDetails;
