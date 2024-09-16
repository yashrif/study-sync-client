"use client";

import { IconFileTypePdf, IconX } from "@tabler/icons-react";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { useChatBotContext } from "@/hooks/ChatBotContext";
import { ChatBotActionType, Status, UploadShallow } from "@allTypes";

type Props = {
  upload: UploadShallow;
};

const BADGE_TITLE_MAX_LENGTH = 20;

const UploadBadge: React.FC<Props> = ({ upload }) => {
  const {
    state: { selectedUploads, requestStatus },
    dispatch,
  } = useChatBotContext();

  return (
    <Badge key={upload.id} className="rounded-sm flex items-center gap-1.5">
      <IconFileTypePdf className="stroke-white size-3 stroke-[2.5px]" />
      <span className="whitespace-nowrap">
        {upload.title.length > BADGE_TITLE_MAX_LENGTH
          ? `${upload.title.slice(0, BADGE_TITLE_MAX_LENGTH - 3)}...`
          : upload.title}
      </span>
      <IconX
        className="stroke-white size-3 stroke-[2.5px] hover:scale-125 hover:stroke-[#ffa8a8] transition-all duration-300"
        onClick={() => {
          dispatch({
            type: ChatBotActionType.SET_SELECTED_UPLOADS,
            payload: selectedUploads.filter((id) => id !== upload.id),
          });
        }}
        style={{
          cursor: requestStatus === Status.PENDING ? "not-allowed" : "pointer",
          pointerEvents: requestStatus === Status.PENDING ? "none" : "auto",
        }}
      />
    </Badge>
  );
};

export default UploadBadge;
