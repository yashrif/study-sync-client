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

/* --------------------------------- Context -------------------------------- */

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
