import { create, home } from "@/assets/data/dashboard/qna";
import PageHeader from "../components/PageHeader";
import FileList from "./FileList";

const page = () => {
  return (
    <div className="divide-y-2 flex flex-col">
      <PageHeader
        title={home.title}
        description={home.description}
        Icon={home.Icon}
      />
      <div className="pt-8 flex flex-col">
        <div className="flex flex-col gap-4 mb-4">
          <h2>{create.title}</h2>
          <p className="text-medium text-text-200 max-w-prose">
            {create.description}
          </p>
        </div>
        <div className="grid grid-cols-[3fr,2fr] items-start gap-x-24 gap-y-16">
          <FileList />
        </div>
      </div>
    </div>
  );
};

export default page;
