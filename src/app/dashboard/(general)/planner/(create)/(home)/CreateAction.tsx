import { IconArrowRight } from "@tabler/icons-react";
import { Table } from "@tanstack/react-table";

import { create, queryKeys } from "@/assets/data/dashboard/planner";
import IconButton from "@/components/button/IconButton";
import { usePlannerUploadsContext } from "@/hooks/usePlannerUploadsContext";
import { useQueryParams } from "@/hooks/useQueryParams";
import { IndexStatus, Status, UploadShallow } from "@allTypes";
import { useRouter } from "next/navigation";

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
        status === Status.PENDING
      }
      status={
        Object.values(indexStatus).includes(Status.PENDING)
          ? Status.PENDING
          : Status.IDLE
      }
      onClick={() => {
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
