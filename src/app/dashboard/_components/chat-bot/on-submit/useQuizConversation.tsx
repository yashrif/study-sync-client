"use client";

import Link from "next/link";
import { useMemo } from "react";

import { Commands } from "@/assets/data/dashboard/chatBot";
import { links } from "@/assets/data/routes";
import BouncingDots from "@/components/BouncingDots";
import { Quiz } from "@/components/icons";
import { useChatBotContext } from "@/hooks/ChatBotContext";
import { Conversation as TConversation } from "@/types";

const useQuizConversation = () => {
  const {
    state: { selectedUploads, uploads },
  } = useChatBotContext();

  const filteredUploads = useMemo(
    () => uploads?.filter((item) => selectedUploads.includes(item.id)),
    [selectedUploads, uploads]
  );

  const quizCreatePrompt = (): TConversation => ({
    type: "prompt",
    data: (
      <div className="flex flex-col gap-1">
        <p className="text-sm">
          <span className="text-white rounded-xs bg-primary px-0.5">
            {Commands["create-quiz"]}
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

  const quizCrateStart = (): TConversation => ({
    type: "response",
    data: (
      <div className="text-sm">
        <Quiz className="size-[14px] stroke-2 stroke-primary inline-block pb-[1px] mr-1" />
        Creating quiz
        <span className="ml-1.5 inline-flex items-center">
          <BouncingDots iconClassName="size-[5px]" />
        </span>
      </div>
    ),
  });

  const quizCreateSuccess = (id: string): TConversation => ({
    type: "response",
    data: (
      <div className="flex flex-col gap-2">
        <p className="text-sm">Quiz created successfully!</p>
        <div className="text-sm">
          <span className="align-top">To view the quiz, click </span>
          <Link
            href={links.dashboard.quiz.details(id).href}
            className="anchor-sm pl-1 inline-flex gap-1.5 items-center h-4"
          >
            <Quiz className="size-[14px] stroke-2" />
            <span>Here</span>
          </Link>
          .
        </div>
      </div>
    ),
  });

  const quizCreateError = (): TConversation => ({
    type: "response",
    data: <p className="text-sm">Failed to create quiz. Please try again.</p>,
  });

  return {
    quizCreatePrompt,
    quizCrateStart,
    quizCreateSuccess,
    quizCreateError,
  };
};

export default useQuizConversation;
