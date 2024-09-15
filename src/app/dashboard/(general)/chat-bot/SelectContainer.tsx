"use client";

import _ from "lodash";
import { Dispatch, SetStateAction, useCallback } from "react";

import { Commands, commandsLvl1 } from "@/assets/data/dashboard/chatBot";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select-custom";
import { useChatBotContext } from "@/hooks/ChatBotContext";
import { UploadShallow } from "@/types";
import { replaceAll } from "@/utils/string";

type Data =
  | { type: "commands"; data: typeof commandsLvl1 }
  | { type: "uploads"; data: UploadShallow[] };

type SelectContainerProps = {
  setText: Dispatch<SetStateAction<string>>;
  data: Data;
  setData?: (data: string) => void;
  children: React.ReactNode;
};

const SelectContainer: React.FC<SelectContainerProps> = ({
  setText,
  data,
  setData,
  children,
}) => {
  const {
    state: { textareaRef },
  } = useChatBotContext();

  /* ---------------------------- on textarea focus --------------------------- */

  const focusTextArea = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [textareaRef]);

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
        setText((prev) => replaceAll(prev, Commands["select-file"], ""));
      }}
    >
      <SelectTrigger
        className="invisible absolute top-0 left-0 max-w-60 z-10 rounded-md animate-in"
        onFocus={() => focusTextArea()}
      >
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>{children}</SelectContent>
    </Select>
  );
};

export default SelectContainer;
