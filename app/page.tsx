"use client"

import { GitHubProvider } from "@/app/context/GithubContext"
import SearchForm from "@/app/components/SearchForm"
import RepositoryList from "@/app/components/RepositoryList"
import ReadmeViewer from "@/app/components/ReadmeViewer"

export default function Home() {
  return (
    <GitHubProvider>
      <div className="container">
        <header className="header">
          <h1>GitHub Explorer</h1>
        </header>
        <main>
          <SearchForm />
          <RepositoryList />
          <ReadmeViewer />
        </main>
      </div>
    </GitHubProvider>
  )
}
