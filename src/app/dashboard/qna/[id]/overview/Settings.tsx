import { Dispatch, SetStateAction } from "react";

import { qnaDetails } from "@/assets/data/dashboard/qna";
import { Difficulty, Qna } from "@/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import Heading from "../components/Heading";
import Property from "../components/Property";

type Props = {
  data: Qna;
  difficulty: Difficulty;
  setDifficulty: Dispatch<SetStateAction<Difficulty>>;
};

const Settings: React.FC<Props> = ({ difficulty, setDifficulty }) => {
  return (
    <div className="flex flex-col gap-4">
      <Heading
        title={qnaDetails.settings.title}
        Icon={qnaDetails.settings.Icon}
      />
      <div className="flex flex-col gap-2">
        <div className="flex gap-16 justify-between items-center text-medium">
          <Property
            title={qnaDetails.settings.actions.difficulty.title}
            Icon={qnaDetails.settings.actions.difficulty.Icon}
          />
          <Select
            value={difficulty}
            onValueChange={(value) => {
              setDifficulty(value as Difficulty);
            }}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue
                placeholder={Difficulty.MEDIUM.toLowerCase()}
                className="placeholder:capitalize"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Object.values(Difficulty).map((value) => (
                  <SelectItem key={value} value={value}>
                    {value.slice(0, 1).toUpperCase() +
                      value.slice(1).toLowerCase()}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Settings;
