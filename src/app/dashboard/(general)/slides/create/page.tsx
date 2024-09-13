import { Suspense } from "react";

import { home } from "@/assets/data/dashboard/slides";
import SpinnerContainer from "@/components/spinner/SpinnerContainer";
import PageHeading from "../../../_components/PageHeading";
import CustomPrompt from "./_components/CustomPrompt";
import TopicSelect from "./_components/TopicSelect";
import UploadSelect from "./_components/UploadSelect";
import Options from "./_components/Options";

const CreateSlides = () => {
  return (
    <div className="flex flex-col">
      <PageHeading {...home.create} />

      <Suspense fallback={<SpinnerContainer />}>
        <div className="grid grid-cols-[auto,1fr] gap-x-12 gap-y-10 items-center">
          <TopicSelect />
          <UploadSelect />
          <CustomPrompt />
          <Options />
        </div>
      </Suspense>
    </div>
  );
};

export default CreateSlides;
