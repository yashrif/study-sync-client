"use client";

import { Suspense } from "react";

import Spinner from "@/components/spinner/Spinner";
import { IconList } from "@/types";
import SectionHeading from "../../SectionHeading";
import Preview from "./preview";
import Uploads from "./uploads";

type Props = {
  create: IconList;
};

const UploadList: React.FC<Props> = ({ create }) => {
  return (
    <div className="flex flex-col gap-8">
      <SectionHeading
        title={create.title}
        Icon={create.Icon}
        description={create.description}
      />
      <Suspense fallback={<Spinner />}>
        <div className="grid grid-cols-[minmax(600px,1fr),1fr] gap-x-16 gap-y-8">
          <Uploads />
          <Preview />
        </div>
      </Suspense>
    </div>
  );
};

export default UploadList;
