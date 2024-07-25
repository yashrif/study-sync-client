import { Dispatch } from "react";

import studySyncDB from "@/api/studySyncDB";
import studySyncServer from "@/api/studySyncServer";
import { dbEndpoints, serverEndpoints } from "@/assets/data/api";
import {
  QuizUploadsAction,
  QuizUploadsActionType,
  UploadSimple,
} from "@allTypes";

type Props = {
  data: UploadSimple;
  dispatch: Dispatch<QuizUploadsAction>;
};

export const fileIndexing = async ({ data, dispatch }: Props) => {
  try {
    dispatch({
      type: QuizUploadsActionType.INDEX_STATUS_START,
      payload: data.id,
    });
    await studySyncServer.post(serverEndpoints.index, data.name);

    await studySyncDB.patch(`${dbEndpoints.uploads}/${data.id}`, {
      isIndexed: true,
    });

    dispatch({
      type: QuizUploadsActionType.INDEX_STATUS_SUCCESS,
      payload: data.id,
    });

    setTimeout(() => {
      dispatch({
        type: QuizUploadsActionType.SET_UPLOAD_INDEX_TRUE,
        payload: data.id,
      });
    }, 2000);
  } catch (error) {
    console.error(error);
    dispatch({
      type: QuizUploadsActionType.INDEX_STATUS_ERROR,
      payload: data.id,
    });
  }
};
