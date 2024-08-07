import { home } from "@/assets/data/dashboard/planner";
import { Suspense } from "react";
import PageHeading from "../../_components/PageHeading";

type Props = {
  children: React.ReactNode;
};

const CreateQuizLayout: React.FC<Readonly<Props>> = ({ children }) => {
  return (
    <div>
      <PageHeading
        title={home.create.title}
        description={home.create.description}
        Icon={home.create.Icon}
      />
      <Suspense>{children}</Suspense>
    </div>
  );
};

export default CreateQuizLayout;
