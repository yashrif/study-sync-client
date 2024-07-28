import { QuizIntermediate } from "./quiz";

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
}
