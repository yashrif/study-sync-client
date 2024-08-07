import ScopeHeading from "@/app/dashboard/_components/ScopeHeading";
import { review } from "@/assets/data/dashboard/planner";
import { Badge } from "@/components/ui/badge";
import { usePlannerContext } from "@/hooks/usePlannerContext";
import { tintGenerator } from "@/utils/tintGenerator";

const Topics = () => {
  const {
    state: { topics },
  } = usePlannerContext();

  return (
    <div className="flex flex-col gap-8 pt-8">
      <ScopeHeading {...review.topics} />
      <div className="flex flex-wrap gap-x-6 gap-y-4 max-w-5xl">
        {topics?.map((topic, index) => (
          <Badge
            key={index}
            className="px-4 py-1.5 text-sm"
            style={{
              color: topic.color,
              backgroundColor: `#${tintGenerator(topic.color, 20)}`,
              borderColor: topic.color,
            }}
          >
            {topic.name}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default Topics;
