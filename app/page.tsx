"use client"

import { GitHubProvider, useGitHub } from "./context/GithubContext"
import SearchForm from "./components/SearchForm"
import RepositoryList from "./components/RepositoryList"
import ReadmeViewer from "./components/ReadmeViewer"
import TrendingRepos from "./components/TrendingRepos"

function RepoDisplay() {
  const { state } = useGitHub()
  const { repositories } = state

  return repositories.length > 0 ? <RepositoryList /> : <TrendingRepos />
}

export default function Home() {
  return (
    <GitHubProvider>
      <div className="container">
        <header className="header">
          <h1>GitHub Explorer</h1>
        </header>
        <main>
          <SearchForm />
          <RepoDisplay />
          <ReadmeViewer />
        </main>
      </div>
    </GitHubProvider>
  )
}

