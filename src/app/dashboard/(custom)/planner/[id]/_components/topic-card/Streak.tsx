import { IconFlame } from "@tabler/icons-react";
import { useMemo } from "react";

import { TopicRecord } from "@/types";
import { compareIsoDates } from "@/utils/compareIsoDates";

type Props = {
  records: TopicRecord[];
};

const Streak: React.FC<Props> = ({ records }) => {
  const currentStreak = useMemo(() => {
    if (records?.length) {
      let lastDate = new Date(records.at(-1)?.date ?? "");
      let streak = 0;

      for (let i = 0; i < records.length; i++) {
        if (
          records.some((record) =>
            compareIsoDates(
              new Date(record.date).toISOString(),
              new Date(lastDate).toISOString()
            )
          )
        )
          streak++;
        else break;
        lastDate.setDate(lastDate.getDate() - 1);
      }
      return streak;
    }
    return 0;
  }, [records]);

  return (
    <div className="flex gap-1.5 items-center">
      <IconFlame className="size-4 text-yellow-500 fill-yellow-500" />
      <span className="font-medium text-yellow-500/70">
        {currentStreak} days
      </span>
    </div>
  );
};

export default Streak;
