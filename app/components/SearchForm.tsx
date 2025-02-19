'use client';

import { useState, type FormEvent } from 'react';
import { useGitHub } from '@/app/context/GithubContext';

export default function SearchForm() {
  const [username, setUsername] = useState('');
  const { dispatch } = useGitHub();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      dispatch({ type: 'SET_SELECTED_REPO', payload: null })
      const response = await fetch(
        `https://api.github.com/users/${username}/repos`
      );
      if (!response.ok) {
        throw new Error('User not found or unable to fetch repositories');
      }
      const data = await response.json();
      dispatch({ type: 'SET_REPOSITORIES', payload: data });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error.message : 'An error occurred'
      });
      dispatch({ type: 'SET_REPOSITORIES', payload: [] });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <form onSubmit={handleSubmit} className='search-form'>
      <input
        type='text'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder='Enter GitHub username'
        className='search-input'
      />
      <button type='submit' className='search-button'>
        Search
      </button>
    </form>
  );
}
