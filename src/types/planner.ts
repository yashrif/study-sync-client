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

/* --------------------------------- Planner -------------------------------- */

export type PlannerTopic = {
  id: string;
  name: string;
  color: string;
};

export type PlannerShallow = {
  id: string;
  title: string;
  topics: PlannerTopic[];
  createDate: string;
};

/* -------------------------------------------------------------------------- */
/*                                   Context                                  */
/* -------------------------------------------------------------------------- */

/* ----------------------------- Planner Uploads ---------------------------- */

import {
  Action,
  FetchAction,
  IndexAction,
  IndexStatus,
  Status,
  Topic,
  UploadShallow,
} from "@allTypes";

export enum PlannerUploadsActionType {
  SET_TOPICS = "SET_TOPICS",
}

export type PlannerUploadsAction =
  | FetchAction<UploadShallow[]>
  | IndexAction
  | Action<PlannerUploadsActionType.SET_TOPICS, Topic[]>;

export type PlannerUploadsState = {
  uploads: UploadShallow[];
  topics: Topic[] | undefined;
  status: Status;
  indexStatus: IndexStatus;
};

export type PlannerUploadsContextProps = {
  state: PlannerUploadsState;
  dispatch: React.Dispatch<PlannerUploadsAction>;
};

/* --------------------------------- Planner -------------------------------- */

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
