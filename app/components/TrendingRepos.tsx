'use client';

import { useEffect } from 'react';
import { useGitHub } from '@/app/context/GithubContext';

export default function TrendingRepos() {
  const { state, dispatch } = useGitHub();
  const { trendingRepos, loading, error } = state;

  useEffect(() => {
    async function fetchTrendingRepos() {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const response = await fetch(
          'https://api.github.com/search/repositories?q=stars:>1&sort=stars&order=desc&per_page=10'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch trending repositories');
        }
        const data = await response.json();
        dispatch({ type: 'SET_TRENDING_REPOS', payload: data.items });
      } catch (error) {
        console.error('Error fetching trending repositories:', error);
        dispatch({
          type: 'SET_ERROR',
          payload: 'Failed to load trending repositories'
        });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    }

    fetchTrendingRepos();
  }, [dispatch]);

  if (loading) {
    return <div className='loading'>Loading trending repositories...</div>;
  }

  if (error) {
    return <div className='error-message'>{error}</div>;
  }

  return (
    <div>
      <h2 className='trending-title'>Top 10 Trending Repositories</h2>
      <div className='repo-list'>
        {trendingRepos.map((repo) => (
          <div key={repo.id} className='repo-card'>
            <a
              href={repo.html_url}
              className='repo-url'
              target='_blank'
              rel='noopener noreferrer'>
              <h3 className='repo-name'>{repo.name}</h3>
            </a>
            <p className='repo-description'>
              {repo.description || 'No description available'}
            </p>
            <div className='repo-stats'>
              <span>Stars: {repo.stargazers_count}</span>
              <span>Forks: {repo.forks_count}</span>
            </div>
            <button
              className='repo-link'
              onClick={() =>
                dispatch({ type: 'SET_SELECTED_REPO', payload: repo })
              }>
              View README
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
