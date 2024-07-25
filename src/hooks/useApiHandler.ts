import { AxiosResponse } from "axios";
import { Dispatch, useCallback } from "react";

import { FetchAction, FetchActionType } from "@allTypes";

type Props<T, R> = {
  apiCall: (data: T | null) => Promise<AxiosResponse<any, any>>;
  dispatch: Dispatch<FetchAction<R>>;
};

export const useApiHandler = <T, R>({ apiCall, dispatch }: Props<T, R>) => {
  const handler = useCallback(
    async (data: T | null = null) => {
      dispatch({ type: FetchActionType.FETCH_START });
      try {
        const response = await apiCall(data);
        dispatch({
          type: FetchActionType.FETCH_SUCCESS,
          payload: response.data,
        });
      } catch (e) {
        console.log(e);
        dispatch({ type: FetchActionType.FETCH_ERROR });
      }
    },
    [apiCall, dispatch]
  );

  return { handler };
};
