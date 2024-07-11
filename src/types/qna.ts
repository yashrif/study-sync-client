import { Dispatch, SetStateAction } from "react";

import { Status, UploadSimple } from "@allTypes";

export type IndexStatus = {
  [key: string]: {
    status: Status;
    animation?: boolean | undefined;
  };
};

export type IndexStates = {
  indexStatus: IndexStatus;
  setIndexStatus: Dispatch<SetStateAction<IndexStatus>>;
  setUploads: Dispatch<SetStateAction<UploadSimple[]>>;
};
