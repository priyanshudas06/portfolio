import { useEffect, useState } from "react";
import { USERNAME } from "../hooks/useGitHub";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-inner">
        <a href="#" className="nav-logo">
          <span className="logo-bracket">[</span>
          {USERNAME}
          <span className="logo-bracket">]</span>
        </a>
        <div className="nav-links">
          <a href="#projects" className="nav-link">
            projects
          </a>
          <a href="#languages" className="nav-link">
            languages
          </a>
          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="nav-link nav-gh"
          >
            github ↗
          </a>
        </div>
      </div>
    </nav>
  );
}
