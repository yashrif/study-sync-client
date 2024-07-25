import { useCallback } from "react";

import studySyncDB from "@/api/studySyncDB";
import { ApiHandler, FetchActionType, Handler, RequestType } from "@allTypes";

export const useApiHandler = <T, R>({
  apiCall,
  dispatch,
}: ApiHandler<T, R>) => {
  const handler = useCallback(
    async ({
      data = null,
      isUpdateStatus = true,
      pathVariable,
      fetchType = "eager",
    }: Handler<T>) => {
      if (isUpdateStatus) dispatch({ type: FetchActionType.FETCH_START });
      try {
        const response = await apiCall(data, pathVariable);
        dispatch({
          type: FetchActionType.FETCH_SUCCESS,
          payload: response.data,
        });
      } catch (e) {
        console.log(e);
        dispatch({ type: FetchActionType.FETCH_ERROR });
      } finally {
        if (fetchType === "lazy")
          setTimeout(() => {
            dispatch({
              type: FetchActionType.FETCH_IDLE,
            });
          }, 2500);
      }
    },
    [apiCall, dispatch],
  );

  return { handler };
};

export type RequestHandler<T> = {
  endpoint: string;
  requestType?: RequestType;
  data: T | null;
};

export const requestHandler = <T>({
  endpoint,
  requestType,
  data,
}: RequestHandler<T>) => {
  switch (requestType) {
    case RequestType.PATCH:
      return studySyncDB.patch(endpoint, data);
    case RequestType.DELETE:
      return studySyncDB.delete(endpoint);
    case RequestType.POST:
      return studySyncDB.post(endpoint, data);
    case RequestType.PUT:
      return studySyncDB.post(endpoint, data);
    default:
      return studySyncDB.get(endpoint);
  }
};
