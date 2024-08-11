"use client";

import { useCallback, useMemo } from "react";

import studySyncDB from "@/api/studySyncDB";
import PageHeading from "@/app/dashboard/_components/PageHeading";
import { dbEndpoints } from "@/assets/data/api";
import { home } from "@/assets/data/dashboard/planner";
import RadialProgress from "@/components/RadialProgress";
import { useFetchData } from "@/hooks/fetchData";
import { usePlannerContext } from "@/hooks/usePlannerContext";
import { Planner } from "@/types";
import Grid from "./_components/Grid";
import { statusPoints } from "./_utils/statusPoint";

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
    <div className="whitespace-nowrap">
      <PageHeading {...home.details} className="pr-12">
        <RadialProgress value={progress} radius={30} strokeWidth={8} />
      </PageHeading>

      <Grid />
    </div>
  );
};

export default PlannerDetails;
