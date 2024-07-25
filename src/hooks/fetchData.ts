import { Dispatch, useCallback, useEffect, useReducer } from "react";

import studySyncDB from "@/api/studySyncDB";
import { FetchAction, FetchActionType, Status } from "@/types";
import { useApiHandler } from "./useApiHandler";

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
    default:
      return state;
  }
};

export const useFetchDataState = <T>(endpoint: string) => {
  type State = {
    status: Status;
    data: T | null;
  };

  const initialState: State = {
    data: null,
    status: Status.PENDING,
  };

  const [state, dispatch] = useReducer(quizReducer<State, T>, initialState);

  useFetchData<T>({
    endpoint,
    dispatch,
  });

  return { state };
};

type FetchData<T> = {
  endpoint: string;
  dispatch: Dispatch<FetchAction<T>>;
};

export const useFetchData = <T>({ endpoint, dispatch }: FetchData<T>) => {
  const { handler } = useApiHandler<null, T>({
    apiCall: useCallback(() => studySyncDB.get(endpoint), [endpoint]),
    dispatch,
  });

  useEffect(() => {
    handler();
  }, [handler]);
};
