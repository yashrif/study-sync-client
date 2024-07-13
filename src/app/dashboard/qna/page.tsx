import { Suspense } from "react";

import { home } from "@/assets/data/dashboard/qna";
import Spinner from "@/components/spinner/Spinner";
import PageHeader from "../components/PageHeader";
import Recent from "./recent/Recent";
import FileList from "./uploads";

const page = () => {
  return (
    <div className="divide-y-2">
      <PageHeader
        title={home.title}
        description={home.description}
        Icon={home.Icon}
      />
      <div className="pt-8 flex flex-col gap-24">
        <Suspense fallback={<Spinner />}>
          <FileList />
        </Suspense>

        <Suspense fallback={<Spinner />}>
          <Recent />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
