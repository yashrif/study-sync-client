import { RefObject } from "react";

import {
  Action,
  FetchAction,
  Status,
  TopicShallow,
  UploadShallow,
} from "@allTypes";

/* --------------------------------- ChatBot -------------------------------- */

type Conversation = {
  type: "prompt" | "response";
  data: React.ReactNode;
};

export enum ChatBotActionType {
  SET_SELECTED_UPLOADS = "SET_SELECTED_UPLOADS",
  SET_REQUEST_STATUS = "SET_REQUEST_STATUS",
  SET_PROMPT = "SET_PROMPT",
  SET_TEXTAREA_REF = "SET_TEXTAREA_REF",
  SET_CONVERSATION = "SET_CONVERSATION",
  ADD_CONVERSATION = "ADD_CONVERSATION",
  POP_CONVERSATION = "POP_JSX_ELEMENT",
  REPLACE_LAST_CONVERSATION = "REPLACE_LAST_CONVERSATION",
}

export type ChatBotAction =
  | FetchAction<UploadShallow[]>
  | FetchAction<TopicShallow[]>
  | Action<ChatBotActionType.SET_SELECTED_UPLOADS, string[]>
  | Action<ChatBotActionType.SET_REQUEST_STATUS, Status>
  | Action<ChatBotActionType.SET_PROMPT, string>
  | Action<ChatBotActionType.SET_TEXTAREA_REF, RefObject<HTMLTextAreaElement>>
  | Action<ChatBotActionType.SET_CONVERSATION, Conversation[]>
  | Action<ChatBotActionType.ADD_CONVERSATION, Conversation[]>
  | Action<ChatBotActionType.POP_CONVERSATION>
  | Action<ChatBotActionType.REPLACE_LAST_CONVERSATION, Conversation>;

export type ChatBotState = {
  topics: TopicShallow[];
  uploads: UploadShallow[];
  selectedUploads: string[];
  prompt: string;
  textareaRef: RefObject<HTMLTextAreaElement>;
  conversation: Conversation[];
  status: Status;
  requestStatus: Status;
};

export type ChatBotContextProps = {
  state: ChatBotState;
  dispatch: React.Dispatch<ChatBotAction>;
};
