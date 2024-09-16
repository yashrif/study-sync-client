"use client";

import Link from "next/link";
import { useMemo } from "react";

import { Commands } from "@/assets/data/dashboard/chatBot";
import { links } from "@/assets/data/routes";
import BouncingDots from "@/components/BouncingDots";
import { useChatBotContext } from "@/hooks/ChatBotContext";
import { Conversation as TConversation } from "@/types";
import { IconRoute } from "@tabler/icons-react";

const usePlannerConversation = () => {
  const {
    state: { selectedUploads, uploads },
  } = useChatBotContext();

  const filteredUploads = useMemo(
    () => uploads?.filter((item) => selectedUploads.includes(item.id)),
    [selectedUploads, uploads]
  );

  const plannerCreatePrompt = (): TConversation => ({
    type: "prompt",
    data: (
      <div className="flex flex-col gap-1">
        <p className="text-sm">
          <span className="text-white rounded-xs bg-primary px-0.5">
            {Commands["create-planner"]}
          </span>{" "}
          from the file
          {selectedUploads.length > 1 ? "s" : ""}:
        </p>
        <ul className="list-disc pl-6">
          {filteredUploads.map((item) => (
            <li key={item.id} className="text-sm">
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    ),
  });

  const plannerCrateStart = (): TConversation => ({
    type: "response",
    data: (
      <div className="text-sm">
        <IconRoute className="size-[14px] stroke-2 stroke-primary inline-block pb-[1px] mr-1" />
        Creating planner
        <span className="ml-1.5 inline-flex items-center">
          <BouncingDots iconClassName="size-[5px]" />
        </span>
      </div>
    ),
  });

  const plannerCreateSuccess = (id: string): TConversation => ({
    type: "response",
    data: (
      <div className="flex flex-col gap-2">
        <p className="text-sm">Planner created successfully!</p>
        <div className="text-sm">
          <span className="align-top">To view the planner, click </span>
          <Link
            href={links.dashboard.planner.details(id).href}
            className="anchor-sm pl-1 inline-flex gap-1.5 items-center h-4"
          >
            <IconRoute className="size-[14px] stroke-2" />
            <span>Here</span>
          </Link>
          .
        </div>
      </div>
    ),
  });

  const plannerCreateError = (): TConversation => ({
    type: "response",
    data: (
      <p className="text-sm">Failed to create planner. Please try again.</p>
    ),
  });

  return {
    plannerCreatePrompt,
    plannerCrateStart,
    plannerCreateSuccess,
    plannerCreateError,
  };
};

export default usePlannerConversation;
