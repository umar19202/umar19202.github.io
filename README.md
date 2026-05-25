# Muhammad Umar Saeed — Portfolio

A clean, modern, professional developer portfolio.

## Files

```
portfolio/
├── index.html   ← Main HTML (all sections)
├── style.css    ← All styles (variables, layout, responsive)
├── script.js    ← Scroll reveal, nav, mobile menu, form
└── README.md
```

## Run Locally

No build step needed. Just open `index.html` in any browser:

```bash
# Option 1: Double-click index.html
# Option 2: Use VS Code Live Server extension
# Option 3: Python simple server
python3 -m http.server 3000
# Then open http://localhost:3000
```

## Deploy to GitHub Pages

1. Push all 3 files to your GitHub repo (`umar19202/umar19202.github.io`)
2. Replace existing files
3. GitHub Pages auto-deploys — live in ~60 seconds

```bash
git add .
git commit -m "Portfolio redesign"
git push origin main
```

## Fonts Used

- **Syne** — headings (loaded from Google Fonts)
- **DM Sans** — body text (loaded from Google Fonts)

## Dependencies

Zero npm packages. Zero build tools. Pure HTML/CSS/JS.
Google Fonts loaded via CDN (requires internet connection).
