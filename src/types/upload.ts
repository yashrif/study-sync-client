import { Action, FetchAction, Status } from "@allTypes";

export enum FileTypes {
  PDF = "application/pdf",
  JPG = "image/jpg",
  JPEG = "image/jpeg",
  PNG = "image/png",
  DOC = "application/msword",
  PPT = "application/vnd.ms-powerpoint",
}

export type UploadShallow = {
  id: string;
  title: string;
  name: string;
  type: FileTypes;
  createDate: string;
  isIndexed: boolean;
};

export type Upload = UploadShallow;

export type IndexStatus = {
  [key: string]: Status;
};

/* -------------------------------------------------------------------------- */
/*                                   context                                  */
/* -------------------------------------------------------------------------- */

export enum UploadsActionType {
  SET_UPLOADS = "SET_UPLOADS",
}

export type UploadsAction =
  | FetchAction<UploadShallow[]>
  | Action<UploadsActionType.SET_UPLOADS, UploadShallow[]>;

export type UploadsState = {
  uploads: UploadShallow[];
  status: Status;
};

export type UploadsContextProps = {
  state: UploadsState;
  dispatch: React.Dispatch<UploadsAction>;
};

/* -------------------------------- indexing -------------------------------- */

export enum IndexActionType {
  RESET_INDEX_STATUS = "RESET_INDEX_STATUS",
  INDEX_STATUS_START = "INDEX_STATUS_START",
  INDEX_STATUS_SUCCESS = "INDEX_STATUS_SUCCESS",
  INDEX_STATUS_ERROR = "INDEX_STATUS_ERROR",
  SET_UPLOAD_INDEX_TRUE = "SET_UPLOAD_INDEX_TRUE",
}

export type IndexAction =
  | Action<IndexActionType.RESET_INDEX_STATUS>
  | Action<IndexActionType.INDEX_STATUS_START, string>
  | Action<IndexActionType.INDEX_STATUS_SUCCESS, string>
  | Action<IndexActionType.INDEX_STATUS_ERROR, string>
  | Action<IndexActionType.SET_UPLOAD_INDEX_TRUE, string>;

export type IndexState = {
  uploads: UploadShallow[];
  indexStatus: IndexStatus;
};
