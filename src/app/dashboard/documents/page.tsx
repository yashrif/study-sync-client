import { home } from "@/assets/data/dashboard/documents";
import CreateDocument from "./Create";
import Navbar from "./Navbar";
import { DataTable } from "./DataTable";
import { Payment, columns } from "./Columns";

const data = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
];

const Documents: React.FC = () => {
  return (
    <div className="divide-y-2 flex flex-col">
      <div className="flex flex-col gap-2 mb-4">
        <h2 className="text-text-400">{home.title}</h2>
        <p className="text-small text-text-200 tracking-[0.5px]">
          {home.description}
        </p>
      </div>
      <div className="pt-8 flex flex-col gap-8">
        <Navbar />
        {/* <CreateDocument /> */}
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Documents;
