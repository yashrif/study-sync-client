"use client";

import { dbEndpoints } from "@/assets/data/api";
import { search } from "@/assets/data/dashboard/qna";
import Spinner from "@/components/Spinner";
import DataTable from "@/components/table";
import { useUploads } from "@/hooks/useUploads";
import { Status, TableControls } from "@allTypes";
import { Suspense } from "react";
import { columns } from "./Columns";

const FileList = () => {
  const { uploads, status } = useUploads();

  return (
    <div className="divide-y-2 flex flex-col">
      {/* {uploads.map((upload) => (
        <FileCard key={upload.id} {...upload} />
      ))} */}
      <Suspense fallback={<Spinner />}>
        <DataTable
          columns={columns}
          data={uploads}
          loading={status === Status.PENDING}
          search={search.key}
          uploadEndpointDb={dbEndpoints.uploads}
          showPagination={false}
          controlsConfig={{
            [TableControls.Upload]: {
              show: true,
              order: 2,
            },
            [TableControls.Search]: {
              show: true,
              order: 1,
            },
          }}
          className="pt-8"
          classNameControls="!justify-start gap-3"
        />
      </Suspense>
    </div>
  );
};

export default FileList;
