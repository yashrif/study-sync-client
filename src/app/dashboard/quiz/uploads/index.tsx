"use client";

import { IconArrowRight } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import studySyncServer from "@/api/studySyncServer";
import { serverEndpoints } from "@/assets/data/api";
import { create, defaultValues } from "@/assets/data/dashboard/quiz";
import { links } from "@/assets/data/routes";
import IconButton from "@/components/button/IconButton";
import Spinner from "@/components/spinner/Spinner";
import { useTable } from "@/hooks/useTable";
import { useGetUploads } from "@/hooks/useUpload";
import { IndexStatus, QuizResponseServer, Status, UploadSimple } from "@/types";
import { fileIndexing } from "@/utils/fileIndexing";
import { postQuiz } from "@/utils/quizRequest";
import { columns } from "./Columns";
import Table from "./Table";

const UploadList = () => {
  const { push } = useRouter();

  const [uploadStatus, setUploadStatus] = useState<Status>(Status.IDLE);
  const [processStatus, setProcessStatus] = useState<Status>(Status.IDLE);
  const [indexStatus, setIndexStatus] = useState<IndexStatus>({});

  const {
    data: uploads,
    status,
    setUploads,
  } = useGetUploads({
    dependencies: [uploadStatus],
    mode: "lazy",
  }).getUploads();
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
    <div className="max-w-[700px] flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-primary">
          <create.Icon className="size-[30px] stroke-[2.5]" />
          <h2>{create.title}</h2>
        </div>
        <p className="text-medium text-text-200 max-w-prose">
          {create.description}
        </p>
      </div>
      <Suspense fallback={<Spinner />}>
        <div className="flex flex-col gap-8 items-center justify-center">
          <div className="divide-y-2 w-full">
            <Table
              table={table}
              setUploadStatus={setUploadStatus}
              status={status}
            />
          </div>
          <IconButton
            title=""
            size="lg"
            className="size-12 p-0 rounded-full"
            Icon={IconArrowRight}
            iconClassName="!size-6 stroke-text-300 text-text-300"
            disabled={
              (table &&
                table.getFilteredSelectedRowModel().rows.length === 0) ||
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
              let id: string | null = null;
              try {
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

                const data: QuizResponseServer = (
                  await studySyncServer.post(serverEndpoints.quizzes, ids)
                ).data;

                await postQuiz({ ...data, title: defaultValues.title }).then(
                  (res) => {
                    id = res.id;
                  }
                );
                setProcessStatus(Status.SUCCESS);
              } catch (e) {
                setProcessStatus(Status.ERROR);
              } finally {
                setTimeout(() => {
                  if (id) push(links.dashboard.quizDetails(id).href);
                  else setProcessStatus(Status.IDLE);
                }, 2000);
              }
            }}
          />
        </div>
      </Suspense>
    </div>
  );
};

export default UploadList;
