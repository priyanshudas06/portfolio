import { useState } from 'react'
import './Projects.css'

const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python:     '#3572A5',
  Java:       '#b07219',
  'C++':      '#f34b7d',
  C:          '#555555',
  Rust:       '#dea584',
  Go:         '#00ADD8',
  HTML:       '#e34c26',
  CSS:        '#563d7c',
  Shell:      '#89e051',
  Kotlin:     '#A97BFF',
  Swift:      '#ffac45',
  Ruby:       '#701516',
  PHP:        '#4F5D95',
  Dart:       '#00B4AB',
  Jupyter:    '#DA5B0B',
}

function langColor(lang) {
  return LANG_COLORS[lang] || '#8b949e'
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr)
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'today'
  if (days === 1) return '1 day ago'
  if (days < 30) return `${days}d ago`
  if (days < 365) return `${Math.floor(days / 30)}mo ago`
  return `${Math.floor(days / 365)}y ago`
}

export default function Projects({ repos }) {
  const languages = ['all', ...new Set(repos.map(r => r.language).filter(Boolean))]
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all'
    ? repos
    : repos.filter(r => r.language === filter)

  return (
    <section id="projects">
      <div className="container">
        <p className="section-label">// projects</p>
        <h2 className="section-title">what I've built</h2>

        <div className="filter-bar">
          {languages.slice(0, 8).map(lang => (
            <button
              key={lang}
              className={`filter-btn ${filter === lang ? 'active' : ''}`}
              onClick={() => setFilter(lang)}
            >
              {lang !== 'all' && (
                <span
                  className="filter-dot"
                  style={{ background: langColor(lang) }}
                />
              )}
              {lang}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filtered.map((repo, i) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="repo-card fade-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="repo-card-top">
                <div className="repo-icon">◈</div>
                <div className="repo-name">{repo.name}</div>
                {repo.stargazers_count > 0 && (
                  <div className="repo-stars">
                    <span>★</span> {repo.stargazers_count}
                  </div>
                )}
              </div>

              <p className="repo-desc">
                {repo.description || <span className="repo-no-desc">no description</span>}
              </p>

              <div className="repo-footer">
                {repo.language && (
                  <span className="repo-lang">
                    <span
                      className="lang-dot"
                      style={{ background: langColor(repo.language) }}
                    />
                    {repo.language}
                  </span>
                )}
                {repo.forks_count > 0 && (
                  <span className="repo-forks">⑂ {repo.forks_count}</span>
                )}
                <span className="repo-updated">{timeAgo(repo.updated_at)}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
