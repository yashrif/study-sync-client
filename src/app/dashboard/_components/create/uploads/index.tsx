"use client";

import { Suspense, useCallback } from "react";

import studySyncDB from "@/api/studySyncDB";
import { serverEndpoints } from "@/assets/data/api";
import Spinner from "@/components/spinner/Spinner";
import { useApiHandler } from "@/hooks/useApiHandler";
import { useQuizUploadsContext } from "@/hooks/useQuizUploadsContext";
import { useTable } from "@/hooks/useTable";
import { IconList } from "@/types";
import SectionHeading from "../../SectionHeading";
import { columns } from "./Columns";
import CreateAction from "./CreateAction";
import Table from "./Table";

type Props = {
  create: IconList;
};

const UploadList: React.FC<Props> = ({ create }) => {
  const {
    state: { uploads },
    dispatch,
  } = useQuizUploadsContext();
  const { handler } = useApiHandler({
    apiCall: useCallback(() => studySyncDB.get(serverEndpoints.uploads), []),
    dispatch,
  });

  const { table } = useTable({
    data: uploads,
    columns,
  });

  const onUpload = useCallback(() => {
    handler({});
  }, [handler]);

  return (
    <div className="max-w-[700px] flex flex-col gap-8">
      <SectionHeading
        title={create.title}
        Icon={create.Icon}
        description={create.description}
      />
      <Suspense fallback={<Spinner />}>
        <div className="flex flex-col gap-8 items-center justify-center">
          <div className="divide-y-2 w-full">
            <Table table={table} onUpload={onUpload} />
          </div>
          <div className="w-full flex justify-between items-center gap-16">
            <CreateAction table={table} />
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default UploadList;
