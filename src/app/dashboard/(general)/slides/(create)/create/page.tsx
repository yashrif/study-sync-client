import { Suspense } from "react";

import { home } from "@/assets/data/dashboard/slides";
import SpinnerContainer from "@/components/spinner/SpinnerContainer";
import PageHeading from "../../../../_components/PageHeading";
import CustomPrompt from "./_components/CustomPrompt";
import TopicSelect from "./_components/TopicSelect";
import UploadSelect from "./_components/UploadSelect";
import CreateAction from "./CreateAction";

const CreateSlides = () => {
  return (
    <div className="flex flex-col">
      <PageHeading {...home.create} />

      <Suspense fallback={<SpinnerContainer />}>
        <div className="max-w-[700px] grid grid-cols-[auto,max(512px)] gap-x-12 gap-y-10 items-center">
          <TopicSelect />
          <UploadSelect />
          <CustomPrompt />
          {/* <Options /> */}
          <div className="col-start-2 flex items-center justify-center">
            <CreateAction />
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default CreateSlides;
