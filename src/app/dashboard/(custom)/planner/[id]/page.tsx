"use client";

import { useCallback, useMemo } from "react";

import studySyncDB from "@/api/studySyncDB";
import PageHeading from "@/app/dashboard/_components/PageHeading";
import { dbEndpoints } from "@/assets/data/api";
import { home } from "@/assets/data/dashboard/planner";
import IconButton from "@/components/button/IconButton";
import RadialProgress from "@/components/RadialProgress";
import { useFetchData, useFetchState } from "@/hooks/fetchData";
import { useApiHandler } from "@/hooks/useApiHandler";
import { usePlannerContext } from "@/hooks/usePlannerContext";
import { Planner, PlannerActionType, Status } from "@/types";
import { IconChecks } from "@tabler/icons-react";
import { statusPoints } from "../../../../../utils/statusPoint";
import Grid from "./_components/Grid";

type Props = {
  params: {
    id: string;
  };
};

const PlannerDetails: React.FC<Props> = ({ params: { id } }) => {
  const { state, dispatch } = usePlannerContext();

  useFetchData<null, Planner>({
    apiCall: useCallback(
      () => studySyncDB.get(`${dbEndpoints.planners}/${id}`),
      [id]
    ),
    dispatch,
  });

  const { state: plannerState, dispatch: plannerDispatch } =
    useFetchState<Planner>();
  const { handler } = useApiHandler<{ endDate: string }, Planner>({
    apiCall: useCallback(
      (data, pathVariable) =>
        studySyncDB.patch(`${dbEndpoints.planners}/${pathVariable}`, data),
      []
    ),
    dispatch: plannerDispatch,
  });

  const progress = useMemo(() => {
    let progress = 0;
    if (state.planner.topics) {
      state.planner.topics.forEach((topic) => {
        progress += statusPoints(topic.status);
      });
      return progress / state.planner.topics.length;
    }
    return 0;
  }, [state.planner]);

  return (
    <div className="whitespace-nowrap w-full relative h-screen grid grid-cols-1 grid-rows-[auto,1fr,auto] gap-0">
      <PageHeading {...home.details} className="pr-12">
        <RadialProgress value={progress} radius={30} strokeWidth={8} />
      </PageHeading>

      <Grid />

      {state.planner.endDate === null && (
        <IconButton
          className={`fixed bottom-8 left-2/4 ${plannerState.status === Status.IDLE ? "" : "size-10 rounded-full"}`}
          iconClassName="size-5"
          contents={{
            [Status.IDLE]: {
              type: "icon-content",
              Icon: IconChecks,
              content: "Mark as complete",
            },
          }}
          onClick={() => {
            try {
              const endDate = new Date(
                new Date().toISOString().split("T")[0]
              ).toISOString();

              handler({
                data: {
                  endDate,
                },
                pathVariable: state.planner.id,
              });

              setTimeout(() => {
                dispatch({
                  type: PlannerActionType.SET_PLANNER,
                  payload: {
                    ...state.planner,
                    endDate,
                  },
                });
              }, 2500);
            } catch (err) {
              console.log(err);
            }
          }}
          status={plannerState.status}
        />
      )}
    </div>
  );
};

export default PlannerDetails;
