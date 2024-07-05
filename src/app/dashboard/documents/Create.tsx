import { Suspense } from "react";

import { create } from "@/assets/data/dashboard/documents";
import Spinner from "@/components/Spinner";
import Dropzone from "./Dropzone";

const CreateDocument = () => {
  return (
    <div className="pt-8 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-text-400">{create.title}</h2>
        <p className="text-small text-text-200 tracking-[0.5px]">
          {create.description}
        </p>
      </div>
      <Dropzone />
    </div>
  );
};

export default CreateDocument;
