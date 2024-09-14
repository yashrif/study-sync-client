"use client";

import { Dispatch, SetStateAction, useMemo } from "react";

import {
  commandsLvl1,
  Commands as ECommands,
} from "@/assets/data/dashboard/chatBot";
import { useChatBotContext } from "@/hooks/ChatBotContext";
import { ChatBotActionType } from "@/types";
import { generateUUID } from "@/utils/generateUUID";
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

  const slashCommands = useMemo(
    () =>
      commandsLvl1.filter((item) =>
        item.label.toLowerCase().includes(data.text.toLowerCase())
      ),
    [data.text]
  );

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
          data={{ type: "commands", data: slashCommands }}
          focusTextArea={data.focusTextArea}
        />
      );
    default:
      if (
        data.text.toLowerCase().includes(ECommands["select-file"].toLowerCase())
      )
        return <SelectFile />;
      return null;
  }
};

export default Commands;
