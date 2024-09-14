import {
  Action,
  FetchAction,
  QuizRequestServer,
  Status,
  TopicShallow,
  UploadShallow,
} from "@allTypes";

/* --------------------------------- ChatBot -------------------------------- */

export enum ChatBotActionType {
  SET_QUIZ_DATA = "SET_QUIZ_DATA",
}

export type ChatBotAction =
  | FetchAction<UploadShallow[]>
  | FetchAction<TopicShallow[]>
  | Action<ChatBotActionType.SET_QUIZ_DATA, QuizRequestServer>;

export type ChatBotState = {
  topics: TopicShallow[];
  uploads: UploadShallow[];
  quiz: QuizRequestServer;
  status: Status;
};

export type ChatBotContextProps = {
  state: ChatBotState;
  dispatch: React.Dispatch<ChatBotAction>;
};
