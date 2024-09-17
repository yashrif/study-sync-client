"use client";

import randomColor from "randomcolor";
import { useMemo } from "react";

import { Commands } from "@/assets/data/dashboard/chatBot";
import { useChatBotContext } from "@/hooks/ChatBotContext";
import {
  ChatBotActionType,
  PlannerRequestDBPost,
  QuizRequestDb,
  QuizTypes,
} from "@/types";
import { useHandlers } from "../useHandlers";
import useFlashcardConversation from "./useFlashcardConversation";
import usePlannerConversation from "./usePlannerConversation";
import useQuizConversation from "./useQuizConversation";
import useResponseConversation from "./useResponseConversation";
import useUploadConversation from "./useUploadsConversation";

export const useOnSubmit = () => {
  const { state, dispatch } = useChatBotContext();
  const {
    quizServerRequestHandler,
    quizDbRequestHandler,
    flashcardServerRequestHandler,
    flashcardDbRequestHandler,
    plannerServerRequestHandler,
    plannerDbRequestHandler,
    responseRequestHandler,
  } = useHandlers();
  const quizConversations = useQuizConversation();
  const flashcardConversations = useFlashcardConversation();
  const plannerConversations = usePlannerConversation();
  const responseConversations = useResponseConversation();
  const uploadConversation = useUploadConversation();

  const filteredUploads = useMemo(
    () =>
      state.uploads?.filter((item) => state.selectedUploads.includes(item.id)),
    [state.selectedUploads, state.uploads]
  );

  /* -------------------------------- On Submit ------------------------------- */

  const onSubmit = async () => {
    switch (true) {
      /* ---------------------------------- quiz ---------------------------------- */

      case state.prompt
        .toLowerCase()
        .includes(Commands["create-quiz"].toLowerCase()):
        state.setPrompt("");
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
                  payload: quizConversations.quizCreateSuccess(dbResponse),
                });
            }
          } catch (err) {
            console.log(err);
            dispatch({
              type: ChatBotActionType.REPLACE_LAST_CONVERSATION,
              payload: quizConversations.quizCreateError(),
            });
          }
        } else {
          dispatch({
            type: ChatBotActionType.ADD_CONVERSATION,
            payload: [
              uploadConversation.prompt(state.prompt),
              uploadConversation.noUpload(),
            ],
          });
        }

        break;

      /* -------------------------------- flashcard ------------------------------- */

      case state.prompt
        .toLowerCase()
        .includes(Commands["create-flashcard"].toLowerCase()):
        if (state.selectedUploads.length > 0) {
          try {
            state.setPrompt("");
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
                payload: flashcardConversations.flashcardCreateSuccess(
                  serverResponse.cqs.length
                ),
              });
            }
          } catch (err) {
            console.log(err);
            dispatch({
              type: ChatBotActionType.REPLACE_LAST_CONVERSATION,
              payload: flashcardConversations.flashcardCreateError(),
            });
          }
        } else {
          dispatch({
            type: ChatBotActionType.ADD_CONVERSATION,
            payload: [
              uploadConversation.prompt(state.prompt),
              uploadConversation.noUpload(),
            ],
          });
        }

        break;

      /* --------------------------------- planner -------------------------------- */

      case state.prompt
        .toLowerCase()
        .includes(Commands["create-planner"].toLowerCase()):
        if (state.selectedUploads.length > 0) {
          try {
            state.setPrompt("");
            dispatch({
              type: ChatBotActionType.ADD_CONVERSATION,
              payload: [
                plannerConversations.plannerCreatePrompt(),
                plannerConversations.plannerCrateStart(),
              ],
            });
            const serverResponse = await plannerServerRequestHandler({
              data: state.selectedUploads,
              fetchType: "lazy",
              isReset: true,
            });

            if (serverResponse) {
              const dbRequest: PlannerRequestDBPost = {
                title: serverResponse.name || filteredUploads[0].title,
                topics: serverResponse.topics.map((topic) => ({
                  ...topic,
                  color: randomColor({ luminosity: "bright" }),
                })),
                uploads: filteredUploads,
              };

              const dbResponse = await plannerDbRequestHandler({
                data: dbRequest,
                fetchType: "lazy",
                isReset: true,
              });

              if (dbResponse)
                dispatch({
                  type: ChatBotActionType.REPLACE_LAST_CONVERSATION,
                  payload:
                    plannerConversations.plannerCreateSuccess(dbResponse),
                });
            }
          } catch (err) {
            console.log(err);
            dispatch({
              type: ChatBotActionType.REPLACE_LAST_CONVERSATION,
              payload: plannerConversations.plannerCreateError(),
            });
          }
        } else {
          dispatch({
            type: ChatBotActionType.ADD_CONVERSATION,
            payload: [
              uploadConversation.prompt(state.prompt),
              uploadConversation.noUpload(),
            ],
          });
        }

        break;

      /* -------------------------------- Response -------------------------------- */

      default:
        try {
          dispatch({
            type: ChatBotActionType.ADD_CONVERSATION,
            payload: [
              responseConversations.responseCreatePrompt(state.prompt),
              responseConversations.responseCrateStart(),
            ],
          });

          state.setPrompt("");

          const response = await responseRequestHandler({
            data: state.prompt,
            fetchType: "lazy",
            isReset: true,
          });

          dispatch({
            type: ChatBotActionType.REPLACE_LAST_CONVERSATION,
            payload: responseConversations.responseCreateSuccess(response),
          });
        } catch (err) {
          console.log(err);
          dispatch({
            type: ChatBotActionType.REPLACE_LAST_CONVERSATION,
            payload: responseConversations.responseCreateError(),
          });
        }
    }
  };

  return { onSubmit };
};
