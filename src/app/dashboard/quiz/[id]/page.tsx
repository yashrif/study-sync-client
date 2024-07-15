"use client";

import { Suspense, useRef, useState } from "react";

import { FormHandle } from "@/app/dashboard/types/form-handle";
import { quizDetails } from "@/assets/data/dashboard/quiz";
import Spinner from "@/components/spinner/Spinner";
import { Button } from "@/components/ui/button";
import { useGetQuiz } from "@/hooks/useQuiz";
import PageHeading from "../../components/PageHeading";
import Details from "./details";
import Overview from "./overview";

type Props = {
  params: {
    id: string;
  };
};

const QuizDetails: React.FC<Props> = ({ params: { id } }) => {
  const formRef = useRef<FormHandle>(null);
  const [points, setPoints] = useState<number | undefined>(undefined);
  const { data, setQuiz } = useGetQuiz({
    id,
    mode: "lazy",
  }).getQuiz();

  return (
    <div className="min-h-full">
      <PageHeading
        title={quizDetails.title}
        description={quizDetails.description}
        Icon={quizDetails.Icon}
      >
        <div className="flex gap-24 items-center">
          {points && (
            <span className="text-large text-primary font-medium">
              Total Points: {points}
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
      {data && (
        <div className="h-full grid grid-cols-[280px,auto,1fr] gap-16">
          <Suspense fallback={<Spinner />}>
            <Overview data={data} setData={setQuiz} />
          </Suspense>
          <div />
          <div className="h-[calc(100%-32px)] w-0.5 bg-border rounded-full my-auto" />
          <Suspense fallback={<Spinner />}>
            <Details ref={formRef} data={data} setPoints={setPoints} />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default QuizDetails;
