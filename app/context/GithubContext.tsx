'use client';

import type React from 'react';
import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { Repository } from '@/app/types';

type State = {
  repositories: Repository[];
  selectedRepo: Repository | null;
  error: string | null;
  loading: boolean;
};

type Action =
  | { type: 'SET_REPOSITORIES'; payload: Repository[] }
  | { type: 'SET_SELECTED_REPO'; payload: Repository | null }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: State = {
  repositories: [],
  selectedRepo: null,
  error: null,
  loading: false
};

function githubReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_REPOSITORIES':
      return { ...state, repositories: action.payload };
    case 'SET_SELECTED_REPO':
      return { ...state, selectedRepo: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

const GitHubContext = createContext<
  | {
      state: State;
      dispatch: React.Dispatch<Action>;
    }
  | undefined
>(undefined);

export function GitHubProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(githubReducer, initialState);

  return (
    <GitHubContext.Provider value={{ state, dispatch }}>
      {children}
    </GitHubContext.Provider>
  );
}

export function useGitHub() {
  const context = useContext(GitHubContext);
  if (context === undefined) {
    throw new Error('useGitHub must be used within a GitHubProvider');
  }
  return context;
}
