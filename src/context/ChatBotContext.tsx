"use client";

import { createContext, useReducer } from "react";

import {
  ChatBotAction,
  ChatBotActionType,
  ChatBotContextProps,
  ChatBotState,
  FetchActionType,
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
  selectedUploads: [],
  prompt: "",
  textareaRef: { current: null },
  conversation: [],
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
          ? (action.payload as UploadShallow[]).filter((item) => item.isIndexed)
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
    case ChatBotActionType.SET_SELECTED_UPLOADS:
      return {
        ...state,
        selectedUploads: action.payload,
      };
    case ChatBotActionType.SET_REQUEST_STATUS:
      return {
        ...state,
        requestStatus: action.payload,
      };
    case ChatBotActionType.SET_PROMPT:
      return {
        ...state,
        prompt: action.payload,
      };
    case ChatBotActionType.SET_TEXTAREA_REF:
      return {
        ...state,
        textareaRef: action.payload,
      };
    case ChatBotActionType.SET_CONVERSATION:
      return {
        ...state,
        conversation: action.payload,
      };
    case ChatBotActionType.ADD_CONVERSATION:
      return {
        ...state,
        conversation: [...state.conversation, ...action.payload],
      };
    case ChatBotActionType.POP_CONVERSATION:
      return {
        ...state,
        conversation: state.conversation.slice(0, -1),
      };
    case ChatBotActionType.REPLACE_LAST_CONVERSATION:
      return {
        ...state,
        conversation: [
          ...state.conversation.slice(0, state.conversation.length - 1),
          action.payload,
        ],
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
