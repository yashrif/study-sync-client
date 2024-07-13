import { QnaIntermediate } from "./qna";

export type McqRequest = {
  question: string;
  choices: string | number[];
  answers: boolean[];
};

export type McqShallow = {
  id: string;
  question: string;
  choices: string | number[];
  answers: boolean[];
  createDate: string;
};

export type McqIntermediate = McqShallow & {
  qna: string;
  lastModified: string | null;
  createdBy: string;
  lastModifiedBy: string | null;
};

export type Mcq = Omit<McqIntermediate, "qna"> & {
  qna: QnaIntermediate;
};
