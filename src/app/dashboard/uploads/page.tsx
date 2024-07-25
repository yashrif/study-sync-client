"use client";

import { Suspense } from "react";

import { dbEndpoints } from "@/assets/data/api";
import { home, search } from "@/assets/data/dashboard/uploads";
import Spinner from "@/components/spinner/Spinner";
import { useFetchData } from "@/hooks/fetchData";
import { useUploadsContext } from "@/hooks/useUploadsContext";
import { Status, UploadShallow } from "@/types";
import DataTable from "../../../components/table";
import PageHeading from "../_components/PageHeading";
import { useColumns } from "./Columns";

const Uploads: React.FC = () => {
  const {
    state: { uploads, status },
    dispatch,
  } = useUploadsContext();

  useFetchData<null, UploadShallow[]>({
    endpoint: dbEndpoints.uploads,
    dispatch,
  });

  return (
    <div className="flex flex-col">
      <PageHeading
        title={home.title}
        description={home.description}
        Icon={home.Icon}
      />
      <Suspense fallback={<Spinner />}>
        <DataTable
          columns={useColumns()}
          data={uploads || []}
          loading={status === Status.PENDING}
          searchKey={search.key}
          uploadEndpointDb={dbEndpoints.uploads}
        />
      </Suspense>
    </div>
  );
};

export default Uploads;
