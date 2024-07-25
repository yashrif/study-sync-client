export type CqRequest = {
  question: string;
  answer: string;
};

export type CqShallow = {
  id: string;
  question: string;
  answer: string;
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
