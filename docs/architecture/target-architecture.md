# Butter 2.0 — Target Architecture

## Extension Structure

```
Butter/
├── src/
│   ├── extension.ts        # Entry point, activate/deactivate
│   ├── companion.ts        # Companion state machine
│   └── statusBar.ts        # Status bar item manager
├── out/                    # Compiled TypeScript (gitignored)
│   ├── extension.js
│   ├── companion.js
│   └── statusBar.js
├── themes/
│   ├── butter-dark.json    # Flagship warm dark theme
│   ├── butter-light.json   # Warm parchment light theme
│   └── butter-soft.json    # Desaturated cozy night theme
├── docs/                   # Engineering and product docs
├── butter.png              # Marketplace icon (128x128)
├── package.json            # Extension manifest
├── tsconfig.json           # TypeScript configuration
├── .vscodeignore           # Files excluded from .vsix
├── .gitignore
├── README.md
├── CHANGELOG.md
├── CONTRIBUTING.md
└── LICENSE
```

---

## TypeScript Compilation

- **Compiler:** TypeScript via `tsc`
- **Target:** ES2020 (commonjs modules)
- **Output:** `./out/` directory
- **Source maps:** enabled for debugging
- **Strict mode:** enabled

Build commands:
```bash
npm run compile    # one-time build
npm run watch      # incremental watch build
npm run package    # vsce package → .vsix
npm run publish    # vsce publish to marketplace
```

The `main` field in `package.json` points to `./out/extension.js`. VS Code loads this file on activation. The extension activates on the `onStartupFinished` event to avoid blocking editor startup.

---

## Command List

| Command ID | Title | Description |
|-----------|-------|-------------|
| `butter.switchTheme` | Switch Butter Theme | Quick-pick between Dark, Light, Soft |
| `butter.toggleCompanion` | Toggle Butter Bear | Show or hide the companion |
| `butter.companionMood` | Show Bear's Mood | Display current companion mood message |

---

## Configuration Schema

```
butter.companion.enabled          boolean  true    Enable/disable Butter Bear
butter.companion.activityTimeout  number   30000   ms of inactivity before "resting" state
butter.companion.morningGreeting  boolean  true    Show morning greeting on first activation
butter.companion.showMessages     boolean  true    Show state-change notifications
```

All settings are in the `butter` namespace and configurable via VS Code settings UI or `settings.json`.

---

## Theme Token Organization

Each theme JSON follows this structure:

```json
{
  "$schema": "vscode://schemas/color-theme",
  "name": "...",
  "type": "dark|light",
  "semanticHighlighting": true,
  "colors": {
    // Workbench colors grouped by area:
    // - Editor
    // - Editor widgets (suggest, hover, peekView)
    // - Editor gutter and overview ruler
    // - List and tree
    // - Sidebar
    // - Activity bar
    // - Tab groups
    // - Title bar
    // - Status bar
    // - Menu and dropdowns
    // - Input and buttons
    // - Notifications
    // - Panel and terminal
    // - Breadcrumbs
    // - Minimap
    // - Scrollbar
    // - Git decorations
    // - Diff editor
    // - Extension buttons
  },
  "semanticTokenColors": {
    // Per-token-type semantic overrides
    // function, method, variable, parameter, property,
    // class, interface, type, enum, enumMember,
    // namespace, module, string, number, keyword,
    // comment, decorator, macro
  },
  "tokenColors": [
    // TextMate grammar rules (array of scope objects)
    // Ordered: most specific → most general
    // Covers: JS/TS, Python, Rust, Go, Ruby, Java,
    //         C/C++, CSS/SCSS, HTML, Markdown,
    //         JSON, YAML, SQL, Shell
  ]
}
```

---

## Companion System

### State Machine

States: `idle` | `coding` | `thinking` | `resting` | `celebrating` | `morning`

Transitions:
- `morning`: first activation of the day (checked against stored date)
- `coding`: typing activity detected (document change event)
- `thinking`: 10s pause after coding (debounced)
- `resting`: `activityTimeout` ms of no activity
- `celebrating`: file save with no errors, or task completion
- `idle`: default state

### Activity Detection
- `vscode.workspace.onDidChangeTextDocument` → set `coding` state, reset debounce timer
- `vscode.workspace.onDidSaveTextDocument` → check diagnostics, set `celebrating` or `coding`
- `vscode.languages.onDidChangeDiagnostics` → update state if errors present
- Timer: debounce 10s for `thinking`, 30s (configurable) for `resting`

### Message Arrays
Each state has an array of messages. On state entry, one is selected at random. Messages are personality-driven, warm, brief.

### Persistence
- Last-seen date stored in `context.globalState` to detect first activation of day
- Companion enabled/disabled state read from workspace configuration

---

## Build Pipeline

```
src/*.ts
    ↓ tsc
out/*.js + out/*.js.map
    ↓ vsce package
butter-2.x.x.vsix
    ↓ vsce publish
VS Code Marketplace
```

### Pre-packaging checklist
1. `npm run compile` succeeds with no errors
2. All three theme JSONs validate against `vscode://schemas/color-theme`
3. `.vscodeignore` excludes `src/`, `docs/`, `out/maps/`, `*.ts`, `*.map`
4. `package.json` version bumped
5. `CHANGELOG.md` updated

---

## Packaging

The published `.vsix` contains:
- `out/` (compiled JS)
- `themes/` (3 JSON files)
- `butter.png`
- `package.json`
- `README.md`
- `CHANGELOG.md`
- `LICENSE`

It does NOT contain:
- `src/` (TypeScript source)
- `docs/` (engineering docs)
- `node_modules/`
- `*.map` files
- `tsconfig.json`
- `.gitignore`

Estimated `.vsix` size: < 200KB
