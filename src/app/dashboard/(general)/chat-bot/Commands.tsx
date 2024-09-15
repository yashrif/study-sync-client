"use client";

import { Dispatch, SetStateAction } from "react";

import {
  commandLabels,
  commandsLvl1,
  commandsLvl2,
  Commands as ECommands,
} from "@/assets/data/dashboard/chatBot";
import { useChatBotContext } from "@/hooks/ChatBotContext";
import { ChatBotActionType } from "@/types";
import { generateUUID } from "@/utils/generateUUID";
import { replaceAll } from "@/utils/string";
import SelectContainer from "./SelectContainer";
import CommandItems from "./command-items/Commands";
import Uploads from "./command-items/Uploads";

type CommandsProps = {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
};

const Commands: React.FC<CommandsProps> = (data) => {
  const {
    state: { selectedUploads, uploads, textareaRef },
    dispatch,
  } = useChatBotContext();

  let textLvl1CommandStriped = data.text;
  commandLabels.forEach((item) => {
    textLvl1CommandStriped = replaceAll(textLvl1CommandStriped, item, "");
  });

  const SelectFile: React.FC = () => (
    <SelectContainer
      key={generateUUID()}
      setText={data.setText}
      data={{ type: "uploads", data: uploads }}
      setData={(data) => {
        dispatch({
          type: ChatBotActionType.SET_SELECTED_UPLOADS,
          payload: [...selectedUploads, data],
        });
      }}
    >
      <Uploads />
    </SelectContainer>
  );

  switch (data.text.trim().toLowerCase()) {
    case ECommands["create-quiz"].toLowerCase():
    case ECommands["create-planner"].toLowerCase():
    case ECommands["create-slide"].toLowerCase():
    case ECommands["create-flashcard"].toLowerCase():
      return <SelectFile />;
    case ECommands["slash"]:
      return (
        <SelectContainer
          key={generateUUID()}
          setText={data.setText}
          data={{ type: "commands", data: commandsLvl1 }}
        >
          <CommandItems commands={commandsLvl1} />
        </SelectContainer>
      );
    default:
      switch (true) {
        case textLvl1CommandStriped.endsWith("/"):
          return (
            <SelectContainer
              key={generateUUID()}
              setText={data.setText}
              data={{ type: "commands", data: commandsLvl2 }}
            >
              <CommandItems commands={commandsLvl2} />
            </SelectContainer>
          );
        case data.text
          .toLowerCase()
          .includes(ECommands["select-file"].toLowerCase()):
          return <SelectFile />;
        default:
          return null;
      }
  }
};

export default Commands;
