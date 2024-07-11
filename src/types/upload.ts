export enum FileTypes {
  PDF = "application/pdf",
  JPG = "image/jpg",
  JPEG = "image/jpeg",
  PNG = "image/png",
  DOC = "application/msword",
  PPT = "application/vnd.ms-powerpoint",
}

export type UploadSimple = {
  id: string;
  title: string;
  name: string;
  type: FileTypes;
  createDate: Date | string;
  isIndexed: boolean;
};

export type Upload = UploadSimple;

export type FileIcon = {
  key: keyof UploadSimple;
  value: UploadSimple;
};

/* --------------------------------- Server --------------------------------- */

export type FileIndexServer = {
  fileId: string;
  fileTypeName: string;
};

export type GenerateQnaServer = FileIndexServer & {
  isIndexed: boolean;
};
