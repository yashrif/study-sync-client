import { commandsLvl1 } from "@/assets/data/dashboard/chatBot";
import { SelectGroup, SelectItem } from "@/components/ui/select";
import { sliceLabel } from "./sliceLabel";

type Props = {
  commands: typeof commandsLvl1;
};

const Commands: React.FC<Props> = ({ commands }) => {
  return (
    <SelectGroup>
      {commands.map((item) => (
        <SelectItem
          key={item.value}
          value={item.value}
          className="text-xs text-muted-foreground px-3"
        >
          {sliceLabel(item.label)}
        </SelectItem>
      ))}
    </SelectGroup>
  );
};

export default Commands;
