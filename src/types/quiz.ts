import {
  Action,
  CqIntermediate,
  CqRequest,
  FetchAction,
  FormHandle,
  IndexStatus,
  McqIntermediate,
  McqRequest,
  Status,
  UploadShallow,
} from "@allTypes";

export enum QuizTypes {
  MCQ = "MCQ",
  CQ = "CQ",
}

/* --------------------------------- Server --------------------------------- */

export type QuizRequestServer = string[];

export type QuizResponseServer = {
  mcqs: McqRequest[];
  cqs: CqRequest[];
};

export type QuizEvaluateRequestServer = {
  rightAnswer: string;
  givenAnswer: string;
};

export type QuizEvaluateResponseServer = {
  correctness: number;
  comment: string;
};

/* ----------------------------------- AI ----------------------------------- */

export type QuizEvaluateRequestAi = QuizEvaluateRequestServer;

export type QuizEvaluateResponseAi = {
  data: QuizEvaluateResponseServer;
};

/* ----------------------------------- DB ----------------------------------- */

export type QuizRequestDb = {
  id?: string;
  title?: string;
  mcqs: McqRequest[];
  cqs: CqRequest[];
  uploads: UploadShallow[];
};

export type QuizShallow = {
  id: string;
  title: string;
  createDate: string;
};

export type QuizIntermediate = QuizShallow & {
  lastModified: string | null;
  createdBy: string;
  lastModifiedBy: string | null;
};

export type Quiz = QuizIntermediate & {
  mcqs: McqIntermediate[] | null;
  cqs: CqIntermediate[] | null;
  uploads: UploadShallow[];
};

export enum Difficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}

/* -------------------------------------------------------------------------- */
/*                                   Context                                  */
/* -------------------------------------------------------------------------- */

/* ----------------------------- QuizContext.tsx ---------------------------- */

export enum QuizActionType {
  SET_QUIZ = "SET_QUIZ",
  SET_POINTS_START = "SET_POINTS_START",
  SET_POINTS_SUCCESS = "SET_POINTS_SUCCESS",
  SET_IS_SHOW_RESULTS = "SET_IS_SHOW_RESULTS",
  SET_FORM_REF = "SET_FORM_REF",
  QUIZ_EVALUATE_START = "QUIZ_EVALUATE_START",
  QUIZ_EVALUATE_SUCCESS = "QUIZ_EVALUATE_SUCCESS",
  QUIZ_EVALUATE_ERROR = "QUIZ_EVALUATE_ERROR",
  SET_IS_SHOW_OVERVIEW = "QUIZ_IS_SHOW_OVERVIEW",
}

export type QuizAction =
  | FetchAction<Quiz>
  | Action<QuizActionType.SET_QUIZ, Quiz>
  | Action<QuizActionType.SET_POINTS_START>
  | Action<QuizActionType.SET_POINTS_SUCCESS, number>
  | Action<QuizActionType.SET_IS_SHOW_RESULTS, boolean>
  | Action<QuizActionType.QUIZ_EVALUATE_START>
  | Action<
      QuizActionType.QUIZ_EVALUATE_SUCCESS,
      {
        [key: string]: QuizEvaluateResponseServer;
      }
    >
  | Action<QuizActionType.QUIZ_EVALUATE_ERROR>
  | Action<QuizActionType.SET_IS_SHOW_OVERVIEW, boolean>;

export type QuizState = {
  quiz: Quiz;
  status: Status;
  points: number | undefined;
  isShowResults: boolean;
  formRef: React.RefObject<FormHandle>;
  cqEvaluation: {
    [key: string]: QuizEvaluateResponseServer;
  };
  isShowOverview: boolean;
  evaluateStatus: Status;
};

export type QuizContextProps = {
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
};

/* -------------------------- QuizzesContext.tsx --------------------------- */

export enum QuizzesActionType {}

export type QuizzesAction = FetchAction<QuizShallow[]>;

export type QuizzesState = {
  quizzes: QuizShallow[];
  status: Status;
  indexStatus: IndexStatus;
};

export type QuizzesContextProps = {
  state: QuizzesState;
  dispatch: React.Dispatch<QuizzesAction>;
};

/* ------------------------- QuizUploadsContext.tsx ------------------------- */

export enum QuizUploadsActionType {
  RESET_INDEX_STATUS = "RESET_INDEX_STATUS",
  INDEX_STATUS_START = "INDEX_STATUS_START",
  INDEX_STATUS_SUCCESS = "INDEX_STATUS_SUCCESS",
  INDEX_STATUS_ERROR = "INDEX_STATUS_ERROR",
  SET_UPLOAD_INDEX_TRUE = "SET_UPLOAD_INDEX_TRUE",
  SET_DEFAULT_QUIZ_TYPES = "SET_DEFAULT_QUIZ_TYPES",
  SET_IS_SHOW_CHECKBOX = "SET_IS_SHOW_CHECKBOX",
  SET_IS_SHOW_RECENT_QUIZ = "SET_IS_SHOW_RECENT_QUIZ",
  SET_QUIZ = "SET_QUIZ",
  SET_IS_FLASHCARD = "SET_IS_FLASHCARD",
}

export type QuizUploadsAction =
  | FetchAction<UploadShallow[]>
  | Action<QuizUploadsActionType.RESET_INDEX_STATUS>
  | Action<QuizUploadsActionType.INDEX_STATUS_START, string>
  | Action<QuizUploadsActionType.INDEX_STATUS_SUCCESS, string>
  | Action<QuizUploadsActionType.INDEX_STATUS_ERROR, string>
  | Action<QuizUploadsActionType.SET_UPLOAD_INDEX_TRUE, string>
  | Action<QuizUploadsActionType.SET_DEFAULT_QUIZ_TYPES, QuizTypes[]>
  | Action<QuizUploadsActionType.SET_IS_SHOW_CHECKBOX, boolean>
  | Action<QuizUploadsActionType.SET_IS_SHOW_RECENT_QUIZ, boolean>
  | Action<QuizUploadsActionType.SET_QUIZ, QuizRequestDb>
  | Action<QuizUploadsActionType.SET_IS_FLASHCARD, boolean>;

export type QuizUploadsState = {
  uploads: UploadShallow[];
  quiz: QuizRequestDb | null;
  status: Status;
  indexStatus: IndexStatus;
  defaultQuizTypes: QuizTypes[];
  isShowCheckbox: boolean;
  isShowRecentQuiz: boolean;
  isFlashcard: boolean;
};

export type QuizUploadsContextProps = {
  state: QuizUploadsState;
  dispatch: React.Dispatch<QuizUploadsAction>;
};
