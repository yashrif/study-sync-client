"use client";

import { createContext, useReducer } from "react";

import {
  CreateSlideAction,
  CreateSlideActionType,
  CreateSlideContextProps,
  CreateSlideState,
  FetchActionType,
  SlideData,
  Status,
  TopicShallow,
  UploadShallow,
} from "@/types";

const CreateSlideContext = createContext<CreateSlideContextProps | undefined>(
  undefined
);

const initialState: CreateSlideState = {
  topics: [],
  uploads: [],
  data: {} as SlideData,
  status: Status.IDLE,
};

const createSlideReducer = (
  state: CreateSlideState,
  action: CreateSlideAction
): CreateSlideState => {
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
        uploads: action.payload.every(
          (item) => "type" in item || "isIndexed" in item
        )
          ? (action.payload as UploadShallow[])
          : state.uploads,
        topics: action.payload.every(
          (item) => !("type" in item) && !("isIndexed" in item)
        )
          ? (action.payload as TopicShallow[])
          : state.topics,
      };
    case FetchActionType.FETCH_ERROR:
      return {
        ...state,
        status: Status.ERROR,
      };
    case FetchActionType.FETCH_RESET:
      return {
        ...state,
        status: Status.IDLE,
        uploads:
          action.payload &&
          action.payload.every((item) => "type" in item || "isIndexed" in item)
            ? (action.payload as UploadShallow[])
            : state.uploads,
        topics:
          action.payload &&
          action.payload.every(
            (item) => !("type" in item) && !("isIndexed" in item)
          )
            ? (action.payload as TopicShallow[])
            : state.topics,
      };
    case CreateSlideActionType.SET_SLIDE_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

type Props = {
  children: React.ReactNode;
};

const CreateSlideProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(createSlideReducer, initialState);

  return (
    <CreateSlideContext.Provider value={{ state, dispatch }}>
      {children}
    </CreateSlideContext.Provider>
  );
};

export { CreateSlideContext, CreateSlideProvider };
