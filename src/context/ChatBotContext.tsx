"use client";

import { createContext, useReducer } from "react";

import {
  ChatBotAction,
  ChatBotActionType,
  ChatBotContextProps,
  ChatBotState,
  FetchActionType,
  QuizTypes,
  Status,
  TopicShallow,
  UploadShallow,
} from "@/types";

const ChatBotContext = createContext<ChatBotContextProps | undefined>(
  undefined
);

const initialState: ChatBotState = {
  topics: [],
  uploads: [],
  quiz: {
    ids: [],
    types: [QuizTypes.CQ, QuizTypes.MCQ],
  },
  status: Status.IDLE,
  requestStatus: Status.IDLE,
};

const createSlideReducer = (
  state: ChatBotState,
  action: ChatBotAction
): ChatBotState => {
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
    case ChatBotActionType.SET_QUIZ_DATA:
      return {
        ...state,
        quiz: action.payload,
      };
    case ChatBotActionType.SET_REQUEST_STATUS:
      return {
        ...state,
        requestStatus: action.payload,
      };
    default:
      return state;
  }
};

type Props = {
  children: React.ReactNode;
};

const ChatBotProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(createSlideReducer, initialState);

  return (
    <ChatBotContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatBotContext.Provider>
  );
};

export { ChatBotContext, ChatBotProvider };
