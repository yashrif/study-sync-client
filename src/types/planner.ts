/* ----------------------------------- DB ----------------------------------- */

export type PlannerRequestDBPost = {
  title: string;
  topics: Topic[];
  uploads: UploadShallow[];
};

export type PlannerResponseDBPost = {
  id: string;
  title: string;
  createDate: string;
};

/* --------------------------------- Context -------------------------------- */

import {
  Action,
  FetchAction,
  IndexAction,
  IndexStatus,
  Status,
  Topic,
  TopicResponseAi,
  UploadShallow,
} from "@allTypes";

export enum PlannerActionType {
  SET_TOPICS = "SET_TOPICS",
}

export type PlannerAction =
  | FetchAction<UploadShallow[]>
  | IndexAction
  | Action<PlannerActionType.SET_TOPICS, Topic[]>;

export type PlannerState = {
  uploads: UploadShallow[];
  topics: Topic[] | undefined;
  status: Status;
  indexStatus: IndexStatus;
};

export type PlannerContextProps = {
  state: PlannerState;
  dispatch: React.Dispatch<PlannerAction>;
};
