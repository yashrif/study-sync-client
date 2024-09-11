"use client";

import { createContext, useReducer } from "react";

import {
  FetchActionType,
  PlannersAction,
  PlannersContextProps,
  PlannersState,
  Status,
} from "@/types";

const PlannersContext = createContext<PlannersContextProps | undefined>(
  undefined
);

const initialState: PlannersState = {
  planners: [],
  status: Status.IDLE,
};

const plannersReducer = (
  state: PlannersState,
  action: PlannersAction
): PlannersState => {
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
        planners: action.payload,
      };
    case FetchActionType.FETCH_ERROR:
      return {
        ...state,
        status: Status.ERROR,
      };
    case FetchActionType.FETCH_RESET:
      return {
        ...state,
        status: Status.IDLE,
        planners: action.payload || [],
      };
    default:
      return state;
  }
};

type Props = {
  children: React.ReactNode;
};

const PlannersProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(plannersReducer, initialState);

  return (
    <PlannersContext.Provider value={{ state, dispatch }}>
      {children}
    </PlannersContext.Provider>
  );
};

export { PlannersContext, PlannersProvider };
