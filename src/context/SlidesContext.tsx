"use client";

import { createContext, useReducer } from "react";

import {
  FetchActionType,
  SlidesAction,
  SlidesActionType,
  SlidesContextProps,
  SlidesState,
  Status,
} from "@/types";

const SlidesContext = createContext<SlidesContextProps | undefined>(undefined);

const initialState: SlidesState = {
  slides: [],
  status: Status.IDLE,
};

const slidesReducer = (
  state: SlidesState,
  action: SlidesAction
): SlidesState => {
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
        slides: action.payload,
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
        slides: action.payload || [],
      };
    case SlidesActionType.SET_SLIDES:
      return {
        ...state,
        slides: action.payload,
      };
    default:
      return state;
  }
};

type Props = {
  children: React.ReactNode;
};

const SlidesProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(slidesReducer, initialState);

  return (
    <SlidesContext.Provider value={{ state, dispatch }}>
      {children}
    </SlidesContext.Provider>
  );
};

export { SlidesContext, SlidesProvider };
