import { Suspense } from "react";

import { home } from "@/assets/data/dashboard/quiz";
import Spinner from "@/components/spinner/Spinner";
import { QuizUploadsProvider } from "@/context/QuizUploadsContext";
import PageHeading from "../../_components/PageHeading";
import Recent from "./_recent/Recent";
import UploadList from "./uploads";

const CreateQuiz = () => {
  return (
    <div>
      <PageHeading
        title={home.create.title}
        description={home.create.description}
        Icon={home.create.Icon}
      />
      <div className="flex flex-col gap-24">
        <Suspense fallback={<Spinner />}>
          <QuizUploadsProvider>
            <UploadList />
          </QuizUploadsProvider>
        </Suspense>
        <Suspense fallback={<Spinner />}>
          <Recent />
        </Suspense>
      </div>
    </div>
  );
};

export default CreateQuiz;
