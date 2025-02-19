'use client';

import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { useGitHub } from '@/app/context/GithubContext';

export default function ReadmeViewer() {
  const { state, dispatch } = useGitHub();
  const { selectedRepo } = state;
  const [readme, setReadme] = useState('');
  const [loading, setLoading] = useState(false);
  const readmeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchReadme() {
      if (!selectedRepo) return;

      setLoading(true);
      try {
        const response = await fetch(
          `https://api.github.com/repos/${selectedRepo.full_name}/readme`
        );
        if (!response.ok) throw new Error('README not found');
        const data = await response.json();
        const content = atob(data.content);
        setReadme(content);
      } catch (error) {
        console.error('Error fetching README:', error);
        setReadme('Failed to load README');
      } finally {
        setLoading(false);
      }
    }

    fetchReadme();
  }, [selectedRepo]);

  useEffect(() => {
    if (!loading && readmeRef.current) {
      readmeRef.current.focus();
    }
  }, [loading]);

  if (!selectedRepo) return null;

  return (
    <div className='readme-content'>
      <button
        className='back-button'
        onClick={() => dispatch({ type: 'SET_SELECTED_REPO', payload: null })}>
        Back to repositories
      </button>
      <h2>{selectedRepo.name} README</h2>
      {loading ? (
        <div>Loading README...</div>
      ) : (
        <div ref={readmeRef} tabIndex={-1} className='readme-focus-wrapper'>
          <ReactMarkdown>{readme}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
