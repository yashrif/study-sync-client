"use client";

import { Suspense, useEffect, useState } from "react";

import studySyncServer from "@/api/studySyncServer";
import { serverEndpoints } from "@/assets/data/api";
import IconButton from "@/components/button/IconButton";
import { useTable } from "@/hooks/useTable";
import { useGetUploads } from "@/hooks/useUploads";
import { IndexStatus, Status, UploadSimple } from "@/types";
import { fileIndexing } from "@/utils/fileIndexing";
import { postQna } from "@/utils/useQna";
import Spinner from "@components/Spinner";
import { IconArrowRight } from "@tabler/icons-react";
import { columns } from "./Columns";
import Table from "./Table";

const FileLIst = () => {
  const [uploadStatus, setUploadStatus] = useState<Status>(Status.IDLE);
  const [processStatus, setProcessStatus] = useState<Status>(Status.IDLE);
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
        newUploads[upload.id] = upload.isIndexed ? Status.SUCCESS : Status.IDLE;
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
        iconClassName="!size-6 stroke-text-300 text-text-300"
        disabled={
          (table && table.getFilteredSelectedRowModel().rows.length === 0) ||
          Object.values(indexStatus).includes(Status.PENDING) ||
          processStatus === Status.PENDING ||
          status === Status.PENDING
        }
        status={
          Object.values(indexStatus).includes(Status.PENDING)
            ? Status.PENDING
            : processStatus
        }
        showStatus
        onClick={async () => {
          setProcessStatus(Status.PENDING);
          const uploads: UploadSimple[] = table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original);

          const ids: string[] = await Promise.all(
            uploads.map(async (upload) => {
              if (!upload.isIndexed) {
                await fileIndexing({
                  setIndexStatus,
                  data: upload,
                  setUploads,
                });
              }
              return upload.id;
            })
          );

          const data = (await studySyncServer.post(serverEndpoints.qnas, ids))
            .data;

          await postQna(data);
          setProcessStatus(Status.SUCCESS);

          setTimeout(() => {
            setProcessStatus(Status.IDLE);
          }, 2500);
        }}
      />
    </div>
  );
};

export default FileLIst;
