"use client";

import { Suspense, useCallback } from "react";

import studySyncDB from "@/api/studySyncDB";
import PageHeading from "@/app/dashboard/_components/PageHeading";
import { dbEndpoints } from "@/assets/data/api";
import { home, search } from "@/assets/data/dashboard/planner";
import Spinner from "@/components/spinner/Spinner";
import DataTable from "@/components/table";
import { toast } from "@/components/ui/use-toast";
import { useFetchData, useFetchState } from "@/hooks/fetchData";
import { useApiHandler } from "@/hooks/useApiHandler";
import { usePlannersContext } from "@/hooks/usePlannersContext";
import { useTable } from "@/hooks/useTable";
import { FetchActionType, PlannerShallow, Status } from "@allTypes";
import { useColumns } from "./Columns";

const SavedPlans: React.FC = () => {
  const {
    state: { planners },
    dispatch,
  } = usePlannersContext();

  useFetchData<null, PlannerShallow[]>({
    apiCall: useCallback(() => studySyncDB.get(dbEndpoints.planners), []),
    dispatch,
  });

  const { table } = useTable({
    data: planners || [],
    columns: useColumns(),
  });

  const { state, dispatch: plannerDelete } = useFetchState<null>();
  const { handler } = useApiHandler<null, null>({
    apiCall: useCallback(
      (_, pathVariable) =>
        studySyncDB.delete(`${dbEndpoints.planners}/${pathVariable}`),
      []
    ),
    dispatch: plannerDelete,
  });

  const onDelete = async () => {
    try {
      const selectedPlanners = table
        .getFilteredSelectedRowModel()
        .rows.map((row) => row.original);

      //TODO: Implement delete exception handling
      await Promise.all(
        selectedPlanners.map(async (planner) => {
          await handler({
            pathVariable: planner.id,
          });
        })
      );

      dispatch({
        type: FetchActionType.FETCH_RESET,
        payload: planners.filter(
          (planner) => !selectedPlanners.find((u) => u.id === planner.id)
        ),
      });

      table.resetRowSelection();
      toast({
        title: "Deleted Successfully!",
        description: `Selected plans are successfully deleted.`,
        duration: 5000,
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Action failed!",
        description: `Failed to delete the selected plans.`,
        duration: 5000,
      });
    }
  };

  return (
    <div className="flex flex-col">
      <PageHeading {...home.saved} />
      <Suspense fallback={<Spinner />}>
        <DataTable
          table={table}
          columns={useColumns()}
          loading={state.status === Status.PENDING}
          searchKey={search.key}
          uploadEndpointDb={dbEndpoints.uploads}
          isDivider
          controlsConfig={{
            DELETE: {
              hidden: false,
              order: 3,
              onClick: onDelete,
              status: state.status,
            },
            SEARCH: {
              hidden: false,
              order: 1,
              title: "Search by title",
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
