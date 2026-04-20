import { useEffect, useRef, useState } from 'react'
import './Languages.css'

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
  Dart:       '#00B4AB',
  Jupyter:    '#DA5B0B',
}

function langColor(lang) {
  return LANG_COLORS[lang] || '#8b949e'
}

function LangBar({ lang, pct, index }) {
  const [animated, setAnimated] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setAnimated(true); observer.disconnect() }
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="lang-row" ref={ref} style={{ animationDelay: `${index * 0.08}s` }}>
      <div className="lang-meta">
        <span className="lang-dot" style={{ background: langColor(lang.name) }} />
        <span className="lang-name">{lang.name}</span>
        <span className="lang-pct">{lang.pct}%</span>
      </div>
      <div className="lang-track">
        <div
          className="lang-fill"
          style={{
            width: animated ? `${lang.pct}%` : '0%',
            background: langColor(lang.name),
            transitionDelay: `${index * 0.08}s`,
          }}
        />
      </div>
    </div>
  )
}

export default function Languages({ languages }) {
  return (
    <section id="languages" className="languages-section">
      <div className="container">
        <p className="section-label">// languages</p>
        <h2 className="section-title">what I code in</h2>
        <div className="languages-grid">
          {languages.map((lang, i) => (
            <LangBar key={lang.name} lang={lang} pct={lang.pct} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
