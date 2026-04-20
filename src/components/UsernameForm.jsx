import { useState } from "react";
import "./UsernameForm.css";

const EXAMPLES = ["torvalds", "gaearon", "sindresorhus", "priyanshudas06"];

export default function UsernameForm({ onSubmit }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(name) {
    const clean = (name || value).trim().toLowerCase();
    if (!clean) {
      setError("please enter a username");
      return;
    }
    if (!/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(clean)) {
      setError("invalid github username");
      return;
    }
    setError("");
    onSubmit(clean);
  }

  function handleKey(e) {
    if (e.key === "Enter") handleSubmit();
  }

  return (
    <div className="uf-screen">
      <div className="uf-grid" />
      <div className="uf-box">
        <div className="uf-chrome">
          <span className="uf-dot red" />
          <span className="uf-dot yellow" />
          <span className="uf-dot green" />
          <span className="uf-chrome-path">~/portfolio — bash</span>
        </div>

        <p className="uf-prompt">$ init portfolio --user</p>
        <h1 className="uf-heading">
          whose work
          <br />
          should we <span>show?</span>
        </h1>
        <p className="uf-sub">
          enter a github username — we'll pull everything live.
        </p>

        <div className={`uf-input-row ${error ? "has-error" : ""}`}>
          <span className="uf-prefix">github.com /</span>
          <input
            className="uf-input"
            placeholder="username"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError("");
            }}
            onKeyDown={handleKey}
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
          <button className="uf-btn" onClick={() => handleSubmit()}>
            load →
          </button>
        </div>

        {error && <p className="uf-error">⚠ {error}</p>}
        {!error && (
          <p className="uf-hint">
            <span>↵</span> press enter or click load
          </p>
        )}

        <div className="uf-examples">
          <span className="uf-examples-label">try someone:</span>
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              className="uf-chip"
              onClick={() => {
                setValue(ex);
                handleSubmit(ex);
              }}
            >
              {ex}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
