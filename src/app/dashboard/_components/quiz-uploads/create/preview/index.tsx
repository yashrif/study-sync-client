"use client";

import _ from "lodash";

import { useQuizUploadsContext } from "@/hooks/useQuizUploadsContext";
import { useTable } from "@/hooks/useTable";
import { cqColumns } from "./cq/Columns";
import CreateAction from "./CreateAction";
import { mcqColumns } from "./mcq/Columns";
import PreviewTable from "./Table";

const Preview = () => {
  const {
    state: { quiz },
  } = useQuizUploadsContext();

  const { table: tableCqs } = useTable({
    data: quiz?.cqs || [],
    columns: cqColumns,
  });
  const { table: tableMcqs } = useTable({
    data: quiz?.mcqs || [],
    columns: mcqColumns,
  });

  if (_.isEmpty(quiz)) return null;

  return (
    <>
      <PreviewTable tableCqs={tableCqs} tableMcqs={tableMcqs} />
      <CreateAction />
    </>
  );
};

export default Preview;
