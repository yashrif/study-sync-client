import { Dispatch, useEffect, useReducer } from "react";

import { ApiCall, FetchAction, FetchActionType, Status } from "@/types";
import { useApiHandler } from "@hooks/useApiHandler";

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

type FetchDataState<T> = {
  apiCall: ApiCall<T>;
  data?: T | null;
  fetchType?: "lazy" | "eager";
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
  apiCall,
  dispatch,
  data,
  fetchType = "eager",
}: FetchData<T, R>) => {
  const { handler } = useApiHandler<T, R>({
    apiCall,
    dispatch,
  });

  useEffect(() => {
    handler({ data, fetchType });
  }, [data, fetchType, handler]);
};
