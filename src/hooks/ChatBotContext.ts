import { useContext } from "react";

import { ChatBotContext } from "@/context/ChatBotContext";
import { ChatBotContextProps } from "@/types";

export const useChatBotContext = (): ChatBotContextProps => {
  const context = useContext(ChatBotContext);
  if (context === undefined) {
    throw new Error(
      "useChatBotContext must be used within an ChatBotProvider"
    );
  }
  return context;
};
