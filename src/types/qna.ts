import { McqIntermediate, McqRequest } from "@allTypes";

/* --------------------------------- Server --------------------------------- */

export type QnaRequestServer = string[];

export type QnaResponseServer = {
  mcqs: McqRequest[];
};

/* ----------------------------------- AI ----------------------------------- */

/* ----------------------------------- DB ----------------------------------- */

export type QnaRequestDb = {
  id?: string;
  title?: string;
  mcqs: McqRequest[];
};

export type QnaShallow = {
  id: string;
  title: string | null;
  createDate: string;
};

export type QnaIntermediate = QnaShallow & {
  lastModified: string | null;
  createdBy: string;
  lastModifiedBy: string | null;
};

export type Qna = QnaIntermediate & {
  mcqs: McqIntermediate[] | null;
  cqs: string[] | null;
};

export enum Difficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}
