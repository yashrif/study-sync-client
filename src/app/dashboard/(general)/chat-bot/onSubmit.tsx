"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

import { Commands } from "@/assets/data/dashboard/chatBot";
import { links } from "@/assets/data/routes";
import BouncingDots from "@/components/BouncingDots";
import { Quiz } from "@/components/icons";
import { useChatBotContext } from "@/hooks/ChatBotContext";
import { ChatBotActionType, QuizRequestDb, QuizTypes } from "@/types";
import { useHandlers } from "./useHandlers";

type Props = {
  text: string;
};

export const useOnSubmit = () => {
  const { push } = useRouter();

  const { state, dispatch } = useChatBotContext();
  const {
    quizServerRequestHandler,
    quizDbRequestHandler,
    flashcardServerRequestHandler,
    flashcardDbRequestHandler,
  } = useHandlers();

  const filteredUploads = useMemo(
    () =>
      state.uploads?.filter((item) => state.selectedUploads.includes(item.id)),
    [state.selectedUploads, state.uploads]
  );

  /* -------------------------------- On Submit ------------------------------- */

  const onSubmit = async ({ text }: Props) => {
    switch (true) {
      /* ---------------------------------- quiz ---------------------------------- */

      case text.toLowerCase().includes(Commands["create-quiz"].toLowerCase()):
        if (state.selectedUploads.length > 0) {
          try {
            dispatch({
              type: ChatBotActionType.ADD_CONVERSATION,
              payload: [
                {
                  type: "prompt",
                  data: (
                    <div className="flex flex-col gap-1">
                      <p className="text-sm">
                        <span className="text-white rounded-xs bg-primary px-0.5">
                          {Commands["create-quiz"]}
                        </span>{" "}
                        using the file
                        {state.selectedUploads.length > 1 ? "s" : ""}:
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
                },
                {
                  type: "response",
                  data: (
                    <div className="text-sm">
                      Please wait while we create the quiz
                      <span className="pl-1.5 inline-flex items-center">
                        {" "}
                        <BouncingDots iconClassName="size-[5px]" />
                      </span>
                    </div>
                  ),
                },
              ],
            });

            const serverResponse = await quizServerRequestHandler({
              data: {
                ids: state.selectedUploads,
                types: [QuizTypes.CQ, QuizTypes.MCQ],
              },
              fetchType: "lazy",
              isReset: true,
            });

            if (serverResponse) {
              const dbRequest: QuizRequestDb = {
                ...serverResponse,
                title: filteredUploads[0].title,
                uploads: filteredUploads,
              };

              const dbResponse = await quizDbRequestHandler({
                data: dbRequest,
                fetchType: "lazy",
                isReset: true,
              });

              if (dbResponse)
                dispatch({
                  type: ChatBotActionType.REPLACE_LAST_CONVERSATION,
                  payload: {
                    type: "response",
                    data: (
                      <div className="flex flex-col gap-2">
                        <p className="text-sm">Quiz created successfully!</p>
                        <div className="text-sm">
                          <span className="align-top">
                            To view the quiz, click{" "}
                          </span>
                          <Link
                            href={
                              links.dashboard.quiz.details(dbResponse.id).href
                            }
                            className="anchor-sm pl-1 inline-flex gap-1.5 items-center h-4"
                          >
                            <Quiz className="size-[14px] stroke-2" />
                            <span>Here</span>
                          </Link>
                          .
                        </div>
                      </div>
                    ),
                  },
                });
            }
          } catch (err) {
            console.log(err);
            dispatch({
              type: ChatBotActionType.REPLACE_LAST_CONVERSATION,
              payload: {
                type: "response",
                data: (
                  <p className="text-sm">
                    Failed to create quiz. Please try again.
                  </p>
                ),
              },
            });
          }
        }
        break;
      case text
        .toLowerCase()
        .includes(Commands["create-planner"].toLowerCase()):
        console.log("Create Planner");
        break;
      case text.toLowerCase().includes(Commands["create-slide"].toLowerCase()):
        console.log("Create Slide");
        break;

      /* -------------------------------- flashcard ------------------------------- */

      case text
        .toLowerCase()
        .includes(Commands["create-flashcard"].toLowerCase()):
        if (state.selectedUploads.length > 0) {
          try {
            const serverResponse = await flashcardServerRequestHandler({
              data: {
                ids: state.selectedUploads,
                types: [QuizTypes.CQ, QuizTypes.MCQ],
              },
              fetchType: "lazy",
              isReset: true,
            });

            if (serverResponse) {
              const cqs = serverResponse.cqs.map((cq) => ({
                ...cq,
                isFlashcard: true,
              }));

              Promise.all(
                cqs.map(async (cq) => {
                  await flashcardDbRequestHandler({
                    data: cq,
                    fetchType: "lazy",
                    isReset: true,
                  });
                })
              );

              // if (state.requestStatus === Status.SUCCESS)
              //   push(links.dashboard.flashcard.review.href);
            }
          } catch (err) {
            console.log(err);
          }
        }
        break;
      default:
        console.log("No command found");
    }
  };

  return { onSubmit };
};
