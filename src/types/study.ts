import { FetchAction } from "./api";
import { Action } from "./context";
import { Status } from "./status";
import { FileTypes, UploadShallow } from "./upload";

export type StudyShallow = {
  id: string;
  title: string;
  name: string;
  type: FileTypes;
  createDate: string;
  isIndexed: boolean;
};

/* -------------------------------------------------------------------------- */
/*                                   context                                  */
/* -------------------------------------------------------------------------- */

export enum StudyActionType {
  SET_STUDY = "SET_STUDY",
  SET_SELECTED_TEXT = "SET_SELECTED_TEXT"
}

export type StudyAction =
  | FetchAction<StudyShallow[]>
  | Action<StudyActionType.SET_STUDY, string>
  | Action<StudyActionType.SET_SELECTED_TEXT, string>


export type StudyState = {
  uploads: StudyShallow[];
  status: Status;
  currentStudy: string;
  selectedText: string;
};

export type StudyContextProps = {
  state: StudyState;
  dispatch: React.Dispatch<StudyAction>;
};



