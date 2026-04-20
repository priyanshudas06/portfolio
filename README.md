# portfolio

A developer portfolio that auto-syncs with the GitHub API.  
No backend. No database. Just your GitHub data, live.

Features
- Auto-fetches profile, repos, stars, followers from GitHub API
- Filterable project cards by language
- Animated language skill bars
- Typing typewriter effect in hero
- Count-up stats on scroll
- Fully responsive
- Deploys free on GitHub Pages

Getting Started

````bash
# 1. Clone or download this folder
cd portfolio

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev


Open `http://localhost:5173` — your portfolio loads with live GitHub data.

## Customizing

### Change the GitHub username

Edit `src/hooks/useGitHub.js`:

```js
const USERNAME = "priyanshudas06"; // ← change this
````

### Add your own taglines

Edit the `TAGLINES` array in `src/components/Hero.jsx`:

````js
const TAGLINES = ["building things that matter.", "your custom tagline here."];


### Pin specific repos to the top

In `src/hooks/useGitHub.js`, add a `PINNED` array:

```js
const PINNED = ["repo-name-1", "repo-name-2"];
const sorted = [
  ...PINNED.map((name) => repos.find((r) => r.name === name)).filter(Boolean),
  ...ownRepos.filter((r) => !PINNED.includes(r.name)),
];
````

Deploy to GitHub Pages (Free)

```bash
# 1. Build the project
npm run build

# 2. Install gh-pages helper
npm install --save-dev gh-pages

# 3. Add to package.json scripts:
#    "deploy": "gh-pages -d dist"

# 4. Deploy
npm run deploy
```

Then go to your repo → Settings → Pages → set source to `gh-pages` branch.

Your portfolio will be live at: `https://priyanshudas06.github.io/portfolio`

**Pro tip:** Create a repo named `priyanshudas06.github.io` and deploy there — it becomes your root GitHub Pages URL and shows up on your GitHub profile automatically.

## GitHub API Rate Limits

The GitHub API allows 60 requests/hour without authentication.  
To increase this, create a personal access token and add it as a header in `useGitHub.js`:

```js
headers: {
  Authorization: `token YOUR_TOKEN_HERE`;
}
```

> Never commit your token — use environment variables with Vite:
>
> ```
> VITE_GITHUB_TOKEN=your_token_here
> ```
>
> Then access it as `import.meta.env.VITE_GITHUB_TOKEN`.


