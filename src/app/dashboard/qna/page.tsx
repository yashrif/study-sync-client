import React from "react";
import PageHeader from "../components/PageHeader";
import { create, home } from "@/assets/data/dashboard/qna";
import FileList from "./FileList";

const page = () => {
  return (
    <div className="divide-y-2 flex flex-col">
      <PageHeader
        title={home.title}
        description={home.description}
        Icon={home.Icon}
      />
      <div className="pt-8 flex flex-col gap-8">
        <div className="flex flex-col gap-4 mb-4">
          <h2>{create.title}</h2>
          <p className="text-medium text-text-200 max-w-prose">
            {create.description}
          </p>
        </div>
        <FileList />
      </div>
    </div>
  );
};

export default page;
