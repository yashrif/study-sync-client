"use client";

import { Suspense } from "react";

import Spinner from "@/components/spinner/Spinner";
import { useQuizUploadsContext } from "@/hooks/useQuizUploadsContext";
import { IconList } from "@/types";
import PageHeading from "../PageHeading";
import Recent from "./_recent/Recent";
import UploadList from "./uploads";

type Props = {
  home: IconList;
  create: IconList;
};

const CreateQuiz: React.FC<Props> = ({ home, create }) => {
  const {
    state: { isShowRecentQuiz },
  } = useQuizUploadsContext();

  return (
    <div>
      <PageHeading
        title={home.title}
        description={home.description}
        Icon={home.Icon}
      />
      <div className="flex flex-col gap-24">
        <Suspense fallback={<Spinner />}>
          <UploadList create={create} />
        </Suspense>
        {isShowRecentQuiz && (
          <Suspense fallback={<Spinner />}>
            <Recent />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default CreateQuiz;