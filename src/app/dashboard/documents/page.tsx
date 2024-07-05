import { home } from "@/assets/data/dashboard/documents";
import CreateDocument from "./Create";

const Documents: React.FC = () => {
  return (
    <div className="divide-y-2 flex flex-col">
      <div className="flex flex-col gap-2 mb-4">
        <h2 className="text-text-400">{home.title}</h2>
        <p className="text-small text-text-200 tracking-[0.5px]">
          {home.description}
        </p>
      </div>
      <CreateDocument />
    </div>
  );
};

export default Documents;
