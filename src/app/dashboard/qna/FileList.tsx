"use client";

import { Suspense, useEffect, useState } from "react";

import IconButton from "@/components/button/IconButton";
import { useTable } from "@/hooks/useTable";
import { useGetUploads } from "@/hooks/useUploads";
import { Status, UploadSimple } from "@/types";
import Spinner from "@components/Spinner";
import { IconArrowRight } from "@tabler/icons-react";
import { columns } from "./Columns";
import Table from "./Table";

const FileLIst = () => {
  const [uploadStatus, setUploadStatus] = useState<Status>(Status.IDLE);
  const [indexStatus, setIndexStatus] = useState<{
    [key: string]: Status;
  }>({});

  const {
    data: uploads,
    status,
    setUploads,
  } = useGetUploads(
    [uploadStatus, Object.keys(indexStatus).length === 0],
    "lazy"
  ).getUploads();
  const { table } = useTable({
    data: uploads,
    columns: columns({ indexStatus, setIndexStatus, setUploads }),
  });

  useEffect(() => {
    if (uploads.length > 0) {
      const newUploads: {
        [key: string]: Status;
      } = {};

      uploads.forEach((upload) => {
        newUploads[upload.id] = upload.isIndexed ? Status.SUCCESS : Status.IDLE;
      });

      setIndexStatus(newUploads);
    }
  }, [uploads]);

  // console.log("uploads", uploads);

  return (
    <div className="flex flex-col gap-8 items-center justify-center">
      <div className="divide-y-2 w-full">
        <Suspense fallback={<Spinner />}>
          <Table
            table={table}
            setUploadStatus={setUploadStatus}
            status={status}
          />
        </Suspense>
      </div>

      <IconButton
        title=""
        size="lg"
        className="size-12 p-0 rounded-full"
        Icon={IconArrowRight}
        iconClassName="!size-6"
        disabled={
          (table && table.getFilteredSelectedRowModel().rows.length === 0) ||
          Object.values(indexStatus).includes(Status.PENDING)
        }
        onClick={async () => {
          const files: UploadSimple[] = table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original);

          files.forEach((file) => {
            setIndexStatus((prevState) => ({
              ...prevState,
              [file.id]: Status.PENDING,
            }));
          });

          // files.forEach(async (file) => {
          //   await fileIndexing({ setIndexStatus, data: file });
          // });
        }}
      />
    </div>
  );
};

export default FileLIst;
