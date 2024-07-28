import { AxiosInstance } from "axios";
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
      isReset,
    }: Handler<T>): Promise<R | undefined> => {
      if (isUpdateStatus) dispatch({ type: FetchActionType.FETCH_START });
      try {
        const response = await apiCall(data, pathVariable);
        dispatch({
          type: FetchActionType.FETCH_SUCCESS,
          payload: response.data,
        });

        return response.data;
      } catch (e) {
        console.log(e);
        dispatch({ type: FetchActionType.FETCH_ERROR });
      } finally {
        if (isReset)
          if (fetchType === "lazy")
            setTimeout(() => {
              dispatch({
                type: FetchActionType.FETCH_IDLE,
              });
            }, 2500);
          else dispatch({ type: FetchActionType.FETCH_IDLE });
      }
    },
    [apiCall, dispatch],
  );

  return { handler };
};

export type RequestHandler<T> = {
  axiosInstance?: AxiosInstance;
  endpoint: string;
  requestType?: RequestType;
  data: T | null;
};

export const requestHandler = <T>({
  axiosInstance = studySyncDB,
  endpoint,
  requestType,
  data,
}: RequestHandler<T>) => {
  switch (requestType) {
    case RequestType.PATCH:
      return axiosInstance.patch(endpoint, data);
    case RequestType.DELETE:
      return axiosInstance.delete(endpoint);
    case RequestType.POST:
      return axiosInstance.post(endpoint, data);
    case RequestType.PUT:
      return axiosInstance.post(endpoint, data);
    default:
      return axiosInstance.get(endpoint);
  }
};
