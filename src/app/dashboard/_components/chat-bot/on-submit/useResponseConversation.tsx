"use client";

import { IconMessage } from "@tabler/icons-react";
import { useMemo } from "react";
import Markdown from "react-markdown";

import BouncingDots from "@/components/BouncingDots";
import { useChatBotContext } from "@/hooks/ChatBotContext";
import { Conversation as TConversation } from "@/types";

const useResponseConversation = () => {
  const {
    state: { selectedUploads, uploads },
  } = useChatBotContext();

  const filteredUploads = useMemo(
    () => uploads?.filter((item) => selectedUploads.includes(item.id)),
    [selectedUploads, uploads]
  );

  const responseCreatePrompt = (text: string): TConversation => ({
    type: "prompt",
    data: (
      <div className="flex flex-col gap-1">
        <p className="text-sm">{text}</p>
      </div>
    ),
  });

  const responseCrateStart = (): TConversation => ({
    type: "response",
    data: (
      <div className="text-sm">
        <IconMessage className="size-[14px] stroke-2 stroke-primary inline-block pb-[1px] mr-1" />
        Generating response
        <span className="ml-1.5 inline-flex items-center">
          <BouncingDots iconClassName="size-[5px]" />
        </span>
      </div>
    ),
  });

  const responseCreateSuccess = (
    response: string | undefined
  ): TConversation => {
    return {
      type: "response",
      data: <Markdown className="markdown">{response}</Markdown>,
    };
  };

  const responseCreateError = (): TConversation => ({
    type: "response",
    data: (
      <p className="text-sm">Failed to create response. Please try again.</p>
    ),
  });

  return {
    responseCreatePrompt,
    responseCrateStart,
    responseCreateSuccess,
    responseCreateError,
  };
};

export default useResponseConversation;
