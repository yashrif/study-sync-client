"use client";

import { IconFileTypePdf, IconMessage } from "@tabler/icons-react";
import { useMemo } from "react";
import Markdown from "react-markdown";

import BouncingDots from "@/components/BouncingDots";
import { useChatBotContext } from "@/hooks/ChatBotContext";
import { Conversation as TConversation, Upload } from "@/types";

const useSummarizeConversation = () => {
  const {
    state: { selectedUploads, uploads },
  } = useChatBotContext();

  const filteredUploads = useMemo(
    () => uploads?.filter((item) => selectedUploads.includes(item.id)),
    [selectedUploads, uploads]
  );

  const crateStart = (upload?: Upload): TConversation => ({
    type: "response",
    data: (
      <div className="text-sm">
        <IconMessage className="size-[14px] stroke-2 stroke-primary inline-block pb-[1px] mr-1" />
        Summarizing based on the content of the{" "}
        {!upload && selectedUploads.length > 1 ? (
          <span className="text-primary font-medium">first</span>
        ) : (
          ""
        )}{" "}
        file{" "}
        <span className="font-medium">
          <IconFileTypePdf className="size-[14px] stroke-2 stroke-primary inline-block pb-[1px] mr-1" />
          <span className="text-primary">
            {upload
              ? upload.title
              : filteredUploads.length > 0
                ? filteredUploads[0].title
                : ""}
          </span>
        </span>
        <span className="ml-1.5 inline-flex items-center">
          <BouncingDots iconClassName="size-[5px]" />
        </span>
      </div>
    ),
  });

  const createSuccess = (response: string | undefined): TConversation => {
    return {
      type: "response",
      data: <Markdown className="markdown">{response}</Markdown>,
    };
  };

  const createError = (): TConversation => ({
    type: "response",
    data: <p className="text-sm">Failed to summarize. Please try again.</p>,
  });

  return {
    crateStart,
    createSuccess,
    createError,
  };
};

export default useSummarizeConversation;
