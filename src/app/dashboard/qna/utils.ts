import { Dispatch, SetStateAction } from "react";

import studySyncDB from "@/api/studySyncDB";
import studySyncServer from "@/api/studySyncServer";
import { dbEndpoints, serverEndpoints } from "@/assets/data/api";
import { UploadSimple } from "@/types";
import { Status } from "@allTypes";

export const onArrowClick = async (
  files: UploadSimple[],
  setIndexStatus: Dispatch<SetStateAction<Status>>,
  setUploadStatus: Dispatch<SetStateAction<Status>>
) => {
  files.forEach(async (file) => {
    if (!file.isIndexed) {
      setIndexStatus(Status.PENDING);
      await studySyncServer.post(serverEndpoints.index, file);
      setIndexStatus(Status.SUCCESS);

      setUploadStatus(Status.PENDING);
      await studySyncDB.patch(`${dbEndpoints.uploads}/${file.id}`, {
        isIndexed: true,
      });
      setUploadStatus(Status.SUCCESS);
      setTimeout(() => {
        setIndexStatus(Status.IDLE);
      }, 2500);
    }
  });
};
