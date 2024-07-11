"use client";

import { Suspense } from "react";

import { dbEndpoints } from "@/assets/data/api";
import { home, search } from "@/assets/data/dashboard/uploads";
import Spinner from "@/components/Spinner";
import { Status } from "@/types";
import { useGetUploads } from "@hooks/useUploads";
import DataTable from "../../../components/table";
import PageHeader from "../components/PageHeader";
import { columns } from "./Columns";

const Uploads: React.FC = () => {
  const { data: uploads, status } = useGetUploads().getUploads();

  return (
    <div className="divide-y-2 flex flex-col">
      <PageHeader
        title={home.title}
        description={home.description}
        Icon={home.Icon}
      />
      <Suspense fallback={<Spinner />}>
        <DataTable
          columns={columns}
          data={uploads}
          loading={status === Status.PENDING}
          searchKey={search.key}
          uploadEndpointDb={dbEndpoints.uploads}
          className="pt-8"
        />
      </Suspense>
    </div>
  );
};

export default Uploads;
