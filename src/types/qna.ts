import { Dispatch, SetStateAction } from "react";

import { Status } from "@allTypes";

export type IndexStatus = {
  indexStatus: {
    [key: string]: Status;
  };
  setIndexStatus: Dispatch<
    SetStateAction<{
      [key: string]: Status;
    }>
  >;
};
