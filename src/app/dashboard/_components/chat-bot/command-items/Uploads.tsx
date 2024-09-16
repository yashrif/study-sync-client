import { SelectGroup, SelectItem } from "@/components/ui/select";
import { useChatBotContext } from "@/hooks/ChatBotContext";
import { sliceLabel } from "./sliceLabel";

const Uploads: React.FC = () => {
  const {
    state: { uploads, selectedUploads },
  } = useChatBotContext();

  const filteredUploads = uploads.filter(
    (upload) => !selectedUploads.includes(upload.id)
  );

  return (
    <SelectGroup>
      {filteredUploads.length > 0 ? (
        filteredUploads.map((item) => (
          <SelectItem
            key={item.id}
            value={item.id}
            className="text-xs text-muted-foreground px-3 cursor-pointer"
          >
            {sliceLabel(item.title)}
          </SelectItem>
        ))
      ) : (
        <div className="text-xs text-muted-foreground px-3 cursor-pointer h-8 flex items-center justify-center">
          No uploads available
        </div>
      )}
    </SelectGroup>
  );
};

export default Uploads;
