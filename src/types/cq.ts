import { FlashcardStatus } from "@allTypes";

/* ----------------------------------- AI ----------------------------------- */

export type CqResponseAi = {
  question: string;
  answer: string;
};

export type CqsResponseAi = {
  collection: CqResponseAi[][];
};

/* ----------------------------------- DB ----------------------------------- */

export type CqRequest = {
  id?: string;
  question: string;
  answer: string;
  isFlashcard?: boolean;
  status: FlashcardStatus | null;
};

export type CqShallow = {
  id: string;
  question: string;
  answer: string;
  isFlashcard: boolean;
  createDate: string;
  status: FlashcardStatus | null;
};

export type CqIntermediate = CqShallow & {
  quiz: string;
  lastModified: string | null;
  createdBy: string;
  lastModifiedBy: string | null;
};

export type Cq = Omit<CqIntermediate, "quiz"> & {
  quiz: CqIntermediate;
};
