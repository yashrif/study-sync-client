"use client";

import { Suspense } from "react";

import { quizDetails } from "@/assets/data/dashboard/quiz";
import Spinner from "@/components/spinner/Spinner";
import { useGetQuiz } from "@/hooks/useQuiz";
import PageHeader from "../../components/PageHeader";
import Details from "./details";
import Overview from "./overview";

type Props = {
  params: {
    id: string;
  };
};

const QuizDetails: React.FC<Props> = ({ params: { id } }) => {
  const { data, setQuiz } = useGetQuiz({
    id,
    mode: "lazy",
  }).getQuiz();

  return (
    <div className="divide-y-2 min-h-full">
      <PageHeader
        title={quizDetails.title}
        description={quizDetails.description}
        Icon={quizDetails.Icon}
      />
      {data && (
        <div className="h-full pt-8 grid grid-cols-[280px,auto,1fr] gap-24">
          <Suspense fallback={<Spinner />}>
            <Overview data={data} setData={setQuiz} />
          </Suspense>
          <div className="h-[80%] w-0.5 bg-border rounded-full my-auto" />
          <Suspense fallback={<Spinner />}>
            <Details data={data} />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default QuizDetails;
