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

/* -------------------------------- Commands -------------------------------- */
type CommandsProps = {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  focusTextArea: () => void;
};

const Commands: React.FC<CommandsProps> = (data) => {
  const {
    state: { quiz, uploads },
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
          type: ChatBotActionType.SET_QUIZ_DATA,
          payload: {
            ...quiz,
            ids: [...quiz.ids, data],
          },
        });
      }}
      focusTextArea={data.focusTextArea}
    />
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
          focusTextArea={data.focusTextArea}
        />
      );
    default:
      switch (true) {
        case commandLabels.some(
          (command) =>
            data.text.toLowerCase().includes(command.toLowerCase()) &&
            textLvl1CommandStriped.endsWith("/")
        ):
          return (
            <SelectContainer
              key={generateUUID()}
              setText={data.setText}
              data={{ type: "commands", data: commandsLvl2 }}
              focusTextArea={data.focusTextArea}
            />
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
