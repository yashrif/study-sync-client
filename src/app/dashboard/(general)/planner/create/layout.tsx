import { Suspense } from "react";

import PageHeading from "@/app/dashboard/_components/PageHeading";
import { home } from "@/assets/data/dashboard/planner";
import { PlannerUploadsProvider } from "@/context/PlannerUploadsContext";

type Props = {
  children: React.ReactNode;
};

const CreatePlannerLayout: React.FC<Readonly<Props>> = ({ children }) => {
  return (
    <div>
      <PageHeading {...home.create} />
      <PlannerUploadsProvider>
        <Suspense>{children}</Suspense>
      </PlannerUploadsProvider>
    </div>
  );
};

export default CreatePlannerLayout;
