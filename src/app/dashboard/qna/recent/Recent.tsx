import { Suspense } from "react";

import { recent } from "@/assets/data/dashboard/qna";
import Spinner from "@/components/spinner/Spinner";
import QnaList from "./QnaList";

const Recent: React.FC = () => {
  return (
    <div className="max-w-[700px] flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-primary">
          <recent.Icon className="size-6 stroke-[2.5]" />
          <h3>{recent.title}</h3>
        </div>
        <p className="text-medium text-text-200 max-w-prose">
          {recent.description}
        </p>
      </div>
      <Suspense fallback={<Spinner />}>
        <QnaList />
      </Suspense>
    </div>
  );
};

export default Recent;
