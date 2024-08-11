export type TopicRecord = {
  status: TopicStatus;
  date: string;
};

export type TopicSimple = { name: string; description: string; color: string };

export enum TopicStatus {
  WEAK = "WEAK",
  MODERATE = "MODERATE",
  CONFIDENT = "CONFIDENT",
}

/* ----------------------------------- AI ----------------------------------- */

export type TopicResponseAi = { name: string; desciption: string };

export type TopicsResponseAi = {
  collectionName: string;
  collection: TopicResponseAi[][];
};

/* --------------------------------- Server --------------------------------- */

export type TopicsResponseServer = {
  name: string;
  topics: TopicSimple[];
};

/* ----------------------------------- DB ----------------------------------- */

export type TopicRequestDBPost = TopicSimple & {
  status?: TopicStatus;
};

/* ---------------------------------- Topic --------------------------------- */

export type TopicShallow = TopicSimple & {
  id: string;
  createDate: string;
};

export type TopicIntermediate = TopicShallow & {
  lastModified: string | null;
  createdBy: string;
  lastModifiedBy: string | null;
  planner: string;
  status: TopicStatus;
};

export type Topic = TopicIntermediate & {
  records: TopicRecord[];
};
