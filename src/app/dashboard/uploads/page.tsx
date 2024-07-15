"use client";

import { Suspense } from "react";

import { dbEndpoints } from "@/assets/data/api";
import { home, search } from "@/assets/data/dashboard/uploads";
import Spinner from "@/components/spinner/Spinner";
import { Status } from "@/types";
import { useGetUploads } from "@hooks/useUpload";
import DataTable from "../../../components/table";
import PageHeading from "../_components/PageHeading";
import { columns } from "./Columns";

const Uploads: React.FC = () => {
  const { data: uploads, status } = useGetUploads({}).getUploads();

  return (
    <div className="flex flex-col">
      <PageHeading
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
        />
      </Suspense>
    </div>
  );
};

export default Uploads;
