export type Topic = { name: string; description: string; color: string };

enum TopicStatus {
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
  topics: Topic[];
};

/* ----------------------------------- DB ----------------------------------- */

export type TopicRequestDBPost = Topic & {
  status?: TopicStatus;
};
