import {
  Action,
  FetchAction,
  IndexAction,
  IndexStatus,
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

export type SlideRequestDbPost = {
  name: string;
  content: string;
  topics: string[];
  uploads: UploadShallow[] | null;
};

export type SlideRequestDbPatch = {
  name: string;
  content: string;
};

export type SlideResponseDb = {
  id: string;
  name: string;
  createDate: string;
  content: string;
  topics: string[];
  uploads: UploadShallow[] | null;
};

/* ---------------------------------- Slide --------------------------------- */

export type SlideShallow = SlideResponseDb;

export type Slide = SlideShallow;

/* ------------------------------ Slide Create ------------------------------ */

export type SlideData = {
  topics: string[];
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
  | IndexAction
  | Action<CreateSlideActionType.SET_SLIDE_DATA, SlideData>
  | Action<CreateSlideActionType.SET_CONTENT, string>;

export type CreateSlideState = {
  topics: TopicShallow[];
  uploads: UploadShallow[];
  data: SlideData;
  status: Status;
  content: string | null;
  indexStatus: IndexStatus;
};

export type CreateSlideContextProps = {
  state: CreateSlideState;
  dispatch: React.Dispatch<CreateSlideAction>;
};

/* ----------------------------- Slides context ----------------------------- */

export enum SlidesActionType {
  SET_SLIDES = "SET_SLIDES",
}

export type SlidesAction =
  | FetchAction<SlideShallow[]>
  | Action<SlidesActionType.SET_SLIDES, SlideShallow[]>;

export type SlidesState = {
  slides: SlideShallow[];
  status: Status;
};

export type SlidesContextProps = {
  state: SlidesState;
  dispatch: React.Dispatch<SlidesAction>;
};
