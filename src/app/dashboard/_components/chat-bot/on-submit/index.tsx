"use client";

import { useParams } from "next/navigation";
import randomColor from "randomcolor";
import { useMemo } from "react";

import { Commands, StudyCommands } from "@/assets/data/dashboard/chatBot";
import { routes } from "@/assets/data/routes";
import { useChatBotContext } from "@/hooks/ChatBotContext";
import { usePath } from "@/hooks/usePath";
import {
  ChatBotActionType,
  PlannerRequestDBPost,
  QuizRequestDb,
  QuizTypes,
} from "@/types";
import { replace } from "@/utils/string";
import { useHandlers } from "../useHandlers";
import useExplainConversation from "./useExplainConversation";
import useFlashcardConversation from "./useFlashcardConversation";
import usePlannerConversation from "./usePlannerConversation";
import usePromptConversation from "./usePromptConversation";
import useProvideExampleConversation from "./useProvideExampleConversation";
import useQuizConversation from "./useQuizConversation";
import useResponseConversation from "./useResponseConversation";
import useSummarizeConversation from "./useSummarizeConversation";
import useUploadConversation from "./useUploadsConversation";

export const useOnSubmit = () => {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : params.id[0];

  const { path } = usePath();

  const { state, dispatch } = useChatBotContext();
  const {
    quizServerRequestHandler,
    quizDbRequestHandler,
    flashcardServerRequestHandler,
    flashcardDbRequestHandler,
    plannerServerRequestHandler,
    plannerDbRequestHandler,
    responseRequestHandler,
    studyPromptResponseRequestHandler,
  } = useHandlers();
  const quizConversations = useQuizConversation();
  const flashcardConversations = useFlashcardConversation();
  const plannerConversations = usePlannerConversation();
  const responseConversations = useResponseConversation();
  const uploadConversation = useUploadConversation();
  const explainConversation = useExplainConversation();
  const promptConversation = usePromptConversation();
  const summarizeConversation = useSummarizeConversation();
  const provideExampleConversation = useProvideExampleConversation();

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
              promptConversation.prompt(state.prompt),
              uploadConversation.noUploads(),
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
              promptConversation.prompt(state.prompt),
              uploadConversation.noUploads(),
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
              promptConversation.prompt(state.prompt),
              uploadConversation.noUploads(),
            ],
          });
        }

        break;

      /* --------------------------------- Explain -------------------------------- */

      case state.prompt
        .toLowerCase()
        .includes(Commands["explain"].toLowerCase()) &&
        (state.selectedUploads.length > 0 ||
          path.includes(routes.dashboard.study.home)):
        const stripedExplainPrompt = state.prompt
          .replace(Commands["explain"], "")
          .trim();

        if (
          (state.selectedUploads.length > 0 &&
            stripedExplainPrompt.length > 0) ||
          (path.includes(routes.dashboard.study.home) &&
            state.uploads.some((upload) => upload.id === id) &&
            stripedExplainPrompt.length > 0)
        ) {
          try {
            dispatch({
              type: ChatBotActionType.ADD_CONVERSATION,
              payload: [
                promptConversation.prompt(state.prompt, Commands["explain"]),
                explainConversation.crateStart(
                  state.uploads.filter((item) => item.id === id)[0]
                ),
              ],
            });

            state.setPrompt("");

            const response = await studyPromptResponseRequestHandler({
              data: {
                query:
                  StudyCommands.explain.instruction +
                  replace(state.prompt, Commands["explain"], ""),
                fileId: id || state.selectedUploads[0],
              },
              fetchType: "lazy",
              isReset: true,
            });
            dispatch({
              type: ChatBotActionType.REPLACE_LAST_CONVERSATION,
              payload: explainConversation.createSuccess(response),
            });
          } catch (err) {
            console.log(err);
            state.setPrompt("");
            dispatch({
              type: ChatBotActionType.REPLACE_LAST_CONVERSATION,
              payload: explainConversation.createError(),
            });
          }
        } else if (
          path.includes(routes.dashboard.study.home) &&
          !state.uploads.some((upload) => upload.id === id)
        ) {
          state.setPrompt("");
          dispatch({
            type: ChatBotActionType.ADD_CONVERSATION,
            payload: [
              promptConversation.prompt(state.prompt, Commands["explain"]),
              uploadConversation.invalidUpload(),
            ],
          });
        } else if (stripedExplainPrompt.length === 0) {
          state.setPrompt("");
          dispatch({
            type: ChatBotActionType.ADD_CONVERSATION,
            payload: [
              promptConversation.prompt(state.prompt, Commands["explain"]),
              promptConversation.noText(),
            ],
          });
        }

        break;

      /* -------------------------------- Summarize ------------------------------- */

      case state.prompt
        .toLowerCase()
        .includes(Commands["summarize"].toLowerCase()) &&
        (state.selectedUploads.length > 0 ||
          path.includes(routes.dashboard.study.home)):
        const stripedSummarizePrompt = state.prompt
          .replace(Commands["summarize"], "")
          .trim();

        if (
          (state.selectedUploads.length > 0 &&
            stripedSummarizePrompt.length > 0) ||
          (path.includes(routes.dashboard.study.home) &&
            state.uploads.some((upload) => upload.id === id) &&
            stripedSummarizePrompt.length > 0)
        ) {
          try {
            dispatch({
              type: ChatBotActionType.ADD_CONVERSATION,
              payload: [
                promptConversation.prompt(state.prompt, Commands["summarize"]),
                summarizeConversation.crateStart(
                  state.uploads.filter((item) => item.id === id)[0]
                ),
              ],
            });
            state.setPrompt("");
            const response = await studyPromptResponseRequestHandler({
              data: {
                query:
                  StudyCommands.summarize.instruction +
                  replace(state.prompt, Commands["summarize"], ""),
                fileId: id || state.selectedUploads[0],
              },
              fetchType: "lazy",
              isReset: true,
            });
            dispatch({
              type: ChatBotActionType.REPLACE_LAST_CONVERSATION,
              payload: summarizeConversation.createSuccess(response),
            });
          } catch (err) {
            console.log(err);
            dispatch({
              type: ChatBotActionType.REPLACE_LAST_CONVERSATION,
              payload: summarizeConversation.createError(),
            });
          }
        } else if (
          path.includes(routes.dashboard.study.home) &&
          !state.uploads.some((upload) => upload.id === id)
        ) {
          state.setPrompt("");
          dispatch({
            type: ChatBotActionType.ADD_CONVERSATION,
            payload: [
              promptConversation.prompt(state.prompt, Commands["summarize"]),
              uploadConversation.invalidUpload(),
            ],
          });
        } else if (stripedSummarizePrompt.length === 0) {
          state.setPrompt("");
          dispatch({
            type: ChatBotActionType.ADD_CONVERSATION,
            payload: [
              promptConversation.prompt(state.prompt, Commands["summarize"]),
              promptConversation.noText(),
            ],
          });
        }

        break;

      /* ----------------------------- Provide Example ---------------------------- */

      case state.prompt
        .toLowerCase()
        .includes(Commands["provide-example"].toLowerCase()) &&
        (state.selectedUploads.length > 0 ||
          path.includes(routes.dashboard.study.home)):
        const stripedProvideExamplePrompt = state.prompt
          .replace(Commands["provide-example"], "")
          .trim();

        if (
          (state.selectedUploads.length > 0 &&
            stripedProvideExamplePrompt.length > 0) ||
          (path.includes(routes.dashboard.study.home) &&
            state.uploads.some((upload) => upload.id === id) &&
            stripedProvideExamplePrompt.length > 0)
        ) {
          try {
            dispatch({
              type: ChatBotActionType.ADD_CONVERSATION,
              payload: [
                promptConversation.prompt(
                  state.prompt,
                  Commands["provide-example"]
                ),
                provideExampleConversation.crateStart(
                  state.uploads.filter((item) => item.id === id)[0]
                ),
              ],
            });
            state.setPrompt("");
            const response = await studyPromptResponseRequestHandler({
              data: {
                query:
                  StudyCommands.provideExample.instruction +
                  replace(state.prompt, Commands["provide-example"], ""),
                fileId: id || state.selectedUploads[0],
              },
              fetchType: "lazy",
              isReset: true,
            });
            dispatch({
              type: ChatBotActionType.REPLACE_LAST_CONVERSATION,
              payload: provideExampleConversation.createSuccess(response),
            });
          } catch (err) {
            console.log(err);
            dispatch({
              type: ChatBotActionType.REPLACE_LAST_CONVERSATION,
              payload: provideExampleConversation.createError(),
            });
          }
        } else if (
          path.includes(routes.dashboard.study.home) &&
          !state.uploads.some((upload) => upload.id === id)
        ) {
          state.setPrompt("");
          dispatch({
            type: ChatBotActionType.ADD_CONVERSATION,
            payload: [
              promptConversation.prompt(
                state.prompt,
                Commands["provide-example"]
              ),
              uploadConversation.invalidUpload(),
            ],
          });
        } else if (stripedProvideExamplePrompt.length === 0) {
          state.setPrompt("");
          dispatch({
            type: ChatBotActionType.ADD_CONVERSATION,
            payload: [
              promptConversation.prompt(
                state.prompt,
                Commands["provide-example"]
              ),
              promptConversation.noText(),
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
              promptConversation.prompt(state.prompt),
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
