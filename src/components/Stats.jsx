import { useEffect, useRef, useState } from 'react'
import './Stats.css'

function CountUp({ target, suffix = '' }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 1200
        const steps = 40
        const increment = target / steps
        let current = 0
        const interval = setInterval(() => {
          current = Math.min(current + increment, target)
          setVal(Math.round(current))
          if (current >= target) clearInterval(interval)
        }, duration / steps)
      }
    }, { threshold: 0.5 })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{val}{suffix}</span>
}

export default function Stats({ profile, totalStars, repoCount }) {
  const stats = [
    { label: 'public repos', value: profile.public_repos, suffix: '' },
    { label: 'total stars', value: totalStars, suffix: '' },
    { label: 'followers', value: profile.followers, suffix: '' },
    { label: 'following', value: profile.following, suffix: '' },
  ]

  return (
    <div className="stats-bar">
      <div className="container">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div className="stat-item" key={i}>
              <div className="stat-value">
                <CountUp target={s.value} suffix={s.suffix} />
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
