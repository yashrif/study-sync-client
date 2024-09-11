"use client";

import { IconArrowRight } from "@tabler/icons-react";
import { Table } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { create, queryKeys } from "@/assets/data/dashboard/planner";
import IconButton from "@/components/button/IconButton";
import { usePlannerUploadsContext } from "@/hooks/usePlannerUploadsContext";
import { useQueryParams } from "@/hooks/useQueryParams";
import { IndexStatus, Status, UploadShallow } from "@allTypes";

type Props = {
  table: Table<UploadShallow>;
  indexStatus: IndexStatus;
};

const CreateAction: React.FC<Props> = ({ table, indexStatus }) => {
  const { push } = useRouter();
  const { getQueryString: getParams } = useQueryParams();
  const {
    state: { status },
  } = usePlannerUploadsContext();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <IconButton
      size="lg"
      className="size-12 p-0 rounded-full row-start-3 col-start-1 justify-self-center"
      Icon={IconArrowRight}
      iconClassName="!size-6 stroke-text-300 text-text-300"
      contentType="icon-only"
      disabled={
        (table && table.getFilteredSelectedRowModel().rows.length === 0) ||
        Object.values(indexStatus).includes(Status.PENDING) ||
        status === Status.PENDING ||
        isLoading
      }
      status={
        Object.values(indexStatus).includes(Status.PENDING) || isLoading
          ? Status.PENDING
          : Status.IDLE
      }
      onClick={() => {
        setIsLoading(true);
        push(
          create.steps[2].path +
            getParams(
              queryKeys.uploads.key,
              table
                .getFilteredSelectedRowModel()
                .rows.map((row) => row.original.id)
            )
        );
      }}
    />
  );
};

export default CreateAction;
