'use client';

import type React from 'react';
import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { Repository } from '../types';

type State = {
  repositories: Repository[];
  trendingRepos: Repository[];
  selectedRepo: Repository | null;
  error: string | null;
  loading: boolean;
  username: string;
};

type Action =
  | { type: 'SET_REPOSITORIES'; payload: Repository[] }
  | { type: 'SET_TRENDING_REPOS'; payload: Repository[] }
  | { type: 'SET_SELECTED_REPO'; payload: Repository | null }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USERNAME'; payload: string };

const initialState: State = {
  repositories: [],
  trendingRepos: [],
  selectedRepo: null,
  error: null,
  loading: false,
  username: ''
};

function githubReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_REPOSITORIES':
      return { ...state, repositories: action.payload };
    case 'SET_TRENDING_REPOS':
      return { ...state, trendingRepos: action.payload };
    case 'SET_SELECTED_REPO':
      return { ...state, selectedRepo: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_USERNAME':
      return { ...state, username: action.payload };
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
