"use client";

import { createContext, useReducer } from "react";

import { generateIndexStatus, indexReducer } from "@/lib/indexReducer";
import {
  FetchActionType,
  IndexAction,
  PlannerAction,
  PlannerContextProps,
  PlannerState,
  Status,
} from "@/types";

const PlannerContext = createContext<PlannerContextProps | undefined>(
  undefined
);

const initialState: PlannerState = {
  uploads: [],
  status: Status.IDLE,
  indexStatus: {},
};

const plannerReducer = (
  state: PlannerState,
  action: PlannerAction
): PlannerState => {
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
    default:
      return { ...state, ...indexReducer(state, action as IndexAction) };
  }
};

type Props = {
  children: React.ReactNode;
};

const PlannerProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(plannerReducer, initialState);

  return (
    <PlannerContext.Provider value={{ state, dispatch }}>
      {children}
    </PlannerContext.Provider>
  );
};

export { PlannerContext, PlannerProvider };
