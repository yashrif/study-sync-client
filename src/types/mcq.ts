import { QuizIntermediate } from "./quiz";

/* ----------------------------------- AI ----------------------------------- */

export type McqResponseAi = {
  question: string;
  choice: string[] | number[];
  isChoiceAnswer: boolean[];
};

export type McqsResponseAi = {
  collection: McqResponseAi[][];
};

/* ----------------------------------- DB ----------------------------------- */

export type McqRequest = {
  id?: string;
  question: string;
  choices: string[] | number[];
  answers: boolean[];
};

export type McqShallow = {
  id: string;
  question: string;
  choices: string[] | number[];
  answers: boolean[];
  createDate: string;
};

export type McqIntermediate = McqShallow & {
  quiz: string;
  lastModified: string | null;
  createdBy: string;
  lastModifiedBy: string | null;
};

export type Mcq = Omit<McqIntermediate, "quiz"> & {
  quiz: QuizIntermediate;
};

export enum Choices {
  A,
  B,
  C,
  D,
  E,
  F,
  G,
  H,
  I,
  J,
  K,
  L,
  M,
  N,
  O,
  P,
  Q,
  R,
  S,
  T,
  U,
  V,
  W,
  X,
  Y,
  Z,
}
