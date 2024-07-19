"use client";

import { Suspense } from "react";

import { dbEndpoints, serverEndpoints } from "@/assets/data/api";
import { home, search } from "@/assets/data/dashboard/uploads";
import Spinner from "@/components/spinner/Spinner";
import { useFetchDataState } from "@/hooks/fetchData";
import { Status, UploadSimple } from "@/types";
import DataTable from "../../../components/table";
import PageHeading from "../_components/PageHeading";
import { columns } from "./Columns";

const Uploads: React.FC = () => {
  const {
    state: { data, status },
  } = useFetchDataState<UploadSimple[]>(serverEndpoints.uploads);

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
          data={data || []}
          loading={status === Status.PENDING}
          searchKey={search.key}
          uploadEndpointDb={dbEndpoints.uploads}
        />
      </Suspense>
    </div>
  );
};

export default Uploads;
