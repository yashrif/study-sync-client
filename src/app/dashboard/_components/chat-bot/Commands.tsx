"use client";

import _ from "lodash";
import { useCallback } from "react";

import {
  additionalCommands,
  commandLabels,
  commandsLvl1,
  commandsLvl2,
  Commands as ECommands,
} from "@/assets/data/dashboard/chatBot";
import { routes } from "@/assets/data/routes";
import { useChatBotContext } from "@/hooks/ChatBotContext";
import { usePath } from "@/hooks/usePath";
import { ChatBotActionType } from "@/types";
import { generateUUID } from "@/utils/generateUUID";
import { replaceAll } from "@/utils/string";
import SelectContainer from "./SelectContainer";
import CommandItems from "./command-items/Commands";
import Uploads from "./command-items/Uploads";

const Commands: React.FC = () => {
  const { path } = usePath();
  const {
    state: { selectedUploads, setText, prompt },
    dispatch,
  } = useChatBotContext();

  let textLvl1CommandStriped = prompt;
  commandLabels.forEach((item) => {
    textLvl1CommandStriped = replaceAll(textLvl1CommandStriped, item, "");
  });

  /* ---------------------------------- utils --------------------------------- */

  const onOpenChange = useCallback(() => {
    setText((prev) => replaceAll(prev, ECommands["select-file"], ""));
  }, [setText]);

  const SelectFile: React.FC = () => (
    <SelectContainer
      key={generateUUID()}
      onValueChange={(e) => {
        dispatch({
          type: ChatBotActionType.SET_SELECTED_UPLOADS,
          payload: [...selectedUploads, e],
        });
      }}
      onOpenChange={onOpenChange}
    >
      <Uploads />
    </SelectContainer>
  );

  switch (prompt.trimStart().toLowerCase()) {
    case ECommands["create-quiz"].toLowerCase():
    case ECommands["create-planner"].toLowerCase():
    case ECommands["create-slide"].toLowerCase():
    case ECommands["create-flashcard"].toLowerCase():
      return selectedUploads.length === 0 ? <SelectFile /> : null;
    case ECommands["slash"]:
      return (
        <SelectContainer
          key={generateUUID()}
          onValueChange={(e) => {
            setText(
              (prev) =>
                prev + _.find(commandsLvl1, ["value", e])?.label.slice(1)
            );
          }}
          onOpenChange={onOpenChange}
        >
          <CommandItems
            commands={[
              ...commandsLvl1,
              ...(path.includes(routes.dashboard.study.home)
                ? additionalCommands.study
                : []),
            ]}
          />
        </SelectContainer>
      );
    default:
      switch (true) {
        case textLvl1CommandStriped.endsWith("/"):
          return (
            <SelectContainer
              key={generateUUID()}
              onValueChange={(e) => {
                setText(
                  (prev) =>
                    prev + _.find(commandsLvl2, ["value", e])?.label.slice(1)
                );
              }}
              onOpenChange={onOpenChange}
            >
              <CommandItems
                commands={[
                  ...commandsLvl2,
                  ...(path.includes(routes.dashboard.study.home)
                    ? additionalCommands.study
                    : []),
                ]}
              />
            </SelectContainer>
          );
        case prompt
          .toLowerCase()
          .includes(ECommands["select-file"].toLowerCase()):
          return <SelectFile />;
        default:
          return null;
      }
  }
};

export default Commands;
