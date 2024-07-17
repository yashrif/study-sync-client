"use client";

import {
  FetchActionType,
  IndexStatus,
  QuizUploadsAction,
  QuizUploadsActionType,
  QuizUploadsContextProps,
  QuizUploadsState,
  Status,
  UploadSimple,
} from "@/types";
import { createContext, useReducer } from "react";

const QuizUploadsContext = createContext<QuizUploadsContextProps | undefined>(
  undefined
);

const initialState: QuizUploadsState = {
  uploads: [],
  status: Status.IDLE,
  indexStatus: {},
};

const generateIndexStatus = (uploads: UploadSimple[]) => {
  const newUploads: IndexStatus = {};

  uploads.forEach((upload) => {
    newUploads[upload.id] = upload.isIndexed ? Status.SUCCESS : Status.IDLE;
  });

  return newUploads;
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
    case QuizUploadsActionType.RESET_INDEX_STATUS:
      return {
        ...state,
        indexStatus:
          state.uploads.length > 0 ? generateIndexStatus(state.uploads) : {},
      };
    case QuizUploadsActionType.INDEX_STATUS_START:
      return {
        ...state,
        indexStatus: {
          ...state.indexStatus,
          [action.payload]: Status.PENDING,
        },
      };
    case QuizUploadsActionType.INDEX_STATUS_SUCCESS:
      return {
        ...state,
        indexStatus: {
          ...state.indexStatus,
          [action.payload]: Status.SUCCESS,
        },
      };
    case QuizUploadsActionType.INDEX_STATUS_ERROR:
      return {
        ...state,
        indexStatus: {
          ...state.indexStatus,
          [action.payload]: Status.ERROR,
        },
      };
    case QuizUploadsActionType.SET_UPLOAD_INDEX_TRUE:
      return {
        ...state,
        uploads: state.uploads.map((upload) =>
          upload.id === action.payload ? { ...upload, isIndexed: true } : upload
        ),
      };
    default:
      return state;
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