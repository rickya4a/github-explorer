'use client';

import { useGitHub } from '@/app/context/GithubContext';

export default function RepositoryList() {
  const { state, dispatch } = useGitHub();
  const { repositories, loading, error } = state;

  if (loading) {
    return <div className='loading'>Loading repositories...</div>;
  }

  if (error) {
    return <div className='error-message'>{error}</div>;
  }

  const handleBackToTrending = () => {
    dispatch({ type: 'SET_REPOSITORIES', payload: [] });
    dispatch({ type: 'SET_SELECTED_REPO', payload: null })
    dispatch({ type: 'SET_USERNAME', payload: '' })
  };

  return (
    <div>
      <div className='list-header'>
        <h2 className='search-results-title'>Search Results</h2>
        <button onClick={handleBackToTrending} className='back-button'>
          Back to Trending
        </button>
      </div>
      <div className='repo-list'>
        {repositories.map((repo) => (
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
