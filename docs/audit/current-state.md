# Butter 0.0.8 — Engineering Audit

## What It Was

Butter 0.0.8 was a single dark VS Code color theme published by SaiRohith to the VS Code Marketplace. It described itself as "an adaptation of FireFly Pro" and was tagged with keywords referencing IronMan, Marvel, and a dozen competing themes (One Dark Pro listed twice). Version 0.0.8 was the latest release as of early 2021.

## Repository Structure (Pre-2.0)

```
Butter/
├── themes/
│   └── DarkButter-color-theme.json   # only theme file
├── butter.png                          # marketplace icon
├── package.json                        # minimal extension manifest
├── README.md                           # sparse
├── CHANGELOG.md                        # minimal
├── LICENSE                             # MIT
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── vsc-extension-quickstart.md         # VS Code boilerplate
├── hello.c                             # unrelated sample code
├── cat.py                              # unrelated sample code
├── recursion.py                        # unrelated sample code
├── Power_of_Two.cpp                    # unrelated sample code
├── bubblesort.cpp                      # unrelated sample code
└── Lab1.sql                            # unrelated sample code
```

### Key Observations
- No TypeScript source — purely a JSON theme, no extension behavior
- No `tsconfig.json`, no `src/` directory, no compiled output
- `package.json` missing `main` field, `scripts`, devDependencies, and most metadata
- `galleryBanner.color: "#0e1421"` conflicts with the "warm golden" premise
- Keywords were SEO-spam rather than descriptive

## Theme File: DarkButter-color-theme.json

### Strengths
- Covered basic workbench colors: titleBar, input, dropdown, button, sidebar
- Had terminal color definitions
- Had a `tokenColors` array with some syntax rules
- Used a consistently dark background (near-black)

### Weaknesses
- **Pure black backgrounds** (#000000 in multiple places) — known cause of eye strain
- **Cool blue accent** (#0052bd button bg) — contradicts any warm/buttery identity
- **Cold foreground palette** (#a0a8bd has a blue cast) — not warm
- **Sparse tokenColors** — many language constructs left unstyled, falling back to default
- **No semantic token support** — `semanticHighlighting` not enabled
- **No light variant**, no soft/cozy variant
- **Incomplete coverage** — missing breadcrumbs, notifications, quickInput, minimap, panel, merge editor, peekView, and many other workbench sections
- **Self-description as "adaptation"** — no original design identity
- **No companion feature**, no commands, no configuration schema

### Color Identity Problem
The theme had no buttery warmth. The name "Butter" was aspirational rather than descriptive. The actual palette leaned blue-gray-black — closer to a generic dark theme than anything warm or golden.

## Risks Preserved From 0.0.8
- None. No user-contributed code or design decisions were worth preserving beyond the theme name, icon, and MIT license.

## What Was Preserved in 2.0
- `butter.png` (icon)
- `LICENSE` (MIT)
- `.git/` (version history)
- Theme name "Butter" and the core promise of a warm theme

## What Was Removed in 2.0
- All six sample code files (hello.c, cat.py, recursion.py, Power_of_Two.cpp, bubblesort.cpp, Lab1.sql)
- Boilerplate docs (vsc-extension-quickstart.md, CODE_OF_CONDUCT.md, CONTRIBUTING.md — replaced)
- The original DarkButter-color-theme.json (superseded by three new theme files)

## What Was Rewritten in 2.0
- `package.json` — complete rewrite with full metadata, contributes, configuration, scripts, dependencies
- `README.md` — complete rewrite
- `CHANGELOG.md` — complete rewrite
- Theme JSON — three complete files replacing the single incomplete one
- Added: `src/extension.ts`, `src/companion.ts`, `src/statusBar.ts`
- Added: `tsconfig.json`, `.vscodeignore`, `.gitignore`
- Added: Full `docs/` directory with audit, research, product, architecture, and release docs
