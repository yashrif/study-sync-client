"use client";

import _ from "lodash";
import { Dispatch, SetStateAction } from "react";

import { Commands, commandsLvl1 } from "@/assets/data/dashboard/chatBot";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select-custom";
import { UploadShallow } from "@/types";
import { replaceAll } from "@/utils/string";

type Data =
  | { type: "commands"; data: typeof commandsLvl1 }
  | { type: "uploads"; data: UploadShallow[] };

type SelectContainerProps = {
  setText: Dispatch<SetStateAction<string>>;
  data: Data;
  setData?: (data: string) => void;
  focusTextArea: () => void;
};

const SelectContainer: React.FC<SelectContainerProps> = ({
  setText,
  data,
  setData,
  focusTextArea,
}) => {
  return (
    <Select
      defaultOpen
      onValueChange={(e) => {
        setText(
          (prev) =>
            prev +
            (data.type === "commands"
              ? _.find(data.data, ["value", e])?.label.slice(1)
              : "using the books 📕 " + _.find(data.data, ["id", e])?.title) +
            " "
        );
        if (setData) {
          setData(e);
        }

        focusTextArea();
      }}
      onOpenChange={() => {
        focusTextArea();
        setText((prev) => replaceAll(prev, Commands["select-file"], " "));
      }}
    >
      <SelectTrigger
        className="invisible absolute top-0 left-0 max-w-60 w-full z-10 rounded-md animate-in"
        onFocus={() => focusTextArea()}
      >
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data.data.map((item) => (
            <SelectItem
              key={
                data.type === "commands"
                  ? (item as (typeof commandsLvl1)[0]).value
                  : (item as UploadShallow).id
              }
              value={
                data.type === "commands"
                  ? (item as (typeof commandsLvl1)[0]).value
                  : (item as UploadShallow).id
              }
              className="text-xs text-muted-foreground px-3"
            >
              {data.type === "commands"
                ? (item as (typeof commandsLvl1)[0]).label
                : (item as UploadShallow).title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectContainer;
