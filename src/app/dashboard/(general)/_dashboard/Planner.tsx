"use client";

import _ from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";

import studySyncDB from "@/api/studySyncDB";
import { dbEndpoints } from "@/assets/data/api";
import { useFetchDataState, useFetchState } from "@/hooks/fetchData";
import { useApiHandler } from "@/hooks/useApiHandler";
import { PlannerShallow, Planner as TPlanner } from "@/types";
import { statusPoints } from "@/utils/statusPoint";
import { IconRoute } from "@tabler/icons-react";
import Divider from "./components/Divider";
import OverallProgress from "./components/OverallProgress";
import PlannerChart from "./components/PlannerChart";
import Stat from "./components/Stat";

const Planner = () => {
  const [plannerDetailed, setPlannerDetailed] = useState<TPlanner[] | null>(
    null
  );

  const { state: planners } = useFetchDataState<
    { pathVariable: string },
    PlannerShallow[]
  >({
    apiCall: useCallback(
      async () => await studySyncDB.get(dbEndpoints.planners),
      []
    ),
  });

  const { dispatch } = useFetchState<TPlanner>();

  const { handler } = useApiHandler<null, TPlanner>({
    apiCall: useCallback(
      async (_, id) => await studySyncDB.get(`${dbEndpoints.planners}/${id}`),
      []
    ),
    dispatch,
  });

  useEffect(() => {
    if (planners.data?.length) {
      (async () => {
        const promises = planners?.data?.map(
          async (planner) =>
            await handler({
              pathVariable: planner.id,
            })
        );
        if (promises) {
          const data = await Promise.all(promises);
          setPlannerDetailed(
            data.filter((planner): planner is TPlanner => planner !== undefined)
          );
        }
      })();
    }
  }, [handler, planners]);

  const color = {
    text: "#f37658",
    bg: "#ffeeea",
    path: "#f4ddd8",
  };

  const progresses = useMemo(
    () =>
      plannerDetailed?.map((planner) => {
        let progress = 0;
        if (planner.topics) {
          planner.topics.forEach((topic) => {
            progress += statusPoints(topic.status);
          });
          return progress / planner.topics.length;
        }
        return 0;
      }),
    [plannerDetailed]
  );

  const recordDatesLastWeek = useMemo(() => {
    const today = new Date();

    const lastWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 6
    )
      .toISOString()
      .split("T")[0];

    const records = _.chain(plannerDetailed)
      .flatMap((planner) => planner.topics)
      .flatMap((topic) => topic.records)
      .flatMap((record) => record.date.split("T")[0])
      .filter((date) => date >= lastWeek)
      .value();

    const dateFormatter = (date: string) =>
      new Date(date).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "numeric",
      });

    const recordsCount = _.chain(records)
      .countBy()
      .map((value, key) => ({
        name: dateFormatter(key),
        date: key,
        value,
      }))
      .value();

    for (let i = 0; i < 7; i++) {
      const date = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - i
      )
        .toISOString()
        .split("T")[0];
      if (!records.includes(date)) {
        recordsCount.push({
          name: dateFormatter(date),
          date: date,
          value: 0,
        });
      }
    }

    return _.sortBy(recordsCount, "name");
  }, [plannerDetailed]);

  return (
    <div className="w-full flex gap-x-8 gap-y-8 p-8 rounded-md border border-[#f37658]/50 shadow-sm col-span-2 bg-gradient-to-br from-transparent from-50% to-[#f37658]/25">
      <div className="w-full grid grid-cols-[repeat(4,auto)] gap-x-8">
        <Stat
          heading={{
            title: "Planner",
            Icon: IconRoute,
          }}
          color={color}
          totalCount={plannerDetailed?.length || 0}
          countLabel="Plans"
          percentage={
            progresses?.filter((progress) => progress === 100).length || 0
          }
          percentageLabel="Completed"
          supplementaryLabel="In Progress"
        />
        <Divider bg={color.text} />
        <OverallProgress
          color={color}
          progress={
            (progresses?.reduce((a, b) => a + b, 0) ?? 0) /
            (progresses?.length ?? 1)
          }
        />
        <Divider bg={color.text} />
      </div>

      {recordDatesLastWeek && (
        <PlannerChart data={recordDatesLastWeek} color={color} />
      )}
    </div>
  );
};

export default Planner;
