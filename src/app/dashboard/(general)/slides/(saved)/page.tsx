"use client";

import { Suspense, useCallback } from "react";

import studySyncDB from "@/api/studySyncDB";
import { dbEndpoints } from "@/assets/data/api";
import { home, search } from "@/assets/data/dashboard/slides";
import Spinner from "@/components/spinner/Spinner";
import DataTable from "@/components/table";
import { toast } from "@/components/ui/use-toast";
import { useFetchData, useFetchState } from "@/hooks/fetchData";
import { useApiHandler } from "@/hooks/useApiHandler";
import { useSlidesContext } from "@/hooks/useSlidesContext";
import { useTable } from "@/hooks/useTable";
import {
  SlidesActionType,
  SlideShallow,
  Status,
  TableControlTypes,
} from "@/types";
import PageHeading from "../../../_components/PageHeading";
import { useColumns } from "./Columns";

const CreateSlides = () => {
  const {
    state: { slides, status },
    dispatch,
  } = useSlidesContext();

  useFetchData<null, SlideShallow[]>({
    apiCall: useCallback(() => studySyncDB.get(dbEndpoints.slides), []),
    dispatch,
  });

  const { table } = useTable({
    data: slides || [],
    columns: useColumns(),
  });

  /* -------------------------------- handlers -------------------------------- */

  const { state, dispatch: slideDelete } = useFetchState<null>();
  const { handler } = useApiHandler<null, null>({
    apiCall: useCallback(
      (_, pathVariable) =>
        studySyncDB.delete(`${dbEndpoints.slides}/${pathVariable}`),
      []
    ),

    dispatch: slideDelete,
  });

  const onDelete = async () => {
    try {
      const selectedSlides = table
        .getFilteredSelectedRowModel()
        .rows.map((row) => row.original);

      await Promise.all(
        selectedSlides.map(async (slide) => {
          await handler({
            pathVariable: slide.id,
          });
        })
      );

      dispatch({
        type: SlidesActionType.SET_SLIDES,
        payload: slides.filter(
          (slide) => !selectedSlides.find((u) => u.id === slide.id)
        ),
      });

      table.resetRowSelection();
      toast({
        title: "Deleted Successfully!",
        description: `Selected slides are successfully deleted.`,
        duration: 5000,
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Action failed!",
        description: `Failed to delete the selected slides.`,
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
          loading={status === Status.PENDING}
          searchKey={search.key}
          uploadEndpointDb={dbEndpoints.uploads}
          controlsConfig={{
            [TableControlTypes.DELETE]: {
              hidden: false,
              onClick: onDelete,
              order: 3,
              status: state.status,
            },
            [TableControlTypes.SEARCH]: {
              hidden: false,
              order: 1,
              title: search.placeholder,
            },
            [TableControlTypes.VIEW]: {
              hidden: false,
              order: 2,
            },
          }}
        />
      </Suspense>
    </div>
  );
};

export default CreateSlides;
