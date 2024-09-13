import { FetchAction, Status, TopicShallow, UploadShallow } from "@allTypes";

export type Slide = {};

/* ------------------------------ Slide Create ------------------------------ */

export enum CreateSlideActionType {}

export type CreateSlideAction =
  | FetchAction<TopicShallow[]>
  | FetchAction<UploadShallow[]>;

export type CreateSlideState = {
  topics: TopicShallow[];
  uploads: UploadShallow[];
  status: Status;
};

export type CreateSlideContextProps = {
  state: CreateSlideState;
  dispatch: React.Dispatch<CreateSlideAction>;
};
