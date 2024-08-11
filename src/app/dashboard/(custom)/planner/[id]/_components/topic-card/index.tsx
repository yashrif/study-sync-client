import { Topic } from "@/types";
import { shadeGenerator } from "@/utils/shadeGenerator";
import Status from "./Status";
import Streak from "./Streak";

const TopicCard: React.FC<Topic> = (topic) => {
  return (
    <div
      className="h-full py-3 px-4 border-l-4 rounded-r-sm flex flex-col justify-center gap-2.5 shadow-[0_6px_12px_rgba(0,0,0,0.05)]"
      style={{
        borderColor: topic.color,
        backgroundColor: shadeGenerator(topic.color, 20),
      }}
    >
      <span
        className="font-medium text-medium overflow-ellipsis line-clamp-1"
        style={{
          color: topic.color,
        }}
      >
        {topic.name}
      </span>
      <div className="flex flex-col gap-1.5">
        <Status status={topic.status} />
        <Streak records={topic.records} />
      </div>
    </div>
  );
};

export default TopicCard;
