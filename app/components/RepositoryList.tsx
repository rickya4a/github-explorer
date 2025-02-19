'use client';

import { useGitHub } from '@/app/context/GithubContext';

export default function RepositoryList() {
  const { state, dispatch } = useGitHub();
  const { repositories, loading, error } = state;

  if (loading) {
    return <div className='loading'>Loading...</div>;
  }

  if (error) {
    return <div className='error-message'>{error}</div>;
  }

  if (repositories.length === 0) {
    return null;
  }

  return (
    <div className='repo-list'>
      {repositories.map((repo) => (
        <div key={repo.id} className='repo-card'>
          <h3 className='repo-name'>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="repo-link"
            >
              {repo.name}
            </a>
          </h3>
          <p className='repo-description'>
            {repo.description || 'No description available'}
          </p>
          <div className='repo-stats'>
            <span>Stars: {repo.stargazers_count}</span>
            <span>Forks: {repo.forks_count}</span>
          </div>
          <button
            onClick={() =>
              dispatch({ type: 'SET_SELECTED_REPO', payload: repo })
            }>
            View README
          </button>
        </div>
      ))}
    </div>
  );
}
