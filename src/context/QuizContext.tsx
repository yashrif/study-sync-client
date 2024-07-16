"use client";

import {
  Difficulty,
  FetchActionType,
  Quiz,
  QuizAction,
  QuizActionType,
  QuizContextProps,
  QuizState,
  Status,
} from "@/types";
import { createContext, useReducer } from "react";

const QuizContext = createContext<QuizContextProps | undefined>(undefined);

const initialState: QuizState = {
  quiz: {} as Quiz,
  status: Status.IDLE,
  difficulty: Difficulty.MEDIUM,
  points: undefined,
  isShowResults: false,
  formRef: { current: null },
};

const quizReducer = (state: QuizState, action: QuizAction): QuizState => {
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
        quiz: action.payload,
      };
    case FetchActionType.FETCH_ERROR:
      return {
        ...state,
        status: Status.ERROR,
      };
    case QuizActionType.SET_DIFFICULTY:
      return {
        ...state,
        difficulty: action.payload,
      };
    case QuizActionType.SET_QUIZ:
      return {
        ...state,
        quiz: action.payload,
      };
    case QuizActionType.SET_POINTS:
      return {
        ...state,
        points: action.payload,
      };
    case QuizActionType.SET_IS_SHOW_RESULTS:
      return {
        ...state,
        isShowResults: action.payload,
      };
    default:
      return state;
  }
};

type Props = {
  children: React.ReactNode;
};

const QuizProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};

export { QuizContext, QuizProvider };
