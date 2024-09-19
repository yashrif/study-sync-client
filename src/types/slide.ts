import {
  Action,
  FetchAction,
  Status,
  TopicShallow,
  UploadShallow,
} from "@allTypes";

/* ----------------------------------- AI ----------------------------------- */

export type SlideRequestAI = {
  topicList: string[];
  fileId: string[];
};

export type SlideResponseAI = {
  content: string;
  name: string | null;
  id: string;
  example: boolean;
};

/* --------------------------------- Server --------------------------------- */

export type SlideRequestServer = SlideRequestAI;

export type SlideResponseServer = string;

/* ----------------------------------- DB ----------------------------------- */

/* ---------------------------------- Slide --------------------------------- */

export type Slide = {};

/* ------------------------------ Slide Create ------------------------------ */

export type SlideData = {
  topics: string[];
  uploads: string[];
  prompt: string;
  webSearch: boolean;
};

export enum CreateSlideActionType {
  SET_SLIDE_DATA = "SET_SLIDE_DATA",
  SET_CONTENT = "SET_CONTENT",
}

export type CreateSlideAction =
  | FetchAction<TopicShallow[]>
  | FetchAction<UploadShallow[]>
  | Action<CreateSlideActionType.SET_SLIDE_DATA, SlideData>
  | Action<CreateSlideActionType.SET_CONTENT, string>;

export type CreateSlideState = {
  topics: TopicShallow[];
  uploads: UploadShallow[];
  data: SlideData;
  status: Status;
  content: string | null;
};

export type CreateSlideContextProps = {
  state: CreateSlideState;
  dispatch: React.Dispatch<CreateSlideAction>;
};
