// /* --------------------------------- Context -------------------------------- */

// export enum QuizUploadsActionType {
//   RESET_INDEX_STATUS = "RESET_INDEX_STATUS",
//   INDEX_STATUS_START = "INDEX_STATUS_START",
//   INDEX_STATUS_SUCCESS = "INDEX_STATUS_SUCCESS",
//   INDEX_STATUS_ERROR = "INDEX_STATUS_ERROR",
//   SET_UPLOAD_INDEX_TRUE = "SET_UPLOAD_INDEX_TRUE",
//   SET_DEFAULT_QUIZ_TYPES = "SET_DEFAULT_QUIZ_TYPES",
//   SET_IS_SHOW_CHECKBOX = "SET_IS_SHOW_CHECKBOX",
//   SET_IS_SHOW_RECENT_QUIZ = "SET_IS_SHOW_RECENT_QUIZ",
//   SET_QUIZ = "SET_QUIZ",
//   SET_IS_FLASHCARD = "SET_IS_FLASHCARD",
// }

// export type QuizUploadsAction =
//   | FetchAction<UploadShallow[]>
//   | Action<QuizUploadsActionType.RESET_INDEX_STATUS>
//   | Action<QuizUploadsActionType.INDEX_STATUS_START, string>
//   | Action<QuizUploadsActionType.INDEX_STATUS_SUCCESS, string>
//   | Action<QuizUploadsActionType.INDEX_STATUS_ERROR, string>
//   | Action<QuizUploadsActionType.SET_UPLOAD_INDEX_TRUE, string>
//   | Action<QuizUploadsActionType.SET_DEFAULT_QUIZ_TYPES, QuizTypes[]>
//   | Action<QuizUploadsActionType.SET_IS_SHOW_CHECKBOX, boolean>
//   | Action<QuizUploadsActionType.SET_IS_SHOW_RECENT_QUIZ, boolean>
//   | Action<QuizUploadsActionType.SET_QUIZ, QuizRequestDb>
//   | Action<QuizUploadsActionType.SET_IS_FLASHCARD, boolean>;

// export type QuizUploadsState = {
//   uploads: UploadShallow[];
//   quiz: QuizRequestDb | null;
//   status: Status;
//   indexStatus: IndexStatus;
//   defaultQuizTypes: QuizTypes[];
//   isShowCheckbox: boolean;
//   isShowRecentQuiz: boolean;
//   isFlashcard: boolean;
// };

// export type QuizUploadsContextProps = {
//   state: QuizUploadsState;
//   dispatch: React.Dispatch<QuizUploadsAction>;
// };
