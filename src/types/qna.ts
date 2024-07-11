import { Dispatch, SetStateAction } from "react";

import { Status, UploadSimple } from "@allTypes";

export type IndexStatus = {
  indexStatus: {
    [key: string]: Status;
  };
  setIndexStatus: Dispatch<
    SetStateAction<{
      [key: string]: Status;
    }>
  >;
  setUploads: Dispatch<SetStateAction<UploadSimple[]>>;
};
