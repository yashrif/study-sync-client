import { useCallback } from "react";

import { ApiHandler, FetchActionType, Handler } from "@allTypes";

export const useApiHandler = <T, R>({
  apiCall,
  dispatch,
}: ApiHandler<T, R>) => {
  const handler = useCallback(
    async ({
      data = null,
      isUpdateStatus = true,
      pathVariable,
    }: Handler<T>) => {
      if (isUpdateStatus) dispatch({ type: FetchActionType.FETCH_START });
      try {
        const response = await apiCall(data, pathVariable);
        dispatch({
          type: FetchActionType.FETCH_SUCCESS,
          payload: response.data,
        });
      } catch (e) {
        console.error(e);
        dispatch({ type: FetchActionType.FETCH_ERROR });
      }
    },
    [apiCall, dispatch]
  );

  return { handler };
};
