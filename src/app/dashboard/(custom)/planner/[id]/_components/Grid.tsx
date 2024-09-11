import { useMemo } from "react";

import { usePlannerContext } from "@/hooks/usePlannerContext";
import { dateFormatter } from "../_utils/dateFormatter";
import RecordCard from "./record-card";
import TopicCard from "./topic-card";

const Grid = () => {
  const {
    state: { planner },
  } = usePlannerContext();

  const dates = useMemo(() => {
    const today = new Date(new Date().toISOString().split("T")[0]);
    const dates: string[] = [];
    if (planner?.createDate) {
      for (
        let prevDate = new Date(planner?.createDate.split("T")[0]);
        prevDate <= today;
        prevDate.setDate(prevDate.getDate() + 1)
      ) {
        dates.push(prevDate.toISOString());
      }
      return dates;
    } else return [];
  }, [planner?.createDate]);

  return (
    <div
      className="h-full grid gap-x-12 gap-y-8 pb-8 pr-12 overflow-x-scroll"
      style={{
        gridTemplateColumns: `320px repeat(${dates?.length}, 160px)`,
        gridTemplateRows: `auto repeat(${planner?.topics?.length - 1}, 1fr)`,
      }}
    >
      {["", ...dates]?.map((date) => (
        <div key={date} className="flex justify-center">
          <span className="text-small font-medium text-muted-foreground">
            {date ? dateFormatter(date) : ""}
          </span>
        </div>
      ))}

      {planner.topics &&
        planner.topics.map((topic) => (
          <>
            <TopicCard key={topic.id} {...topic} />
            {dates.map((date) => (
              <RecordCard
                key={`${topic.id}-${date}`}
                date={date}
                topic={topic}
              />
            ))}
          </>
        ))}
    </div>
  );
};

export default Grid;
