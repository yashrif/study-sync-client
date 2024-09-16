"use client";

import { IconExclamationCircle, IconInfoCircle } from "@tabler/icons-react";

import { Commands } from "@/assets/data/dashboard/chatBot";
import { Conversation as TConversation } from "@/types";

const useUploadConversation = () => {
  const prompt = (text: string): TConversation => ({
    type: "prompt",
    data: <p className="text-sm">{text}</p>,
  });

  const noUpload = (): TConversation => ({
    type: "response",
    data: (
      <div className="flex flex-col gap-1.5">
        <div className="text-sm">
          <IconExclamationCircle className="size-[14px] stroke-2 stroke-destructive inline-block pb-[1px] mr-1" />
          <span>Please select at least one file to continue.</span>
        </div>
        <p className="text-xs text-gray-400">
          <IconInfoCircle className="size-[13px] stroke-blue-500 stroke-2 inline-block pb-[1px] mr-0.5" />
          You can select multiple files by using the{" "}
          <span className="text-white text-[11px] rounded-xs bg-primary px-0.5">
            {Commands["select-file"]}
          </span>{" "}
          {""}
          command.
        </p>
      </div>
    ),
  });

  return {
    prompt,
    noUpload,
  };
};

export default useUploadConversation;
