import { AxiosResponse } from "axios";
import { Dispatch, useCallback } from "react";

import { QuizAction, QuizActionType } from "@allTypes";

type Props<T> = {
  apiCall: (data: T | null) => Promise<AxiosResponse<any, any>>;
  dispatch: Dispatch<QuizAction>;
};

export const useApiHandler = <T>({ apiCall, dispatch }: Props<T>) => {
  const handler = useCallback(
    async (data: T | null = null) => {
      dispatch({ type: QuizActionType.FETCH_START });
      try {
        const response = await apiCall(data);
        dispatch({
          type: QuizActionType.FETCH_SUCCESS,
          payload: response.data,
        });
      } catch (e) {
        console.log(e);
        dispatch({ type: QuizActionType.FETCH_ERROR });
      }
    },
    [apiCall, dispatch]
  );

  return { handler };
};
