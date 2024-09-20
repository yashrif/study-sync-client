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
import { useChatBotContext } from "@/hooks/useChatBotContext";
import { usePath } from "@/hooks/usePath";
import { ChatBotActionType } from "@/types";
import { generateUUID } from "@/utils/generateUUID";
import { replace } from "@/utils/string";
import SelectContainer from "./SelectContainer";
import CommandItems from "./command-items/Commands";
import Topics from "./command-items/Topics";
import Uploads from "./command-items/Uploads";

const Commands: React.FC = () => {
  const { path } = usePath();
  const {
    state: { selectedUploads, setPrompt, prompt, selectedTopics },
    dispatch,
  } = useChatBotContext();

  let textLvl1CommandStriped = prompt;
  commandLabels.forEach((item) => {
    textLvl1CommandStriped = replace(textLvl1CommandStriped, item, "");
  });

  /* ---------------------------------- utils --------------------------------- */

  const onOpenChange = useCallback(() => {
    setPrompt((prev) =>
      replace(
        replace(prev, ECommands["select-file"], ""),
        ECommands["select-topic"],
        " "
      )
    );
  }, [setPrompt]);

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

  const SelectTopic: React.FC = () => (
    <SelectContainer
      key={generateUUID()}
      onValueChange={(e) => {
        dispatch({
          type: ChatBotActionType.SET_SELECTED_TOPICS,
          payload: [...selectedTopics, e],
        });
      }}
      onOpenChange={onOpenChange}
    >
      <Topics />
    </SelectContainer>
  );

  /* --------------------------------- switch --------------------------------- */

  switch (prompt.trimStart().toLowerCase()) {
    case ECommands["create-quiz"].toLowerCase():
    case ECommands["create-planner"].toLowerCase():
    case ECommands["create-flashcard"].toLowerCase():
      return selectedUploads.length === 0 ? <SelectFile /> : null;
    case ECommands["create-slide"].toLowerCase():
      return <SelectTopic />;
    case ECommands["slash"]:
      const commands = [
        ...commandsLvl1,
        ...(path.includes(routes.dashboard.study.home) ||
        selectedUploads.length > 0
          ? additionalCommands.study
          : []),
      ];
      return (
        <SelectContainer
          key={generateUUID()}
          onValueChange={(e) => {
            setPrompt(
              (prev) => prev + _.find(commands, ["value", e])?.label.slice(1)
            );
          }}
          onOpenChange={onOpenChange}
        >
          <CommandItems commands={commands} />
        </SelectContainer>
      );
    default:
      switch (true) {
        case textLvl1CommandStriped.endsWith("/"):
          const commands = [
            ...commandsLvl2,
            ...(path.includes(routes.dashboard.study.home) ||
            selectedUploads.length > 0
              ? additionalCommands.study
              : []),
            ...(prompt
              .toLowerCase()
              .includes(ECommands["create-slide"].toLowerCase())
              ? additionalCommands.slide
              : []),
          ];
          return (
            <SelectContainer
              key={generateUUID()}
              onValueChange={(e) => {
                setPrompt(
                  (prev) =>
                    prev + _.find(commands, ["value", e])?.label.slice(1)
                );
              }}
              onOpenChange={onOpenChange}
            >
              <CommandItems commands={commands} />
            </SelectContainer>
          );
        case prompt
          .toLowerCase()
          .includes(ECommands["select-file"].toLowerCase()):
          return <SelectFile />;
        case prompt
          .toLowerCase()
          .includes(ECommands["select-topic"].toLowerCase()):
          return <SelectTopic />;
        default:
          return null;
      }
  }
};

export default Commands;
