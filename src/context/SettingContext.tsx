"use client";

import { createContext, useReducer } from "react";

import { FetchActionType, SettingState, Status, User } from "@/types";
import {
  SettingAction,
  SettingActionType,
  SettingContextProps,
} from "@/types/setting";

const SettingContext = createContext<SettingContextProps | undefined>(
  undefined,
);

const initialState: SettingState = {
  user: {} as User,
  status: Status.IDLE,
};

const settingReducer = (
  state: SettingState,
  action: SettingAction,
): SettingState => {
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
        user: action.payload,
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
    case SettingActionType.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

type Props = {
  children: React.ReactNode;
};

const SettingProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(settingReducer, initialState);

  return (
    <SettingContext.Provider value={{ state, dispatch }}>
      {children}
    </SettingContext.Provider>
  );
};

export { SettingContext, SettingProvider };
