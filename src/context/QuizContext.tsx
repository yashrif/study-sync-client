"use client";

import { createContext, useReducer } from "react";

import {
  FetchActionType,
  Quiz,
  QuizAction,
  QuizActionType,
  QuizContextProps,
  QuizState,
  Status,
} from "@/types";

const QuizContext = createContext<QuizContextProps | undefined>(undefined);

const initialState: QuizState = {
  quiz: {} as Quiz,
  status: Status.IDLE,
  points: undefined,
  isShowResults: false,
  formRef: { current: null },
  cqEvaluation: {},
  isShowOverview: true,
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
    case QuizActionType.SET_QUIZ:
      return {
        ...state,
        quiz: action.payload,
      };
    case QuizActionType.SET_POINTS_START:
      return {
        ...state,
        status: Status.PENDING,
      };
    case QuizActionType.SET_POINTS_SUCCESS:
      return {
        ...state,
        status: Status.SUCCESS,
        points: action.payload,
      };
    case QuizActionType.SET_IS_SHOW_RESULTS:
      return {
        ...state,
        isShowResults: action.payload,
      };
    case QuizActionType.QUIZ_EVALUATE_START:
      return {
        ...state,
        status: Status.PENDING,
      };
    case QuizActionType.QUIZ_EVALUATE_SUCCESS:
      return {
        ...state,
        status: Status.SUCCESS,
        cqEvaluation: action.payload,
      };
    case QuizActionType.QUIZ_EVALUATE_ERROR:
      return {
        ...state,
        status: Status.ERROR,
      };
    case QuizActionType.SET_IS_SHOW_OVERVIEW:
      return {
        ...state,
        isShowOverview: action.payload,
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
