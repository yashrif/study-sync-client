"use client";

import Link from "next/link";
import { useMemo } from "react";

import { Commands } from "@/assets/data/dashboard/chatBot";
import { links } from "@/assets/data/routes";
import BouncingDots from "@/components/BouncingDots";
import { useChatBotContext } from "@/hooks/useChatBotContext";
import { Slide, Conversation as TConversation } from "@/types";
import { IconRoute } from "@tabler/icons-react";

const useSlideConversation = () => {
  const {
    state: { selectedUploads, uploads, selectedTopics },
  } = useChatBotContext();

  const filteredUploads = useMemo(
    () => uploads?.filter((item) => selectedUploads.includes(item.id)),
    [selectedUploads, uploads]
  );

  const prompt = (): TConversation => ({
    type: "prompt",
    data: (
      <div className="flex flex-col gap-1">
        <p className="text-sm">
          <span className="text-white rounded-[7px] bg-primary px-0.5">
            {Commands["create-slide"]}
          </span>{" "}
          from the -
        </p>
        <p className="text-sm font-medium text-primary mt-2 mb-1">
          File{selectedUploads.length > 1 ? "s" : ""}:
        </p>
        <ul className="list-disc pl-6">
          {filteredUploads.map((item) => (
            <li key={item.id} className="text-sm">
              {item.title}
            </li>
          ))}
        </ul>
        <p className="text-sm font-medium text-primary mt-2 mb-1">
          Topic{selectedTopics.length > 1 ? "s" : ""}:
        </p>
        <ul className="list-disc pl-6">
          {selectedTopics.map((item, index) => (
            <li key={index} className="text-sm">
              {item}
            </li>
          ))}
        </ul>
      </div>
    ),
  });

  const crateStart = (): TConversation => ({
    type: "response",
    data: (
      <div className="text-sm">
        <IconRoute className="size-[14px] stroke-2 stroke-primary inline-block pb-[1px] mr-1" />
        Creating slide
        <span className="ml-1.5 inline-flex items-center">
          <BouncingDots iconClassName="size-[5px]" />
        </span>
      </div>
    ),
  });

  const createSuccess = (slide: Slide): TConversation => ({
    type: "response",
    data: (
      <div className="flex flex-col gap-2.5">
        <p className="text-sm">Slide created successfully!</p>

        <div className="flex flex-col gap-1.5">
          <div className="text-base text-primary font-medium">
            <IconRoute className="size-4 stroke-2 stroke-primary inline-block pb-[1px] mr-1" />
            Slide info:
          </div>
          <ul className="flex flex-col gap-1 list-disc pl-6">
            <li className="text-sm">
              <span className="text-muted-foreground">Title:</span>{" "}
              <span className="text-primary">{slide.name}</span>
            </li>
          </ul>
        </div>

        <div className="text-sm">
          <span className="align-top">For more details, click </span>
          <Link
            href={links.dashboard.slides.details(slide.id).href}
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

  const createError = (): TConversation => ({
    type: "response",
    data: <p className="text-sm">Failed to create slide. Please try again.</p>,
  });

  return {
    prompt,
    crateStart,
    createSuccess,
    createError,
  };
};

export default useSlideConversation;
