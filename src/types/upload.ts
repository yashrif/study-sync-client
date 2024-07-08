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
  name: string;
  type: FileTypes;
  createDate: Date | string;
};
