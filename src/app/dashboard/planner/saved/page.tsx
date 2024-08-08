"use client";

import { Suspense } from "react";

import { dbEndpoints } from "@/assets/data/api";
import { home, search } from "@/assets/data/dashboard/planner";
import Spinner from "@/components/spinner/Spinner";
import DataTable from "@/components/table";
import { useFetchDataState } from "@/hooks/fetchData";
import { useTable } from "@/hooks/useTable";
import { PlannerShallow, Status } from "@allTypes";
import PageHeading from "../../_components/PageHeading";
import { columns } from "./Columns";

const SavedPlans: React.FC = () => {
  const { state } = useFetchDataState<null, PlannerShallow[]>({
    endpoint: dbEndpoints.planner,
  });

  const { table } = useTable({
    data: state.data || [],
    columns: columns,
  });

  return (
    <div className="flex flex-col">
      <PageHeading {...home.saved} />
      <Suspense fallback={<Spinner />}>
        <DataTable
          table={table}
          columns={columns}
          loading={state.status === Status.PENDING}
          searchKey={search.key}
          uploadEndpointDb={dbEndpoints.uploads}
          isDivider
          controlsConfig={{
            DELETE: {
              hidden: false,
              order: 3,
            },
            SEARCH: {
              hidden: false,
              order: 1,
            },
            VIEW: {
              hidden: false,
              order: 2,
            },
          }}
        />
      </Suspense>
    </div>
  );
};

export default SavedPlans;
