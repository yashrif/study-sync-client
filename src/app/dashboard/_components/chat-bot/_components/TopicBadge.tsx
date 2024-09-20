"use client";

import { IconX } from "@tabler/icons-react";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { useChatBotContext } from "@/hooks/useChatBotContext";
import { shadeGenerator } from "@/utils/colorGenerator";
import { ChatBotActionType, Status, TopicShallow } from "@allTypes";

type Props = {
  topic: TopicShallow;
};

const BADGE_TITLE_MAX_LENGTH = 19;

const TopicBadge: React.FC<Props> = ({ topic }) => {
  const {
    state: { selectedUploads, requestStatus },
    dispatch,
  } = useChatBotContext();

  return (
    <Badge
      key={topic.id}
      className="rounded-sm flex items-center gap-1.5"
      style={{
        color: topic.color,
        backgroundColor: shadeGenerator(topic.color, 20),
        borderColor: topic.color,
      }}
    >
      <span className="whitespace-nowrap">
        {topic.name.length > BADGE_TITLE_MAX_LENGTH
          ? `${topic.name.slice(0, BADGE_TITLE_MAX_LENGTH - 3)}...`
          : topic.name}
      </span>
      <IconX
        className="size-3 stroke-[2.5px] hover:scale-125 hover:stroke-[#ffa8a8] transition-all duration-300"
        onClick={() => {
          dispatch({
            type: ChatBotActionType.SET_SELECTED_UPLOADS,
            payload: selectedUploads.filter((id) => id !== topic.id),
          });
        }}
        style={{
          stroke: topic.color,
          cursor: requestStatus === Status.PENDING ? "not-allowed" : "pointer",
          pointerEvents: requestStatus === Status.PENDING ? "none" : "auto",
        }}
      />
    </Badge>
  );
};

export default TopicBadge;
