"use client";

import { createContext, useReducer } from "react";

import { generateIndexStatus, indexReducer } from "@/lib/indexReducer";
import {
  FetchActionType,
  IndexAction,
  QuizRequestDb,
  QuizTypes,
  QuizUploadsAction,
  QuizUploadsActionType,
  QuizUploadsContextProps,
  QuizUploadsState,
  Status,
} from "@/types";

const QuizUploadsContext = createContext<QuizUploadsContextProps | undefined>(
  undefined
);

const initialState: QuizUploadsState = {
  uploads: [],
  quiz: {} as QuizRequestDb,
  status: Status.IDLE,
  indexStatus: {},
  defaultQuizTypes: [QuizTypes.MCQ],
  isShowCheckbox: false,
  isShowRecentQuiz: false,
  isFlashcard: false,
};

const quizUploadsReducer = (
  state: QuizUploadsState,
  action: QuizUploadsAction
): QuizUploadsState => {
  switch (action.type) {
    case FetchActionType.FETCH_START:
      return {
        ...state,
        status: Status.PENDING,
      };
    case FetchActionType.FETCH_SUCCESS:
      return {
        ...state,
        status: Status.SUCCESS,
        uploads: action.payload,
        indexStatus:
          action.payload.length > 0 ? generateIndexStatus(action.payload) : {},
      };
    case FetchActionType.FETCH_ERROR:
      return {
        ...state,
        status: Status.ERROR,
      };
    case QuizUploadsActionType.SET_DEFAULT_QUIZ_TYPES:
      return {
        ...state,
        defaultQuizTypes: action.payload,
      };
    case QuizUploadsActionType.SET_IS_SHOW_CHECKBOX:
      return {
        ...state,
        isShowCheckbox: action.payload,
      };
    case QuizUploadsActionType.SET_IS_SHOW_RECENT_QUIZ:
      return {
        ...state,
        isShowRecentQuiz: action.payload,
      };
    case QuizUploadsActionType.SET_QUIZ:
      return {
        ...state,
        quiz: action.payload,
      };
    case QuizUploadsActionType.SET_IS_FLASHCARD:
      return {
        ...state,
        isFlashcard: action.payload,
      };
    default:
      return { ...state, ...indexReducer(state, action as IndexAction) };
  }
};

type Props = {
  children: React.ReactNode;
};

const QuizUploadsProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(quizUploadsReducer, initialState);

  return (
    <QuizUploadsContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizUploadsContext.Provider>
  );
};

export { QuizUploadsContext, QuizUploadsProvider };
