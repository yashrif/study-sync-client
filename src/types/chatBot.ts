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
}

export type ChatBotAction =
  | FetchAction<UploadShallow[]>
  | FetchAction<TopicShallow[]>
  | Action<ChatBotActionType.SET_SELECTED_UPLOADS, string[]>
  | Action<ChatBotActionType.SET_REQUEST_STATUS, Status>;

export type ChatBotState = {
  topics: TopicShallow[];
  uploads: UploadShallow[];
  selectedUploads: string[];
  status: Status;
  requestStatus: Status;
};

export type ChatBotContextProps = {
  state: ChatBotState;
  dispatch: React.Dispatch<ChatBotAction>;
};
