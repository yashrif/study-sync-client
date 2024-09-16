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
  PlannerRequestDBPost,
  PlannerResponseDBPost,
  Quiz,
  QuizRequestDb,
  QuizRequestServer,
  QuizResponseServer,
  Response,
  ResponseRequest,
  Status,
  TopicsResponseServer,
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
    apiCall: useCallback((data) => studySyncDB.post(dbEndpoints.cqs, data), []),
    dispatch: flashcardDbRequestDispatch,
  });

  /* --------------------------------- Planner -------------------------------- */

  const {
    state: plannerServerRequestState,
    dispatch: plannerServerRequestDispatch,
  } = useFetchState<TopicsResponseServer>();
  const { handler: plannerServerRequestHandler } = useApiHandler<
    string[],
    TopicsResponseServer
  >({
    apiCall: useCallback(
      (data) => studySyncServer.post(serverEndpoints.topics, data),
      []
    ),
    dispatch: plannerServerRequestDispatch,
  });

  const { state: plannerDbRequestState, dispatch: plannerDbRequestDispatch } =
    useFetchState<PlannerResponseDBPost>();
  const { handler: plannerDbRequestHandler } = useApiHandler<
    PlannerRequestDBPost,
    PlannerResponseDBPost
  >({
    apiCall: useCallback(
      (data) => studySyncDB.post(dbEndpoints.planners, data),

      []
    ),
    dispatch: plannerDbRequestDispatch,
  });

  /* ---------------------------- generate response --------------------------- */

  const { state: responseRequestState, dispatch: responseRequestDispatch } =
    useFetchState<Response>();
  const { handler: responseRequestHandler } = useApiHandler<
    ResponseRequest,
    Response
  >({
    apiCall: useCallback(
      (data) => studySyncServer.post(serverEndpoints.response, data),
      []
    ),
    dispatch: responseRequestDispatch,
  });

  /* --------------------------------- Status --------------------------------- */

  useEffect(() => {
    switch (true) {
      case quizServerRequestState.status === Status.IDLE &&
        quizDbRequestState.status === Status.IDLE &&
        flashcardServerRequestState.status === Status.IDLE &&
        flashcardDbRequestState.status === Status.IDLE &&
        plannerServerRequestState.status === Status.IDLE &&
        plannerDbRequestState.status === Status.IDLE &&
        responseRequestState.status === Status.IDLE:
        dispatch({
          type: ChatBotActionType.SET_REQUEST_STATUS,
          payload: Status.IDLE,
        });
        break;

      case quizServerRequestState.status === Status.PENDING ||
        quizDbRequestState.status === Status.PENDING ||
        flashcardServerRequestState.status === Status.PENDING ||
        flashcardDbRequestState.status === Status.PENDING ||
        plannerServerRequestState.status === Status.PENDING ||
        plannerDbRequestState.status === Status.PENDING ||
        responseRequestState.status === Status.PENDING:
        dispatch({
          type: ChatBotActionType.SET_REQUEST_STATUS,
          payload: Status.PENDING,
        });
        break;

      case (quizServerRequestState.status === Status.SUCCESS &&
        quizDbRequestState.status === Status.SUCCESS) ||
        (flashcardServerRequestState.status === Status.SUCCESS &&
          flashcardDbRequestState.status === Status.SUCCESS) ||
        (plannerServerRequestState.status === Status.SUCCESS &&
          plannerDbRequestState.status === Status.SUCCESS) ||
        responseRequestState.status === Status.SUCCESS:
        dispatch({
          type: ChatBotActionType.SET_REQUEST_STATUS,
          payload: Status.SUCCESS,
        });
        break;

      case quizServerRequestState.status === Status.ERROR ||
        quizDbRequestState.status === Status.ERROR ||
        flashcardServerRequestState.status === Status.ERROR ||
        flashcardDbRequestState.status === Status.ERROR ||
        plannerServerRequestState.status === Status.ERROR ||
        plannerDbRequestState.status === Status.ERROR ||
        responseRequestState.status === Status.ERROR:
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
    plannerServerRequestState.status,
    plannerDbRequestState.status,
    responseRequestState.status,
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

    plannerServerRequestHandler,
    plannerServerRequestState,
    plannerDbRequestHandler,
    plannerDbRequestState,

    responseRequestHandler,
    responseRequestState,
  };
};
