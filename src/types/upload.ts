export enum UploadFormat {
  PDF = "application/pdf",
  JPE = "image/jpe",
  JPEG = "image/jpeg",
  PNG = "image/png",
  DOC = "application/msword",
  PPT = "application/vnd.ms-powerpoint",
}

export type UploadSimple = {
  id: string;
  name: string;
  type: UploadFormat;
  createDate: Date | string;
};
