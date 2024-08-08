import { Suspense } from "react";

import { home } from "@/assets/data/dashboard/planner";
import { PlannerUploadsProvider } from "@/context/PlannerUploadsContext";
import PageHeading from "../../_components/PageHeading";

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
