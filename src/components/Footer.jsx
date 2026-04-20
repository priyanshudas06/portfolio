import { USERNAME } from "../hooks/useGitHub";
import "./Footer.css";

export default function Footer({ profile }) {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-left">
          <span className="footer-copy">
            <span className="footer-green">$</span> built by{" "}
            {profile.name || USERNAME}
          </span>
          <span className="footer-meta">auto-synced with GitHub API</span>
        </div>
        <div className="footer-links">
          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noreferrer"
          >
            github
          </a>
          {profile.blog && (
            <a href={profile.blog} target="_blank" rel="noreferrer">
              website
            </a>
          )}
          {profile.email && <a href={`mailto:${profile.email}`}>email</a>}
        </div>
      </div>
    </footer>
  );
}
