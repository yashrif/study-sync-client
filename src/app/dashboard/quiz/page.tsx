import { Suspense } from "react";

import { home } from "@/assets/data/dashboard/quiz";
import Spinner from "@/components/spinner/Spinner";
import PageHeading from "../components/PageHeading";
import Recent from "./recent/Recent";
import FileList from "./uploads";

const page = () => {
  return (
    <div>
      <PageHeading
        title={home.title}
        description={home.description}
        Icon={home.Icon}
      />
      <div className="flex flex-col gap-24">
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
