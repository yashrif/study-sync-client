import { FormHandle } from "@/app/dashboard/types/form-handle";
import { McqIntermediate, McqRequest, Status } from "@allTypes";

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
  cqs: string[] | null;
};

export enum Difficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}

/* --------------------------------- Context -------------------------------- */

type Action<T, P = void> = P extends void
  ? { type: T }
  : { type: T; payload: P };

export enum QuizActionType {
  FETCH_START = "FETCH_START",
  FETCH_SUCCESS = "FETCH_SUCCESS",
  FETCH_ERROR = "FETCH_ERROR",
  FETCH_RESET = "FETCH_RESET",
  SET_DIFFICULTY = "SET_DIFFICULTY",
  SET_QUIZ = "SET_QUIZ",
  SET_POINTS = "SET_POINTS",
  SET_IS_SHOW_RESULTS = "SET_IS_SHOW_RESULTS",
  SET_FORM_REF = "SET_FORM_REF",
}

export type QuizAction =
  | Action<QuizActionType.FETCH_START>
  | Action<QuizActionType.FETCH_SUCCESS, Quiz>
  | Action<QuizActionType.FETCH_ERROR>
  | Action<QuizActionType.FETCH_RESET>
  | Action<QuizActionType.SET_DIFFICULTY, Difficulty>
  | Action<QuizActionType.SET_QUIZ, Quiz>
  | Action<QuizActionType.SET_POINTS, number>
  | Action<QuizActionType.SET_IS_SHOW_RESULTS, boolean>;

export type QuizState = {
  quiz: Quiz;
  status: Status;
  difficulty: Difficulty;
  points: number | undefined;
  isShowResults: boolean;
  formRef: React.RefObject<FormHandle>;
};

export type QuizContextProps = {
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
};
