"use client";

import { createContext, useReducer } from "react";

import {
  FetchActionType,
  Status,
  UploadsAction,
  UploadsActionType,
  UploadsContextProps,
  UploadsState,
} from "@/types";

const UploadsContext = createContext<UploadsContextProps | undefined>(
  undefined
);

const initialState: UploadsState = {
  uploads: [],
  status: Status.IDLE,
};

const uploadsReducer = (
  state: UploadsState,
  action: UploadsAction
): UploadsState => {
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
      };
    case FetchActionType.FETCH_ERROR:
      return {
        ...state,
        status: Status.ERROR,
      };
    case UploadsActionType.SET_UPLOADS:
      return {
        ...state,
        uploads: action.payload,
      };
    default:
      return state;
  }
};

type Props = {
  children: React.ReactNode;
};

const UploadsProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uploadsReducer, initialState);

  return (
    <UploadsContext.Provider value={{ state, dispatch }}>
      {children}
    </UploadsContext.Provider>
  );
};

export { UploadsContext, UploadsProvider };
