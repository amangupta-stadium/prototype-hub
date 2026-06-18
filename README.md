# Prototype hub

A single repository that holds a shared design system and every vibe-coded
prototype your team builds. All prototypes import the same tokens and components,
so everything stays visually consistent. The whole repo is hosted free on
GitHub Pages.

```
prototype-hub/
├── CLAUDE.md                      ← rules Claude Code follows for every prototype
├── index.html                    ← landing page listing all prototypes
├── package.json
├── .nojekyll                      ← required so /_template etc. are served
├── .github/workflows/deploy.yml   ← auto-builds + deploys on push
│
├── design-system/
│   ├── tokens/                    ← source of truth (edit these)
│   │   ├── colors.json
│   │   ├── typography.json
│   │   └── layout.json
│   ├── build-tokens.js            ← compiles tokens → dist/tokens.css
│   ├── dist/
│   │   ├── tokens.css             ← generated, do not edit by hand
│   │   └── design-system.css      ← components + semantic aliases
│   └── assets/
│       └── sprinkle.svg           ← shared logo mark
│
└── prototypes/
    ├── _template/                 ← copy this to start a new feature
    │   └── index.html
    └── snack-checkout/            ← working sample feature
        └── index.html
```

---

## Part 1 — One-time GitHub setup

### Step 1. Create the repository

1. On GitHub, click **New repository**.
2. Name it something memorable, e.g. `prototype-hub`.
3. Choose **Private** or **Public** (Pages works on both for most plans).
4. Do not initialize with a README — you already have these files.

### Step 2. Push these files

From the unzipped folder on your machine:

```bash
cd prototype-hub
git init
git add .
git commit -m "Initial design system and prototype hub"
git branch -M main
git remote add origin https://github.com/YOUR-ORG/prototype-hub.git
git push -u origin main
```

### Step 3. Turn on GitHub Pages

1. In the repo, go to **Settings → Pages**.
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. That's it. The included workflow (`.github/workflows/deploy.yml`) handles the rest.

### Step 4. Wait for the first deploy

1. Go to the **Actions** tab. You'll see the "Deploy to GitHub Pages" workflow running.
2. When it finishes (about a minute), your site is live at:

   ```
   https://YOUR-ORG.github.io/prototype-hub/
   ```

3. The sample prototype is at:

   ```
   https://YOUR-ORG.github.io/prototype-hub/prototypes/snack-checkout/
   ```

### Step 5. Update placeholders

Search the repo for `YOUR-ORG` and `REPO-NAME` and replace with your real values
(in `CLAUDE.md` and `README.md`). Add your Figma file URL in `CLAUDE.md` section 13.

---

## Part 2 — Editing the design system

The token JSON files in `design-system/tokens/` are the source of truth.

1. Edit a value, e.g. change `color.brand.punch` in `colors.json`.
2. Rebuild locally: `npm run build` (regenerates `dist/tokens.css`).
3. Commit and push — the live site updates automatically.

To add a new component, add its CSS class to `design-system/dist/design-system.css`,
then document it in `CLAUDE.md` section 7 so Claude Code knows to use it.

> The build step also runs automatically in CI, so even if you forget to rebuild
> locally, pushing token changes will produce correct output on the live site.

---

## Part 3 — Building a new feature with vibe-coding

This is the core workflow your team repeats for every prototype.

### Step 1. Create the feature folder

```bash
cp -r prototypes/_template prototypes/loyalty-dashboard
```

Use a short, hyphenated, descriptive name.

### Step 2. Open the repo in Claude Code

```bash
cd prototype-hub
claude
```

Claude Code automatically reads `CLAUDE.md` at the repo root. That file tells it
to use only your design tokens and component classes — so anything it builds is
on-brand by default.

### Step 3. Describe what you want

Talk to Claude Code naturally. Good prompts name the feature folder and reference
the system. Examples:

> "In `prototypes/loyalty-dashboard/index.html`, build a rewards dashboard with
> three stat cards across the top (points balance, tier, rewards redeemed), then a
> table of recent activity below. Use the design system."

> "Add a filter bar above the table with a search input and a status dropdown.
> Keep everything in the existing tokens."

Because `CLAUDE.md` is loaded, you don't need to repeat the rules each time — but
it never hurts to end a prompt with "use only design-system classes and tokens."

### Step 4. Preview locally

```bash
npm run dev
```

Then open `http://localhost:3000/prototypes/loyalty-dashboard/`. Iterate with
Claude Code until it looks right. Ask it to check its own work against `CLAUDE.md`:

> "Review this file against CLAUDE.md and fix any hardcoded colors, spacing, or
> font values."

### Step 5. List it on the hub

Open the root `index.html` and duplicate the commented card block, pointing it at
your new folder:

```html
<a class="card card--interactive" href="./prototypes/loyalty-dashboard/" style="text-decoration:none;color:inherit;">
  <div class="card-body">
    <span class="badge badge-tuscany" style="margin-bottom:var(--space-3);">New</span>
    <h3 class="card-title">Loyalty dashboard</h3>
    <p class="card-text">Rewards balance, tier, and recent activity.</p>
  </div>
</a>
```

You can also ask Claude Code to do this step for you.

### Step 6. Publish

```bash
git add .
git commit -m "Add loyalty dashboard prototype"
git push
```

In about a minute the feature is live and shareable at:

```
https://YOUR-ORG.github.io/prototype-hub/prototypes/loyalty-dashboard/
```

Anyone on the team can open that URL on any device.

---

## Why this keeps prototypes consistent

| Mechanism | What it enforces |
|---|---|
| `design-system.css` imported by every prototype | Same colors, type, spacing, components |
| `CLAUDE.md` read automatically by Claude Code | Claude builds with tokens, never hardcodes |
| Tokens compiled from JSON | One edit updates every prototype at once |
| `_template` starter | Every feature begins correctly wired up |
| GitHub Actions | No manual build/deploy; push and it's live |

---

## Troubleshooting

- **Folder starting with `_` returns 404** — make sure `.nojekyll` exists at the
  repo root. Without it, GitHub Pages runs Jekyll and ignores `_template`.
- **CSS not loading on the live site** — check the import path is relative
  (`../../design-system/...`), not absolute (`/design-system/...`). Absolute paths
  break under the `/REPO-NAME/` subpath that project Pages sites use.
- **Tokens changed but site looks the same** — confirm the Action ran on the
  Actions tab, and hard-refresh (Pages caches aggressively).
- **Satoshi not showing** — it's a licensed font. Self-host it under
  `design-system/assets/fonts/` with `@font-face`, or accept the system fallback.
