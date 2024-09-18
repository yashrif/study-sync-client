/* ----------------------------------- AI ----------------------------------- */

export type StudyPromptRequestAi = {
  query: string;
  fileId: string;
};

export type StudyPromptResponseAi = string;

/* --------------------------------- Server --------------------------------- */

export type StudyPromptRequestServer = StudyPromptRequestAi;

export type StudyPromptResponseServer = StudyPromptResponseAi;
