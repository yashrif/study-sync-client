import { AxiosResponse } from "axios";
import { Dispatch, useCallback } from "react";

import { FetchAction, FetchActionType } from "@allTypes";

type Props<T, R> = {
  apiCall: (data: T | null) => Promise<AxiosResponse<any, any>>;
  dispatch: Dispatch<FetchAction<R>>;
};

type HandlerProps<T> = {
  data?: T | null;
  isUpdateStatus?: boolean;
};

export const useApiHandler = <T, R>({ apiCall, dispatch }: Props<T, R>) => {
  const handler = useCallback(
    async ({ data = null, isUpdateStatus = true }: HandlerProps<T>) => {
      if (isUpdateStatus) dispatch({ type: FetchActionType.FETCH_START });
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
