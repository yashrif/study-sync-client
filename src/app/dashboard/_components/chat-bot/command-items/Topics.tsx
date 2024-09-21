import { SelectGroup, SelectItem } from "@/components/ui/select";
import { useChatBotContext } from "@/hooks/useChatBotContext";
import { sliceLabel } from "./sliceLabel";

const Topics: React.FC = () => {
  const {
    state: { topics, selectedTopics },
  } = useChatBotContext();

  const filteredTopics = topics.filter(
    (topic) => !selectedTopics.includes(topic.name)
  );

  return (
    <SelectGroup>
      {filteredTopics.length > 0 ? (
        filteredTopics.map((item) => (
          <SelectItem
            key={item.id}
            value={item.name}
            className="text-xs text-muted-foreground px-3 cursor-pointer"
          >
            {sliceLabel(item.name)}
          </SelectItem>
        ))
      ) : (
        <div className="text-xs text-muted-foreground px-3 cursor-pointer h-8 flex items-center justify-center">
          No topic available
        </div>
      )}
    </SelectGroup>
  );
};

export default Topics;
