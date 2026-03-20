# Changelog

## [2.0.0] — 2026-03-20

### Added
- Three complete theme variants: Butter Dark (flagship), Butter Light (warm parchment), Butter Soft (desaturated 2am mode)
- Butter Bear companion in the status bar with state machine (idle, coding, thinking, resting, celebrating, morning)
- Morning greeting on first activation of each day
- Semantic token highlighting (`semanticHighlighting: true`) for all three themes
- Complete terminal color harmony — ANSI colors match the warm palette
- Full workbench coverage: titleBar, activityBar, sideBar, tabs, statusBar, breadcrumbs, notifications, quickInput, menu, scrollbar, minimap, panel, peekView, diffEditor, mergeEditor, debugConsole, welcomePage
- Syntax coverage for JS/TS, Python, Rust, Go, Ruby, Java, C/C++, CSS/SCSS, HTML, Markdown, JSON, YAML, SQL, Shell
- Commands: `butter.switchTheme`, `butter.toggleCompanion`, `butter.companionMood`
- Configuration schema: `butter.companion.enabled`, `butter.companion.activityTimeout`, `butter.companion.morningGreeting`, `butter.companion.showMessages`
- TypeScript source: `src/extension.ts`, `src/companion.ts`, `src/statusBar.ts`
- `tsconfig.json`, `.vscodeignore`, `.gitignore`
- Full documentation in `docs/`

### Changed
- Complete palette redesign around warm golden amber — primary bg `#1e1b12`, primary accent `#c9a227`
- Rebuilt all three theme JSONs from scratch with full token coverage
- `package.json` rewritten with complete metadata, scripts, and devDependencies
- `README.md` rewritten
- Extension now has a `main` entry point and companion feature

### Removed
- Sample code files: hello.c, cat.py, recursion.py, Power_of_Two.cpp, bubblesort.cpp, Lab1.sql
- vsc-extension-quickstart.md boilerplate
- Original DarkButter-color-theme.json (superseded by butter-dark.json)

---

## [0.0.8] — 2021

- Initial dark theme release
- Single JSON theme file adapted from FireFly Pro
- Basic workbench and syntax coverage
