import { FormHandle } from "@/app/dashboard/types/form-handle";
import {
  CqIntermediate,
  CqRequest,
  FetchAction,
  IndexStatus,
  McqIntermediate,
  McqRequest,
  Status,
  UploadSimple,
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

type Action<T, P = void> = P extends void
  ? { type: T }
  : { type: T; payload: P };

export enum QuizActionType {
  SET_DIFFICULTY = "SET_DIFFICULTY",
  SET_QUIZ = "SET_QUIZ",
  SET_POINTS = "SET_POINTS",
  SET_IS_SHOW_RESULTS = "SET_IS_SHOW_RESULTS",
  SET_FORM_REF = "SET_FORM_REF",
  QUIZ_EVALUATE_START = "QUIZ_EVALUATE_START",
  QUIZ_EVALUATE_SUCCESS = "QUIZ_EVALUATE_SUCCESS",
  QUIZ_EVALUATE_ERROR = "QUIZ_EVALUATE_ERROR",
}

export type QuizAction =
  | (FetchAction<Quiz> | Action<QuizActionType.SET_DIFFICULTY, Difficulty>)
  | Action<QuizActionType.SET_QUIZ, Quiz>
  | Action<QuizActionType.SET_POINTS, number>
  | Action<QuizActionType.SET_IS_SHOW_RESULTS, boolean>
  | Action<QuizActionType.QUIZ_EVALUATE_START>
  | Action<
      QuizActionType.QUIZ_EVALUATE_SUCCESS,
      {
        [key: string]: QuizEvaluateResponseServer;
      }
    >
  | Action<QuizActionType.QUIZ_EVALUATE_ERROR>;

export type QuizState = {
  quiz: Quiz;
  status: Status;
  difficulty: Difficulty;
  points: number | undefined;
  isShowResults: boolean;
  formRef: React.RefObject<FormHandle>;
  cqEvaluation: {
    [key: string]: QuizEvaluateResponseServer;
  };
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
}

export type QuizUploadsAction =
  | FetchAction<UploadSimple[]>
  | Action<QuizUploadsActionType.RESET_INDEX_STATUS>
  | Action<QuizUploadsActionType.INDEX_STATUS_START, string>
  | Action<QuizUploadsActionType.INDEX_STATUS_SUCCESS, string>
  | Action<QuizUploadsActionType.INDEX_STATUS_ERROR, string>
  | Action<QuizUploadsActionType.SET_UPLOAD_INDEX_TRUE, string>;

export type QuizUploadsState = {
  uploads: UploadSimple[];
  status: Status;
  indexStatus: IndexStatus;
};

export type QuizUploadsContextProps = {
  state: QuizUploadsState;
  dispatch: React.Dispatch<QuizUploadsAction>;
};
