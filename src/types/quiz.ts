import { McqIntermediate, McqRequest } from "@allTypes";

/* --------------------------------- Server --------------------------------- */

export type QuizRequestServer = string[];

export type QuizResponseServer = {
  mcqs: McqRequest[];
};

/* ----------------------------------- AI ----------------------------------- */

/* ----------------------------------- DB ----------------------------------- */

export type QuizRequestDb = {
  id?: string;
  title?: string;
  mcqs: McqRequest[];
};

export type QuizShallow = {
  id: string;
  title: string | null;
  createDate: string;
};

export type QuizIntermediate = QuizShallow & {
  lastModified: string | null;
  createdBy: string;
  lastModifiedBy: string | null;
};

export type Quiz = QuizIntermediate & {
  mcqs: McqIntermediate[] | null;
  cqs: string[] | null;
};

export enum Difficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}
