export type CqRequest = {
  id?: string;
  question: string;
  answer: string;
  isFlashcard?: boolean;
};

export type CqShallow = {
  id: string;
  question: string;
  answer: string;
  isFlashcard: boolean;
  createDate: string;
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

export enum CqStatus {
  FORGOTTEN = "FORGOTTEN",
  TOOK_A_WHILE_TO_REMEMBER = "TOOK_A_WHILE_TO_REMEMBER",
  REMEMBERED = "REMEMBERED",
}
