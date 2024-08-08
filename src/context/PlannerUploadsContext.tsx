"use client";

import { createContext, useReducer } from "react";

import { generateIndexStatus, indexReducer } from "@/lib/indexReducer";
import {
  FetchActionType,
  IndexAction,
  PlannerUploadsAction,
  PlannerUploadsActionType,
  PlannerUploadsContextProps,
  PlannerUploadsState,
  Status,
} from "@/types";

const PlannerUploadsContext = createContext<PlannerUploadsContextProps | undefined>(
  undefined
);

const initialState: PlannerUploadsState = {
  uploads: [],
  topics: undefined,
  status: Status.IDLE,
  indexStatus: {},
};

const plannerReducer = (
  state: PlannerUploadsState,
  action: PlannerUploadsAction
): PlannerUploadsState => {
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
        uploads: action.payload,
        indexStatus:
          action.payload.length > 0 ? generateIndexStatus(action.payload) : {},
      };
    case FetchActionType.FETCH_ERROR:
      return {
        ...state,
        status: Status.ERROR,
      };
    case PlannerUploadsActionType.SET_TOPICS:
      return {
        ...state,
        topics: action.payload,
      };
    default:
      return { ...state, ...indexReducer(state, action as IndexAction) };
  }
};

type Props = {
  children: React.ReactNode;
};

const PlannerUploadsProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(plannerReducer, initialState);

  return (
    <PlannerUploadsContext.Provider value={{ state, dispatch }}>
      {children}
    </PlannerUploadsContext.Provider>
  );
};

export { PlannerUploadsContext, PlannerUploadsProvider };
