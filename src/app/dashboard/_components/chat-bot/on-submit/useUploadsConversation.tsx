"use client";

import { IconExclamationCircle, IconInfoCircle } from "@tabler/icons-react";

import { Commands } from "@/assets/data/dashboard/chatBot";
import { Conversation as TConversation } from "@/types";

const useUploadConversation = () => {
  const noUpload = (): TConversation => ({
    type: "response",
    data: (
      <div className="flex flex-col gap-1.5">
        <div className="text-sm">
          <IconExclamationCircle className="size-[14px] stroke-2 stroke-destructive inline-block pb-[1px] mr-1" />
          <span>Please select a file to continue.</span>
        </div>
        <p className="text-xs text-gray-400">
          <IconInfoCircle className="size-[13px] stroke-blue-500 stroke-2 inline-block pb-[1px] mr-0.5" />
          You can select file by using the{" "}
          <span className="text-white text-[11px] rounded-[7px] bg-primary px-0.5">
            {Commands["select-file"]}
          </span>{" "}
          {""}
          command.
        </p>
      </div>
    ),
  });

  const noUploads = (): TConversation => ({
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
          <span className="text-white text-[11px] rounded-[7px] bg-primary px-0.5">
            {Commands["select-file"]}
          </span>{" "}
          {""}
          command.
        </p>
      </div>
    ),
  });

  const onlyOneUpload = (): TConversation => ({
    type: "response",
    data: (
      <div className="flex flex-col gap-1.5">
        <div className="text-sm">
          <IconExclamationCircle className="size-[14px] stroke-2 stroke-destructive inline-block pb-[1px] mr-1" />
          <span>
            Please select only one file to continue. If you have selected
            multiple files, the first file will be used.
          </span>
        </div>
        <p className="text-xs text-gray-400">
          <IconInfoCircle className="size-[13px] stroke-blue-500 stroke-2 inline-block pb-[1px] mr-0.5" />
          You can select only one file by using the{" "}
          <span className="text-white text-[11px] rounded-[7px] bg-primary px-0.5">
            {Commands["select-file"]}
          </span>{" "}
          {""}
          command.
        </p>
      </div>
    ),
  });

  return {
    noUpload,
    noUploads,
    onlyOneUpload,
  };
};

export default useUploadConversation;
