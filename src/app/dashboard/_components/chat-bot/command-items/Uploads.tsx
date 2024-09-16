import { SelectGroup, SelectItem } from "@/components/ui/select";
import { useChatBotContext } from "@/hooks/ChatBotContext";
import { sliceLabel } from "./sliceLabel";

const Uploads: React.FC = () => {
  const {
    state: { uploads, selectedUploads },
  } = useChatBotContext();

  return (
    <SelectGroup>
      {uploads
        .filter((upload) => !selectedUploads.includes(upload.id))
        .map((item) => (
          <SelectItem
            key={item.id}
            value={item.id}
            className="text-xs text-muted-foreground px-3 cursor-pointer"
          >
            {sliceLabel(item.title)}
          </SelectItem>
        ))}
    </SelectGroup>
  );
};

export default Uploads;
