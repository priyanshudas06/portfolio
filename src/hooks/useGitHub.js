import { useState, useEffect } from "react";

const USERNAME = "priyanshudas06";
const BASE = "https://api.github.com";

export function useGitHub(username) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAll() {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`${BASE}/users/${USERNAME}`),
          fetch(`${BASE}/users/${USERNAME}/repos?per_page=100&sort=updated`),
        ]);

        if (!profileRes.ok)
          throw new Error(`GitHub API error: ${profileRes.status}`);

        const profile = await profileRes.json();
        const repos = await reposRes.json();

        // Sort by stars descending, filter forks
        const ownRepos = repos
          .filter((r) => !r.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count);

        // Aggregate languages
        const langMap = {};
        ownRepos.forEach((r) => {
          if (r.language) {
            langMap[r.language] = (langMap[r.language] || 0) + 1;
          }
        });
        const totalLangRepos = Object.values(langMap).reduce(
          (a, b) => a + b,
          0,
        );
        const languages = Object.entries(langMap)
          .map(([name, count]) => ({
            name,
            count,
            pct: Math.round((count / totalLangRepos) * 100),
          }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 8);

        // Total stars
        const totalStars = ownRepos.reduce((s, r) => s + r.stargazers_count, 0);

        setData({
          profile,
          repos: ownRepos.slice(0, 12),
          languages,
          totalStars,
        });
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  return { data, loading, error };
}

export { USERNAME };
