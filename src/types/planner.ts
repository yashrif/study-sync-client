/* --------------------------------- Context -------------------------------- */

import {
  FetchAction,
  IndexAction,
  IndexStatus,
  Status,
  UploadShallow,
} from "@allTypes";

export enum PlannerActionType {}

export type PlannerAction = FetchAction<UploadShallow[]> | IndexAction;

export type PlannerState = {
  uploads: UploadShallow[];
  status: Status;
  indexStatus: IndexStatus;
};

export type PlannerContextProps = {
  state: PlannerState;
  dispatch: React.Dispatch<PlannerAction>;
};
