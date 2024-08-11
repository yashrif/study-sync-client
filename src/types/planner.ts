/* ----------------------------------- DB ----------------------------------- */

export type PlannerRequestDBPost = {
  title: string;
  topics: TopicSimple[];
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

export type Planner = Omit<PlannerShallow, "topics"> & {
  topics: Topic[];
  uploads: UploadShallow[];
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
  TopicSimple,
  UploadShallow,
} from "@allTypes";

export enum PlannerUploadsActionType {
  SET_TOPICS = "SET_TOPICS",
}

export type PlannerUploadsAction =
  | FetchAction<UploadShallow[]>
  | IndexAction
  | Action<PlannerUploadsActionType.SET_TOPICS, TopicSimple[]>;

export type PlannerUploadsState = {
  uploads: UploadShallow[];
  topics: TopicSimple[] | undefined;
  status: Status;
  indexStatus: IndexStatus;
};

export type PlannerUploadsContextProps = {
  state: PlannerUploadsState;
  dispatch: React.Dispatch<PlannerUploadsAction>;
};

/* --------------------------------- Planner -------------------------------- */

export enum PlannerActionType {
  SET_PLANNER = "SET_PLANNER",
}

export type PlannerAction =
  | FetchAction<Planner>
  | Action<PlannerActionType.SET_PLANNER, Planner>;

export type PlannerState = {
  planner: Planner;
  status: Status;
};

export type PlannerContextProps = {
  state: PlannerState;
  dispatch: React.Dispatch<PlannerAction>;
};
