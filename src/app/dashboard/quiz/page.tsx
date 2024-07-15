import { Suspense } from "react";

import { home } from "@/assets/data/dashboard/quiz";
import Spinner from "@/components/spinner/Spinner";
import PageHeading from "../_components/PageHeading";
import Recent from "./_recent/Recent";
import UploadList from "./uploads";

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
          <UploadList />
        </Suspense>

        <Suspense fallback={<Spinner />}>
          <Recent />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
