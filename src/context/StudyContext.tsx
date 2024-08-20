'use client';

import { createContext, useReducer } from 'react';

import { FetchActionType, Status } from '@/types';
import {
  StudyAction,
  StudyActionType,
  StudyContextProps,
  StudyState,
} from '@/types/study';

const StudyContext = createContext<StudyContextProps | undefined>(undefined);

const initialState: StudyState = {
  uploads: [],
  status: Status.IDLE,
  currentStudy: '',
  selectedText: '',
  showChatResponse: false,
  chatResponse: '',
};

const studyReducer = (state: StudyState, action: StudyAction): StudyState => {
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
    case StudyActionType.SET_STUDY:
      return {
        ...state,
        currentStudy: action.payload,
      };
    case StudyActionType.SET_SELECTED_TEXT:
      return {
        ...state,
        selectedText: action.payload,
      };
    case StudyActionType.SET_CHAT_RESPONSE:
      return {
        ...state,
        chatResponse: action.payload,
      };
    case StudyActionType.SET_SHOW_RESPONSE:
      return {
        ...state,
        showChatResponse: action.payload,
      };
    default:
      return state;
  }
};

type Props = {
  children: React.ReactNode;
};

const StudyProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(studyReducer, initialState);

  return (
    <StudyContext.Provider value={{ state, dispatch }}>
      {children}
    </StudyContext.Provider>
  );
};

export { StudyContext, StudyProvider };
