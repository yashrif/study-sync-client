"use client";

import { Suspense, useEffect, useState } from "react";

import studySyncDB from "@/api/studySyncDB";
import { dbEndpoints } from "@/assets/data/api";
import { home, search } from "@/assets/data/dashboard/documents";
import Spinner from "@/components/Spinner";
import { Status } from "@/types/status";
import { UploadSimple } from "@/types/upload";
import DataTable from "../../../components/table";
import { columns } from "./Columns";

const getUploadList = async () =>
  (await studySyncDB.get(dbEndpoints.uploads)).data;

const Documents: React.FC = () => {
  const [uploads, setUploads] = useState<UploadSimple[]>([]);
  const [status, setStatus] = useState<Status>(Status.PENDING);

  useEffect(() => {
    try {
      getUploadList().then((data) => {
        setUploads(data);
        setStatus(Status.SUCCESS);
      });
    } catch (e) {
      setStatus(Status.ERROR);
    } finally {
      setStatus(Status.IDLE);
    }
  }, []);

  return (
    <div className="divide-y-2 flex flex-col">
      <div className="flex flex-col gap-2 mb-4">
        <h2 className="text-text-400">{home.title}</h2>
        <p className="text-small text-text-200 tracking-[0.5px]">
          {home.description}
        </p>
      </div>
      <Suspense fallback={<Spinner />}>
        <DataTable
          columns={columns}
          data={uploads}
          loading={status === Status.PENDING}
          search={search}
          uploadEndpointDb={dbEndpoints.uploads}
        />
      </Suspense>
    </div>
  );
};

export default Documents;
