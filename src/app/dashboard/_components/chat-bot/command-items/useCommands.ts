"use client";

import { useCallback } from "react";

import {
  additionalCommands,
  Commands,
  commandsLvl1,
  commandsLvl2,
} from "@/assets/data/dashboard/chatBot";
import { routes } from "@/assets/data/routes";
import { useChatBotContext } from "@/hooks/useChatBotContext";
import { usePath } from "@/hooks/usePath";
import { findFirstSubstring } from "@/utils/string";

const useCommands = () => {
  const { path } = usePath();
  const {
    state: { selectedUploads, prompt },
  } = useChatBotContext();

  const getFirstLvl1Command = useCallback(() => {
    const subString =
      findFirstSubstring(
        prompt.toLowerCase(),
        commandsLvl1.map((item) => item.value.toLowerCase())
      ).substring || "";

    return prompt.trim().toLowerCase().startsWith(subString) ? subString : "";
  }, [prompt]);

  const commandsLvlInline = useCallback((): string[] => {
    const commonCommands = commandsLvl2.map((item) => item.label);

    switch (true) {
      case path.includes(routes.dashboard.study.default) ||
        selectedUploads.length > 0:
        return [
          ...commonCommands,
          ...additionalCommands.study.map((item) => item.label),
          ...(getFirstLvl1Command().localeCompare(
            Commands["create-slide"].toLowerCase()
          ) === 0
            ? additionalCommands.slide.map((item) => item.label)
            : []),
        ];
      default:
        return commonCommands;
    }
  }, [getFirstLvl1Command, path, selectedUploads.length]);

  const getFirstInlineCommand = useCallback(
    () =>
      findFirstSubstring(
        prompt.toLowerCase(),
        commandsLvlInline().map((item) => item.toLowerCase())
      ).substring || "",

    [commandsLvlInline, prompt]
  );

  return {
    getFirstLvl1Command,
    commandsLvlInline,
    getFirstInlineCommand,
  };
};

export default useCommands;
