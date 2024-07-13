"use client";

import { Suspense } from "react";

import { qnaDetails } from "@/assets/data/dashboard/qna";
import Spinner from "@/components/spinner/Spinner";
import { useGetQna } from "@/hooks/useQna";
import PageHeader from "../../components/PageHeader";
import Details from "./details";
import Overview from "./overview";

type Props = {
  params: {
    id: string;
  };
};

const QnaDetails: React.FC<Props> = ({ params: { id } }) => {
  const { data, setQna } = useGetQna({
    id,
    mode: "lazy",
  }).getQna();

  console.log(data);

  return (
    <div className="divide-y-2 min-h-full">
      <PageHeader
        title={qnaDetails.title}
        description={qnaDetails.description}
        Icon={qnaDetails.Icon}
      />
      {data && (
        <div className="h-full pt-8 grid grid-cols-[280px,auto,1fr] gap-24">
          <Suspense fallback={<Spinner />}>
            <Overview data={data} setData={setQna} />
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

export default QnaDetails;
