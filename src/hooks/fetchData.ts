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

type FetchDataState = { endpoint: string; requestType?: RequestType };

export const useFetchDataState = <T, R>({
  endpoint,
  requestType = RequestType.GET,
}: FetchDataState) => {
  const { state, dispatch } = useFetchState<R>(Status.PENDING);

  useFetchData<T, R>({
    endpoint,
    dispatch,
    requestType,
  });

  return { state, dispatch };
};

type FetchData<T> = FetchDataState & {
  dispatch: Dispatch<FetchAction<T>>;
};

export const useFetchData = <T, R>({
  endpoint,
  dispatch,
  requestType = RequestType.GET,
}: FetchData<R>) => {
  const { handler } = useApiHandler<T, R>({
    apiCall: useCallback(
      (data) =>
        requestHandler<T>({
          endpoint,
          requestType,
          data,
        }),
      [endpoint, requestType],
    ),
    dispatch,
  });

  useEffect(() => {
    handler({});
  }, [handler]);
};
