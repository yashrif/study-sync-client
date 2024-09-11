"use client";

import { createContext, useReducer } from "react";

import {
  FetchActionType,
  QuizzesAction,
  QuizzesActionType,
  QuizzesContextProps,
  QuizzesState,
  Status,
} from "@/types";

const QuizzesContext = createContext<QuizzesContextProps | undefined>(
  undefined
);

const initialState: QuizzesState = {
  quizzes: [],
  status: Status.IDLE,
  indexStatus: {},
};

const quizzesReducer = (
  state: QuizzesState,
  action: QuizzesAction
): QuizzesState => {
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
        quizzes: action.payload,
      };
    case FetchActionType.FETCH_ERROR:
      return {
        ...state,
        status: Status.ERROR,
      };
    case QuizzesActionType.SET_QUIZZES:
      return {
        ...state,
        quizzes: action.payload,
      };
    default:
      return state;
  }
};

type Props = {
  children: React.ReactNode;
};

const QuizzesProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(quizzesReducer, initialState);

  return (
    <QuizzesContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizzesContext.Provider>
  );
};

export { QuizzesContext, QuizzesProvider };
