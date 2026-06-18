# CLAUDE.md — Design System Prototyping Rules

This file governs every prototype built in this repo. Claude Code reads it
automatically. Follow every rule here before writing any HTML, CSS, or JS.

---

## 1. Always import the design system first

This is a multi-feature repo. Every prototype lives in its own folder under
`/prototypes/FEATURE-NAME/`. Import the design system with a RELATIVE path so the
same file works both locally and on GitHub Pages:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Overpass:wght@400;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3/dist/tabler-icons.min.css">
<link rel="stylesheet" href="../../design-system/dist/design-system.css">
```

From `/prototypes/FEATURE-NAME/index.html`, the path back to the design system is
always `../../design-system/...`. Never copy-paste token values into a prototype —
always import and reference.

Satoshi is a commercial font. If you have a license, self-host the files in
`/design-system/assets/fonts/` and reference them via `@font-face`. Otherwise the
system falls back to Overpass + system fonts automatically.

---

## 2. Brand identity

We operate three brands. Use the correct name and voice for the prototype context.

| Brand | What it is | Voice |
|---|---|---|
| **Snackmagic** | Snack gifting platform | Fun, surprising, indulgent |
| **Swagmagic** | Branded merch & swag | Bold, professional, energetic |
| **Stadium** | Group gifting/rewards | Warm, inclusive, celebratory |

Spell brand names exactly as above — never "snack magic", "SwagMagic", or "stadium".

---

## 3. Color tokens — never hardcode hex values

All colors must use CSS custom properties. Direct hex values in CSS are a build error.

### Primary palette

```css
/* Use these tokens, never the raw hex */
var(--color-punch)      /* #FF5B77 — primary CTA, highlights */
var(--color-lime)       /* #00C036 — success, growth, positive actions */
var(--color-tuscany)    /* #FFB800 — warnings, featured, attention */
var(--color-lilac)      /* #8D12E7 — premium, magic moments */
var(--color-morocco)    /* #0B7AFC — links, info states, interactive */
```

### Dark / on-color text

```css
var(--color-plum)       /* #7D102E — text on Punch backgrounds */
var(--color-parsley)    /* #226104 — text on Lime backgrounds */
var(--color-bronze)     /* #674F02 — text on Tuscany backgrounds */
var(--color-indigo)     /* #4C0E7A — text on Lilac backgrounds */
var(--color-sapphire)   /* #083467 — text on Morocco backgrounds */
```

### Neutral / semantic

```css
var(--color-bg)             /* page background */
var(--color-surface)        /* card / panel background */
var(--color-surface-raised) /* elevated card */
var(--color-border)         /* default border: 0.5px solid */
var(--color-border-strong)  /* hover/focus border */
var(--color-text-primary)   /* main body copy */
var(--color-text-secondary) /* muted labels, captions */
var(--color-text-tertiary)  /* placeholder, hint text */
var(--color-success)        /* semantic green (≠ Lime) */
var(--color-warning)        /* semantic amber */
var(--color-danger)         /* semantic red */
var(--color-info)           /* semantic blue */
```

### Rule
If a color value isn't in this list, ask whether a token should be added to the
system — don't invent a one-off hex.

---

## 4. Typography — Satoshi headers, Overpass body

```css
var(--font-display)   /* Satoshi — headings, hero text, labels */
var(--font-body)      /* Overpass — body copy, descriptions, captions */
var(--font-mono)      /* system mono — code, IDs, technical strings */
```

### Type scale

```css
var(--text-xs)     /* 11px */
var(--text-sm)     /* 13px */
var(--text-base)   /* 15px */
var(--text-md)     /* 17px */
var(--text-lg)     /* 20px */
var(--text-xl)     /* 24px */
var(--text-2xl)    /* 30px */
var(--text-3xl)    /* 38px */
var(--text-4xl)    /* 48px */
```

### Weight tokens

```css
var(--weight-regular)  /* 400 */
var(--weight-medium)   /* 500 */
var(--weight-bold)     /* 700 */
```

### Rules
- Headings always use `var(--font-display)`.
- Body paragraphs always use `var(--font-body)`.
- Never set `font-family` to a literal string — always use the token.
- Never use font weights other than 400, 500, 700.

---

## 5. Spacing — 4px base grid

All spacing must be a multiple of 4px, expressed via tokens:

```css
var(--space-1)   /* 4px */
var(--space-2)   /* 8px */
var(--space-3)   /* 12px */
var(--space-4)   /* 16px */
var(--space-5)   /* 20px */
var(--space-6)   /* 24px */
var(--space-8)   /* 32px */
var(--space-10)  /* 40px */
var(--space-12)  /* 48px */
var(--space-16)  /* 64px */
var(--space-20)  /* 80px */
var(--space-24)  /* 96px */
```

Never write `margin: 18px` or `padding: 7px`. Round to the nearest token.

---

## 6. Border radius

```css
var(--radius-sm)    /* 4px  — tags, badges, small elements */
var(--radius-md)    /* 8px  — buttons, inputs, small cards */
var(--radius-lg)    /* 12px — cards, panels */
var(--radius-xl)    /* 16px — modals, drawers */
var(--radius-2xl)   /* 24px — hero cards, feature sections */
var(--radius-full)  /* 9999px — pills, avatars */
```

---

## 7. Component classes — always use these, never reinvent them

### Buttons

```html
<!-- Primary CTA -->
<button class="btn btn-primary">Send snacks</button>

<!-- Secondary / outline -->
<button class="btn btn-secondary">View options</button>

<!-- Ghost / subtle -->
<button class="btn btn-ghost">Cancel</button>

<!-- Destructive -->
<button class="btn btn-danger">Remove</button>

<!-- Sizes: btn-sm (32px), default (40px), btn-lg (48px) -->
<button class="btn btn-primary btn-lg">Get started</button>

<!-- Icon + label -->
<button class="btn btn-primary">
  <i class="ti ti-gift" aria-hidden="true"></i> Send gift
</button>

<!-- Loading state -->
<button class="btn btn-primary" aria-busy="true" disabled>
  <span class="btn-spinner"></span> Sending…
</button>
```

### Inputs and form elements

```html
<div class="form-group">
  <label class="form-label" for="recipient">Recipient email</label>
  <input class="form-input" type="email" id="recipient" placeholder="name@company.com">
  <p class="form-hint">We'll send a delivery notification here.</p>
</div>

<!-- Error state -->
<div class="form-group form-group--error">
  <label class="form-label" for="budget">Budget</label>
  <input class="form-input" type="number" id="budget" aria-describedby="budget-error">
  <p class="form-error" id="budget-error">Minimum budget is $10.</p>
</div>

<!-- Select -->
<select class="form-select">
  <option value="">Choose a category</option>
  <option value="snacks">Snacks</option>
</select>

<!-- Textarea -->
<textarea class="form-input" rows="3" placeholder="Personal message…"></textarea>
```

### Cards

```html
<!-- Standard card -->
<div class="card">
  <div class="card-body">
    <h3 class="card-title">Snack pack</h3>
    <p class="card-text">Curated selection of 12 items.</p>
  </div>
</div>

<!-- Interactive / selectable card -->
<div class="card card--interactive" role="button" tabindex="0">…</div>

<!-- Selected state -->
<div class="card card--interactive card--selected">…</div>

<!-- Card with image -->
<div class="card">
  <img class="card-image" src="…" alt="…">
  <div class="card-body">…</div>
</div>
```

### Badges and tags

```html
<!-- Semantic status -->
<span class="badge badge-success">Delivered</span>
<span class="badge badge-warning">Pending</span>
<span class="badge badge-danger">Failed</span>
<span class="badge badge-info">Processing</span>

<!-- Brand color pills -->
<span class="badge badge-punch">New</span>
<span class="badge badge-lime">Active</span>
<span class="badge badge-tuscany">Featured</span>
<span class="badge badge-lilac">Premium</span>
```

### Navigation

```html
<nav class="nav-tabs" role="tablist">
  <button class="nav-tab nav-tab--active" role="tab" aria-selected="true">Overview</button>
  <button class="nav-tab" role="tab" aria-selected="false">Orders</button>
  <button class="nav-tab" role="tab" aria-selected="false">Settings</button>
</nav>
```

### Avatar

```html
<!-- Image avatar -->
<img class="avatar avatar-md" src="…" alt="Maya Rodriguez">

<!-- Initials fallback -->
<div class="avatar avatar-md avatar--initials" aria-label="Maya Rodriguez">MR</div>

<!-- Sizes: avatar-sm (24px), avatar-md (36px), avatar-lg (48px), avatar-xl (64px) -->
```

### Stat / metric cards

```html
<div class="stat-card">
  <p class="stat-label">Total orders</p>
  <p class="stat-value">1,248</p>
  <p class="stat-delta stat-delta--up">+12% this month</p>
</div>
```

### Alerts and toasts

```html
<div class="alert alert-success" role="alert">
  <i class="ti ti-circle-check" aria-hidden="true"></i>
  Your order has been placed.
</div>

<div class="alert alert-warning" role="alert">
  <i class="ti ti-alert-triangle" aria-hidden="true"></i>
  Budget is 90% used.
</div>
```

---

## 8. Icons — Tabler outline only

Use Tabler Icons (already loaded via the design system CSS):

```html
<i class="ti ti-gift" aria-hidden="true"></i>
<i class="ti ti-package" aria-hidden="true"></i>
<i class="ti ti-star" aria-hidden="true"></i>
```

Rules:
- Outline variants only. Never `-filled` suffixes.
- Decorative icons get `aria-hidden="true"`.
- Icon-only buttons must have `aria-label`.
- Size via `font-size`: 16px inline, 20px standard UI, 24px max decorative.
- Browse icons at tabler.io/icons — search by concept, not by guessing names.

---

## 9. The Sprinkle logo mark

The half-star "Sprinkle" symbol is the shared logo element across all three brands.
When a prototype needs a logo placeholder:

```html
<div class="logo-mark" aria-label="Snackmagic logo">
  <img src="../../design-system/assets/sprinkle.svg" alt="">
</div>
```

Never recreate the logo in ad hoc HTML or CSS — always use the asset.

---

## 10. Layout patterns

### Page shell

```html
<body class="page">
  <header class="page-header">…</header>
  <main class="page-main">
    <div class="container">
      <!-- content -->
    </div>
  </main>
  <footer class="page-footer">…</footer>
</body>
```

Container max-widths:
- `container` → 1200px centered
- `container-sm` → 768px centered
- `container-xs` → 480px centered

### Grid

```html
<!-- 2-up on tablet+, 1-up on mobile -->
<div class="grid grid-cols-2">…</div>

<!-- 3-up on desktop, 2-up tablet, 1-up mobile -->
<div class="grid grid-cols-3">…</div>

<!-- 4-up (auto-collapse) -->
<div class="grid grid-cols-4">…</div>
```

### Stack (vertical rhythm)

```html
<div class="stack stack-md">  <!-- 16px between children -->
  <p>…</p>
  <p>…</p>
</div>
```

Stack sizes: `stack-sm` (8px), `stack-md` (16px), `stack-lg` (24px), `stack-xl` (40px).

---

## 11. Accessibility requirements (non-negotiable)

Every prototype must meet these minimums:

- All images have meaningful `alt` text (or `alt=""` for decorative).
- All form inputs have a `<label>` associated via `for`/`id` or `aria-label`.
- All icon-only buttons have `aria-label`.
- Interactive elements are keyboard-reachable and have visible focus styles.
  The design system provides focus styles — do not override `outline: none` without
  a custom replacement.
- Color is never the only way information is conveyed (add an icon or label).
- Heading hierarchy is logical: one `<h1>` per page, then `<h2>`, `<h3>`, etc.
- Never use `tabindex` values greater than 0.
- Status messages use `role="alert"` or `role="status"` so screen readers announce them.
- Respect `prefers-reduced-motion`: wrap all animations in:
  ```css
  @media (prefers-reduced-motion: no-preference) {
    /* animation here */
  }
  ```

---

## 12. What NOT to do

| ❌ Don't | ✅ Do instead |
|---|---|
| `color: #FF5B77` | `color: var(--color-punch)` |
| `font-family: 'Satoshi'` | `font-family: var(--font-display)` |
| `margin: 18px` | `margin: var(--space-4)` (16px) |
| `border-radius: 10px` | `border-radius: var(--radius-md)` |
| `font-weight: 600` | `font-weight: var(--weight-bold)` (700) |
| Custom `<button>` styles | `class="btn btn-primary"` |
| Inline `style="background: …"` for brand colors | Use component classes |
| `ti-gift-filled` | `ti-gift` (outline only) |
| Recreating the Sprinkle SVG in HTML | Use the asset from the CDN |
| Any `!important` declarations | Fix specificity properly |

---

## 13. Reference links

| Resource | URL |
|---|---|
| Prototype hub (live) | `https://YOUR-ORG.github.io/REPO-NAME/` |
| Component gallery | `https://YOUR-ORG.github.io/REPO-NAME/prototypes/snack-checkout/` |
| Figma source | [add your Figma file URL here] |
| Tabler icons | `https://tabler.io/icons` |

---

## 14. Adding a new feature

1. Copy the starter: `cp -r prototypes/_template prototypes/my-feature`
2. Open the repo in Claude Code and describe the feature you want.
3. Claude Code reads this file and builds using only system tokens and classes.
4. Test locally: `npx serve .` then open `http://localhost:3000/prototypes/my-feature/`
5. Add a card linking to it in the root `index.html`.
6. Commit and push to `main` — GitHub Actions publishes it automatically.

Live URL pattern: `https://YOUR-ORG.github.io/REPO-NAME/prototypes/my-feature/`

---

*Last updated: June 2026. If a component or token is missing, add it to
`/design-system` and rebuild — do not invent local workarounds in a prototype.*
