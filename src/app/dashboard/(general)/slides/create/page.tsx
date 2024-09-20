"use client";

import { Suspense, useCallback } from "react";

import studySyncDB from "@/api/studySyncDB";
import SectionHeading from "@/app/dashboard/_components/SectionHeading";
import { columns } from "@/app/dashboard/_components/uploads/Columns";
import UploadsTable from "@/app/dashboard/_components/uploads/Table";
import { dbEndpoints } from "@/assets/data/api";
import { create, home } from "@/assets/data/dashboard/slides";
import SpinnerContainer from "@/components/spinner/SpinnerContainer";
import { useApiHandler } from "@/hooks/useApiHandler";
import { useCreateSlideContext } from "@/hooks/useCreateSlideContext";
import { useTable } from "@/hooks/useTable";
import { Handler, UploadShallow } from "@/types";
import { IconSun } from "@tabler/icons-react";
import PageHeading from "../../../_components/PageHeading";
import TopicSelect from "./_components/TopicSelect";
import CreateAction from "./CreateAction";

const CreateSlides = () => {
  const {
    state: { uploads, indexStatus, status },
    dispatch,
  } = useCreateSlideContext();
  const { handler } = useApiHandler({
    apiCall: useCallback(() => studySyncDB.get(dbEndpoints.uploads), []),
    dispatch,
  });

  const { table } = useTable({
    data: uploads,
    columns: columns({
      indexStatus,
      dispatch,
    }),
  });

  return (
    <div className="flex flex-col">
      <PageHeading {...home.create} />

      <div className="flex flex-col gap-8">
        <SectionHeading {...create.create} />
        <Suspense fallback={<SpinnerContainer />}>
          <div className="max-w-[600px] flex flex-col space-y-6">
            <TopicSelect />

            <div className="relative">
              <div className="h-[1px] w-full rounded-full bg-border" />
              <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 px-4 bg-background">
                <IconSun className="stroke-accent" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-y-8">
              <UploadsTable
                handler={
                  handler as ({
                    data,
                    isUpdateStatus,
                    pathVariable,
                    fetchType,
                    isReset,
                  }: Handler<unknown>) => Promise<UploadShallow[] | undefined>
                }
                table={table}
                status={status}
              />
            </div>
            <div className="col-start-2 flex items-center justify-center">
              <CreateAction table={table} />
            </div>
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default CreateSlides;
