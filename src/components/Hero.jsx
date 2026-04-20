import { useState, useEffect } from "react";
import { USERNAME } from "../hooks/useGitHub";
import "./Hero.css";

const TAGLINES = [
  "building things that matter.",
  "turning ideas into code.",
  "open source enthusiast.",
  "always learning, always shipping.",
];

export default function Hero({ profile }) {
  const [taglineIdx, setTaglineIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const target = TAGLINES[taglineIdx];
    if (typing) {
      if (displayed.length < target.length) {
        const t = setTimeout(
          () => setDisplayed(target.slice(0, displayed.length + 1)),
          60,
        );
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 2000);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
        return () => clearTimeout(t);
      } else {
        setTaglineIdx((i) => (i + 1) % TAGLINES.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, taglineIdx]);

  return (
    <section className="hero">
      <div className="hero-scanline" />
      <div className="container">
        <div className="hero-inner">
          <div className="hero-left fade-up">
            <div className="hero-prompt">
              <span className="prompt-path">~/portfolio</span>
              <span className="prompt-dollar"> $ </span>
              <span className="prompt-cmd">whoami</span>
            </div>

            <h1 className="hero-name">{profile.name || USERNAME}</h1>

            <div className="hero-tagline">
              <span className="tagline-prefix">// </span>
              <span className="tagline-text">{displayed}</span>
              <span className="cursor">▋</span>
            </div>

            {profile.bio && <p className="hero-bio">{profile.bio}</p>}

            <div className="hero-meta">
              {profile.location && (
                <span className="meta-item">
                  <span className="meta-icon">◎</span> {profile.location}
                </span>
              )}
              {profile.company && (
                <span className="meta-item">
                  <span className="meta-icon">◈</span> {profile.company}
                </span>
              )}
              {profile.blog && (
                <a
                  className="meta-item meta-link"
                  href={profile.blog}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="meta-icon">◆</span>{" "}
                  {profile.blog.replace(/^https?:\/\//, "")}
                </a>
              )}
            </div>

            <div className="hero-actions">
              <a
                className="btn-primary"
                href={`https://github.com/${USERNAME}`}
                target="_blank"
                rel="noreferrer"
              >
                <span>view on github</span>
                <span className="btn-arrow">→</span>
              </a>
              <a className="btn-secondary" href="#projects">
                see projects
              </a>
            </div>
          </div>

          <div
            className="hero-right fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="avatar-frame">
              <div className="avatar-corner tl" />
              <div className="avatar-corner tr" />
              <div className="avatar-corner bl" />
              <div className="avatar-corner br" />
              <img
                src={profile.avatar_url}
                alt={profile.name || USERNAME}
                className="avatar-img"
              />
              <div className="avatar-badge">
                <span className="badge-dot" />
                available
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
