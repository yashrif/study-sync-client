"use client";

import { useMemo } from "react";

import { Commands } from "@/assets/data/dashboard/chatBot";
import { useChatBotContext } from "@/hooks/ChatBotContext";
import { ChatBotActionType, QuizRequestDb, QuizTypes } from "@/types";
import { useHandlers } from "../useHandlers";
import useFlashcardConversation from "./useFlashcardConversation";
import useQuizConversation from "./useQuizConversation";

type Props = {
  text: string;
};

export const useOnSubmit = () => {
  const { state, dispatch } = useChatBotContext();
  const {
    quizServerRequestHandler,
    quizDbRequestHandler,
    flashcardServerRequestHandler,
    flashcardDbRequestHandler,
  } = useHandlers();
  const quizConversations = useQuizConversation();
  const flashcardConversations = useFlashcardConversation();

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
                quizConversations.quizCreatePrompt(),
                quizConversations.quizCrateStart(),
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
                  payload: quizConversations.quizCreateSuccess(dbResponse.id),
                });
            }
          } catch (err) {
            console.log(err);
            dispatch({
              type: ChatBotActionType.REPLACE_LAST_CONVERSATION,
              payload: quizConversations.quizCreateError(),
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
            dispatch({
              type: ChatBotActionType.ADD_CONVERSATION,
              payload: [
                flashcardConversations.flashcardCreatePrompt(),
                flashcardConversations.flashcardCrateStart(),
              ],
            });
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

              dispatch({
                type: ChatBotActionType.REPLACE_LAST_CONVERSATION,
                payload: flashcardConversations.flashcardCreateSuccess(),
              });
            }
          } catch (err) {
            console.log(err);
            dispatch({
              type: ChatBotActionType.REPLACE_LAST_CONVERSATION,
              payload: flashcardConversations.flashcardCreateError(),
            });
          }
        }
        break;
      default:
        console.log("No command found");
    }
  };

  return { onSubmit };
};
