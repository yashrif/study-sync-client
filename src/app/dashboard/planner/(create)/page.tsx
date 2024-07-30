"use client";

import { home } from "@/assets/data/dashboard/planner";
import PageHeading from "../../_components/PageHeading";

const CreateQuiz = () => {
  return (
    <div>
      <PageHeading
        title={home.create.title}
        description={home.create.description}
        Icon={home.create.Icon}
      />
    </div>
  );
};

export default CreateQuiz;
