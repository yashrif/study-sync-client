import { AxiosInstance } from "axios";
import _ from "lodash";
import { Dispatch, useCallback, useEffect, useReducer } from "react";

import { FetchAction, FetchActionType, RequestType, Status } from "@/types";
import { requestHandler, useApiHandler } from "@hooks/useApiHandler";

const quizReducer = <T, R>(state: T, action: FetchAction<R>): T => {
  switch (action.type) {
    case FetchActionType.FETCH_START:
      return {
        ...state,
        status: Status.PENDING,
      };
    case FetchActionType.FETCH_SUCCESS:
      return {
        ...state,
        status: Status.SUCCESS,
        data: action.payload,
      };
    case FetchActionType.FETCH_ERROR:
      return {
        ...state,
        status: Status.ERROR,
      };
    case FetchActionType.FETCH_IDLE:
      return {
        ...state,
        status: Status.IDLE,
      };
    case FetchActionType.FETCH_RESET:
      return {
        ...state,
        status: Status.IDLE,
        data: action.payload || null,
      };

    default:
      return state;
  }
};

export const useFetchState = <T>(initialStatus?: Status) => {
  type State = {
    status: Status;
    data: T | null;
  };

  const initialState: State = {
    data: null,
    status: initialStatus || Status.IDLE,
  };

  const [state, dispatch] = useReducer(quizReducer<State, T>, initialState);

  return { state, dispatch };
};

type FetchDataState<T> =
  | {
      endpoint: string;
      requestType?: RequestType.DELETE | RequestType.GET;
      axiosInstance?: AxiosInstance;
    }
  | {
      endpoint: string;
      requestType?: RequestType.PATCH | RequestType.POST | RequestType.PUT;
      axiosInstance?: AxiosInstance;
      data: T;
    };

export const useFetchDataState = <T, R>(props: FetchDataState<T>) => {
  const { state, dispatch } = useFetchState<R>(Status.PENDING);

  useFetchData<T, R>({
    dispatch,
    ...props,
  });

  return { state, dispatch };
};

type FetchData<T, R> = FetchDataState<T> & {
  dispatch: Dispatch<FetchAction<R>>;
};

export const useFetchData = <T, R>({
  endpoint,
  dispatch,
  requestType = RequestType.GET,
  axiosInstance,
  ...props
}: FetchData<T, R>) => {
  const { handler } = useApiHandler<T, R>({
    apiCall: useCallback(
      (data) =>
        requestHandler<T>({
          endpoint,
          requestType,
          data,
          axiosInstance,
        }),
      [axiosInstance, endpoint, requestType]
    ),
    dispatch,
  });

  useEffect(() => {
    if (
      (requestType === RequestType.PATCH ||
        requestType === RequestType.POST ||
        requestType === RequestType.PUT) &&
      "data" in props &&
      props?.data &&
      !_.isNull(props?.data)
    ) {
      handler({ data: props.data });
    } else if (
      requestType === RequestType.DELETE ||
      requestType === RequestType.GET
    )
      handler({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handler]);
};
