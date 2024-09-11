import { Fragment, useMemo } from "react";

import { usePlannerContext } from "@/hooks/usePlannerContext";
import { isoLocalMidnight } from "@/utils/dateFormatter";
import { generateUUID } from "@/utils/generateUUID";
import { dateFormatter } from "../_utils/dateFormatter";
import RecordCard from "./record-card";
import TopicCard from "./topic-card";

const Grid = () => {
  const {
    state: { planner },
  } = usePlannerContext();

  const dates = useMemo(() => {
    const dates: string[] = [];
    const endDate = planner.endDate
      ? new Date(planner.endDate).getTime()
      : new Date().getTime();

    if (planner?.createDate) {
      for (
        let prevDate = new Date(isoLocalMidnight(planner.createDate));
        prevDate.getTime() <= endDate;
        prevDate.setDate(prevDate.getDate() + 1)
      ) {
        dates.push(isoLocalMidnight(prevDate));
      }
      return dates;
    } else return [];
  }, [planner?.createDate, planner.endDate]);

  return (
    <div
      className="h-full w-full grid gap-x-12 gap-y-8 pb-24 pr-12 overflow-x-scroll"
      style={{
        gridTemplateColumns: `320px repeat(${dates?.length}, 160px)`,
        gridTemplateRows: `auto repeat(${planner?.topics?.length - 1}, 1fr)`,
      }}
    >
      {["", ...dates]?.map((date) => (
        <div key={generateUUID()} className="flex justify-center">
          <span className="text-small font-medium text-muted-foreground">
            {date ? dateFormatter(date) : ""}
          </span>
        </div>
      ))}

      {planner.topics &&
        planner.topics.map((topic) => (
          <Fragment key={generateUUID()}>
            <TopicCard {...topic} />
            {dates.map((date) => (
              <RecordCard key={generateUUID()} date={date} topicShallow={topic} />
            ))}
          </Fragment>
        ))}
    </div>
  );
};

export default Grid;
