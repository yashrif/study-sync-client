import { useCallback, useEffect } from "react";

import studySyncDB from "@/api/studySyncDB";
import studySyncServer from "@/api/studySyncServer";
import { dbEndpoints, serverEndpoints } from "@/assets/data/api";
import { useChatBotContext } from "@/hooks/ChatBotContext";
import { useFetchState } from "@/hooks/fetchData";
import { useApiHandler } from "@/hooks/useApiHandler";
import {
  ChatBotActionType,
  Cq,
  CqRequest,
  Quiz,
  QuizRequestDb,
  QuizRequestServer,
  QuizResponseServer,
  Status,
} from "@/types";

export const useHandlers = () => {
  const { dispatch } = useChatBotContext();

  /* ---------------------------------- Quiz ---------------------------------- */

  const { state: quizServerRequestState, dispatch: quizServerRequestDispatch } =
    useFetchState<QuizResponseServer>();
  const { handler: quizServerRequestHandler } = useApiHandler<
    QuizRequestServer,
    QuizResponseServer
  >({
    apiCall: useCallback(
      (data) => studySyncServer.post(serverEndpoints.quizzes, data),
      []
    ),
    dispatch: quizServerRequestDispatch,
  });

  const { state: quizDbRequestState, dispatch: quizDbRequestDispatch } =
    useFetchState<Quiz>();
  const { handler: quizDbRequestHandler } = useApiHandler<QuizRequestDb, Quiz>({
    apiCall: useCallback(
      (data) => studySyncDB.post(dbEndpoints.quizzes, data),
      []
    ),

    dispatch: quizDbRequestDispatch,
  });

  /* -------------------------------- Flashcard ------------------------------- */

  const {
    state: flashcardServerRequestState,
    dispatch: flashcardServerRequestDispatch,
  } = useFetchState<QuizResponseServer>();
  const { handler: flashcardServerRequestHandler } = useApiHandler<
    QuizRequestServer,
    QuizResponseServer
  >({
    apiCall: useCallback(
      (data) => studySyncServer.post(serverEndpoints.quizzes, data),
      []
    ),
    dispatch: flashcardServerRequestDispatch,
  });

  const {
    state: flashcardDbRequestState,
    dispatch: flashcardDbRequestDispatch,
  } = useFetchState<Cq>();
  const { handler: flashcardDbRequestHandler } = useApiHandler<CqRequest, Cq>({
    apiCall: useCallback(
      (data) => studySyncDB.post(dbEndpoints.cqs, data),
      []
    ),
    dispatch: flashcardDbRequestDispatch,
  });

  /* --------------------------------- Status --------------------------------- */

  useEffect(() => {
    switch (true) {
      case quizServerRequestState.status === Status.IDLE &&
        quizDbRequestState.status === Status.IDLE &&
        flashcardServerRequestState.status === Status.IDLE &&
        flashcardDbRequestState.status === Status.IDLE:
        dispatch({
          type: ChatBotActionType.SET_REQUEST_STATUS,
          payload: Status.IDLE,
        });
        break;
      case quizServerRequestState.status === Status.PENDING ||
        quizDbRequestState.status === Status.PENDING ||
        flashcardServerRequestState.status === Status.PENDING ||
        flashcardDbRequestState.status === Status.PENDING:
        dispatch({
          type: ChatBotActionType.SET_REQUEST_STATUS,
          payload: Status.PENDING,
        });
        break;
      case (quizServerRequestState.status === Status.SUCCESS &&
        quizDbRequestState.status === Status.SUCCESS) ||
        (flashcardServerRequestState.status === Status.SUCCESS &&
          flashcardDbRequestState.status === Status.SUCCESS):
        dispatch({
          type: ChatBotActionType.SET_REQUEST_STATUS,
          payload: Status.SUCCESS,
        });
        break;
      case quizServerRequestState.status === Status.ERROR ||
        quizDbRequestState.status === Status.ERROR ||
        flashcardServerRequestState.status === Status.ERROR ||
        flashcardDbRequestState.status === Status.ERROR:
        dispatch({
          type: ChatBotActionType.SET_REQUEST_STATUS,
          payload: Status.ERROR,
        });
        break;
      default:
        dispatch({
          type: ChatBotActionType.SET_REQUEST_STATUS,
          payload: Status.IDLE,
        });
    }
  }, [
    quizServerRequestState.status,
    quizDbRequestState.status,
    dispatch,
    flashcardServerRequestState.status,
    flashcardDbRequestState.status,
  ]);

  return {
    quizServerRequestHandler,
    quizServerRequestState,
    quizDbRequestHandler,
    quizDbRequestState,

    flashcardServerRequestHandler,
    flashcardServerRequestState,
    flashcardDbRequestHandler,
    flashcardDbRequestState,
  };
};
