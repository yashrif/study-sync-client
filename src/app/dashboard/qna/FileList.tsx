"use client";

import { Suspense, useEffect, useState } from "react";

import IconButton from "@/components/button/IconButton";
import { useTable } from "@/hooks/useTable";
import { useGetUploads } from "@/hooks/useUploads";
import { IndexStatus, Status, UploadSimple } from "@/types";
import { fileIndexing } from "@/utils/fileIndexing";
import Spinner from "@components/Spinner";
import { IconArrowRight } from "@tabler/icons-react";
import { columns } from "./Columns";
import Table from "./Table";

const FileLIst = () => {
  const [uploadStatus, setUploadStatus] = useState<Status>(Status.IDLE);
  const [indexStatus, setIndexStatus] = useState<IndexStatus>({});

  const {
    data: uploads,
    status,
    setUploads,
  } = useGetUploads([uploadStatus], "lazy").getUploads();
  const { table } = useTable({
    data: uploads,
    columns: columns({ indexStatus, setIndexStatus, setUploads }),
  });

  useEffect(() => {
    if (uploads.length > 0) {
      const newUploads: IndexStatus = {};

      uploads.forEach((upload) => {
        newUploads[upload.id] = {
          ...indexStatus[upload.id],
          status: upload.isIndexed ? Status.SUCCESS : Status.IDLE,
          animation: indexStatus[upload.id]?.animation
            ? indexStatus[upload.id].animation
            : upload.isIndexed
              ? false
              : true,
        };
      });

      setIndexStatus(newUploads);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploads]);

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
          Object.values(indexStatus)
            .map((ele) => ele.status)
            .includes(Status.PENDING)
        }
        onClick={async () => {
          const files: UploadSimple[] = table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original);

          files.forEach((file) => {
            setIndexStatus((prevState) => ({
              ...prevState,
              [file.id]: { status: Status.PENDING, animation: true },
            }));
          });

          files.forEach(async (file) => {
            await fileIndexing({ setIndexStatus, data: file, setUploads });
          });
        }}
      />
    </div>
  );
};

export default FileLIst;
