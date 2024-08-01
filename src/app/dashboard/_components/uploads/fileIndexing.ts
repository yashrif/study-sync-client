import { Dispatch } from "react";

import studySyncDB from "@/api/studySyncDB";
import studySyncServer from "@/api/studySyncServer";
import { dbEndpoints, serverEndpoints } from "@/assets/data/api";
import { IndexActionType, QuizUploadsAction, UploadShallow } from "@allTypes";

type Props = {
  data: UploadShallow;
  dispatch: Dispatch<QuizUploadsAction>;
};

export const fileIndexing = async ({ data, dispatch }: Props) => {
  try {
    dispatch({
      type: IndexActionType.INDEX_STATUS_START,
      payload: data.id,
    });
    await studySyncServer.post(serverEndpoints.index, data.name);

    await studySyncDB.patch(`${dbEndpoints.uploads}/${data.id}`, {
      isIndexed: true,
    });

    dispatch({
      type: IndexActionType.INDEX_STATUS_SUCCESS,
      payload: data.id,
    });

    setTimeout(() => {
      dispatch({
        type: IndexActionType.SET_UPLOAD_INDEX_TRUE,
        payload: data.id,
      });
    }, 2000);
  } catch (err) {
    console.log(err);
    dispatch({
      type: IndexActionType.INDEX_STATUS_ERROR,
      payload: data.id,
    });
  }
};
