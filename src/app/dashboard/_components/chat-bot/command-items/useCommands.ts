"use client";

import {
    additionalCommands,
    commandsLvl2,
} from "@/assets/data/dashboard/chatBot";
import { routes } from "@/assets/data/routes";
import { useChatBotContext } from "@/hooks/useChatBotContext";
import { usePath } from "@/hooks/usePath";

const useCommands = () => {
  const { path } = usePath();
  const {
    state: { selectedUploads },
  } = useChatBotContext();

  const commandsLvlInline = (): string[] => {
    const commonCommands = commandsLvl2.map((item) => item.label);

    switch (true) {
      case path.includes(routes.dashboard.study.default) ||
        selectedUploads.length > 0:
        return [
          ...commonCommands,
          ...additionalCommands.study.map((item) => item.label),
        ];
      default:
        return commonCommands;
    }
  };

  return {
    commandsLvlInline,
  };
};

export default useCommands;
