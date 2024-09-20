import { useCallback, useEffect } from "react";

import studySyncDB from "@/api/studySyncDB";
import studySyncServer from "@/api/studySyncServer";
import { dbEndpoints, serverEndpoints } from "@/assets/data/api";
import { useFetchState } from "@/hooks/fetchData";
import { useApiHandler } from "@/hooks/useApiHandler";
import { useChatBotContext } from "@/hooks/useChatBotContext";
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
  SlideRequestDbPost,
  SlideResponseDb,
  SlideResponseServer,
  Status,
  StudyPromptRequestServer,
  StudyPromptResponseServer,
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

  /* ---------------------------------- Slide --------------------------------- */

  const {
    state: slideServerRequestState,
    dispatch: slideServerRequestDispatch,
  } = useFetchState<SlideResponseServer>();
  const { handler: slideServerRequestHandler } = useApiHandler<
    string[],
    SlideResponseServer
  >({
    apiCall: useCallback(
      (data) => studySyncServer.post(serverEndpoints.slides, data),
      []
    ),
    dispatch: slideServerRequestDispatch,
  });

  const { state: slideDbRequestState, dispatch: slideDbRequestDispatch } =
    useFetchState<SlideResponseDb>();
  const { handler: slideDbRequestHandler } = useApiHandler<
    SlideRequestDbPost,
    SlideResponseDb
  >({
    apiCall: useCallback(
      (data) => studySyncDB.post(dbEndpoints.slides, data),

      []
    ),
    dispatch: slideDbRequestDispatch,
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

  /* --------------------------------- Explain -------------------------------- */

  const {
    state: studyPromptRequestState,
    dispatch: studyPromptRequestDispatch,
  } = useFetchState<StudyPromptResponseServer>();
  const { handler: studyPromptRequestHandler } = useApiHandler<
    StudyPromptRequestServer,
    StudyPromptResponseServer
  >({
    apiCall: useCallback(
      (data) => studySyncServer.post(serverEndpoints.queryIndexedFile, data),
      []
    ),
    dispatch: studyPromptRequestDispatch,
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
        responseRequestState.status === Status.IDLE &&
        studyPromptRequestState.status === Status.IDLE &&
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
        responseRequestState.status === Status.PENDING ||
        studyPromptRequestState.status === Status.PENDING ||
        slideServerRequestState.status === Status.PENDING:
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
        responseRequestState.status === Status.SUCCESS ||
        studyPromptRequestState.status === Status.SUCCESS ||
        (slideServerRequestState.status === Status.SUCCESS &&
          slideDbRequestState.status === Status.SUCCESS):
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
        responseRequestState.status === Status.ERROR ||
        studyPromptRequestState.status === Status.ERROR ||
        slideServerRequestState.status === Status.ERROR ||
        slideDbRequestState.status === Status.ERROR:
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
    studyPromptRequestState.status,
    slideServerRequestState.status,
    slideDbRequestState.status,
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

    studyPromptRequestHandler,
    studyPromptRequestState,

    slideServerRequestHandler,
    slideServerRequestState,
    slideDbRequestHandler,
    slideDbRequestState,
  };
};
