import { RefObject } from "react";

import {
  Action,
  FetchAction,
  Status,
  TopicShallow,
  UploadShallow,
} from "@allTypes";

/* --------------------------------- ChatBot -------------------------------- */

export enum ChatBotActionType {
  SET_SELECTED_UPLOADS = "SET_SELECTED_UPLOADS",
  SET_REQUEST_STATUS = "SET_REQUEST_STATUS",
  SET_PROMPT = "SET_PROMPT",
  SET_TEXTAREA_REF = "SET_TEXTAREA_REF",
}

export type ChatBotAction =
  | FetchAction<UploadShallow[]>
  | FetchAction<TopicShallow[]>
  | Action<ChatBotActionType.SET_SELECTED_UPLOADS, string[]>
  | Action<ChatBotActionType.SET_REQUEST_STATUS, Status>
  | Action<ChatBotActionType.SET_PROMPT, string>
  | Action<ChatBotActionType.SET_TEXTAREA_REF, RefObject<HTMLTextAreaElement>>;

export type ChatBotState = {
  topics: TopicShallow[];
  uploads: UploadShallow[];
  selectedUploads: string[];
  prompt: string;
  textareaRef: RefObject<HTMLTextAreaElement>;
  status: Status;
  requestStatus: Status;
};

export type ChatBotContextProps = {
  state: ChatBotState;
  dispatch: React.Dispatch<ChatBotAction>;
};
