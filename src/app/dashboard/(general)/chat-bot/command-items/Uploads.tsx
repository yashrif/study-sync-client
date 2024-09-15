import { SelectGroup, SelectItem } from "@/components/ui/select";
import { useChatBotContext } from "@/hooks/ChatBotContext";
import { sliceLabel } from "./sliceLabel";

const Uploads: React.FC = () => {
  const {
    state: { uploads },
  } = useChatBotContext();

  return (
    <SelectGroup>
      {uploads.map((item) => (
        <SelectItem
          key={item.id}
          value={item.id}
          className="text-xs text-muted-foreground px-3"
        >
          {sliceLabel(item.title)}
        </SelectItem>
      ))}
    </SelectGroup>
  );
};

export default Uploads;
