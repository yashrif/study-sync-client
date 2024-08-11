"use client";

import { createContext, useReducer } from "react";

import {
  FetchActionType,
  Planner,
  PlannerAction,
  PlannerActionType,
  PlannerContextProps,
  PlannerState,
  Status,
} from "@/types";

const PlannerContext = createContext<PlannerContextProps | undefined>(
  undefined
);

const initialState: PlannerState = {
  planner: {} as Planner,
  status: Status.IDLE,
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
        planner: action.payload,
      };
    case FetchActionType.FETCH_ERROR:
      return {
        ...state,
        status: Status.ERROR,
      };
    case PlannerActionType.SET_PLANNER:
      return {
        ...state,
        planner: action.payload,
      };
    default:
      return state;
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
