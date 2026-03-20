# Contributing to Butter

Thanks for wanting to make Butter better. This guide covers how to edit themes, test changes, and submit pull requests.

---

## Setup

```bash
git clone https://github.com/rohithsaai/butter.git
cd butter
npm install
```

Open the repo in VS Code:
```bash
code .
```

---

## Editing Themes

All three theme files are in `themes/`:

| File | Variant | Type |
|------|---------|------|
| `themes/butter-dark.json` | Butter Dark | dark |
| `themes/butter-light.json` | Butter Light | light |
| `themes/butter-soft.json` | Butter Soft | dark |

### Theme JSON Structure

```json
{
  "$schema": "vscode://schemas/color-theme",
  "name": "Butter Dark",
  "type": "dark",
  "semanticHighlighting": true,
  "colors": {
    // Workbench colors (UI elements)
    "editor.background": "#1e1b12",
    ...
  },
  "semanticTokenColors": {
    // Per-token-type semantic colors (language-aware)
    "function": "#e8c870",
    ...
  },
  "tokenColors": [
    // TextMate grammar rules (array)
    {
      "name": "Comments",
      "scope": ["comment"],
      "settings": { "foreground": "#6a6050", "fontStyle": "italic" }
    },
    ...
  ]
}
```

### Color Organization in `colors`

Workbench colors are grouped and commented by area:
1. Global (focusBorder, foreground, selection)
2. Text and links
3. Buttons, checkboxes, dropdowns, inputs
4. Lists and trees
5. Activity bar
6. Side bar
7. Minimap
8. Editor groups and tabs
9. Editor (background, selection, highlights, cursor, line numbers, bracket matching, indentation, whitespace, code lens)
10. Editor errors/warnings/info
11. Editor gutter and overview ruler
12. Editor widgets (hover, suggest, peek view)
13. Diff and merge editor
14. Panel and terminal
15. Status bar
16. Title bar and menus
17. Notifications and quick input
18. Breadcrumbs
19. Settings UI
20. Symbol icons
21. Git decorations
22. Debug
23. Extensions
24. Charts

### Testing Theme Changes

1. Make your edit in a theme JSON file
2. Press `F5` in VS Code to open an Extension Development Host
3. In the new window, open `Preferences: Color Theme` and select your variant
4. Changes reload automatically when you save the theme JSON

Alternatively:
- Install the [Color Highlight](https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight) extension to preview hex colors inline
- Use the VS Code built-in color picker (hover a hex value → click the color swatch)

### Checking Color Contrast

For accessibility and readability:
- Comments should be at least 3:1 contrast against the background (decorative)
- Code text should be at least 4.5:1 (WCAG AA for body text)
- Error/warning highlights should be distinguishable without relying on color alone

Recommended tool: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

## Editing the Companion (TypeScript)

Source is in `src/`:

```
src/
├── extension.ts    # Entry point
├── companion.ts    # State machine
└── statusBar.ts    # Status bar item
```

Compile:
```bash
npm run compile
```

Watch mode (auto-recompile on save):
```bash
npm run watch
```

Test in Extension Development Host:
1. Press `F5`
2. Check the status bar in the new window for the Bear
3. Open a file and start typing to trigger state changes

---

## Palette Conventions

When adding or changing colors, follow these rules:

| Rule | Detail |
|------|--------|
| No pure black | Use `#1e1b12` or darker, never `#000000` |
| No pure white | Use `#e8dfc8` or lighter, never `#ffffff` |
| Warm tint everywhere | All neutrals should have a slight amber/brown tint |
| Gold is the accent | Primary accent `#c9a227` — used sparingly |
| Comments are quiet | Comments should feel muted, not invisible |
| Cursor is always gold | `#c9a227` in Dark/Soft, `#c9a227` in Light |

### Palette Reference (Dark)

```
Background:   #1e1b12 (editor)   #1a1710 (sidebar)   #16130d (titlebar)
Foreground:   #e8dfc8 (primary)  #c8bc9c (secondary)  #7a7060 (muted)
Gold:         #c9a227 (primary)  #e8c870 (light)      #d4a843 (amber)
Orange:       #c47c3a (keyword)  #d4824a (secondary accent)
Green:        #8fbc6a (sage)     #7ab860 (success)
Red:          #c85050 (error)
Blue:         #6a8cc8
Cyan:         #60a8b0
Comments:     #6a6050
```

---

## Pull Request Guidelines

1. **One thing per PR.** Theme color change, new language support, companion feature — not all three.
2. **Describe the why.** Don't just say "changed #c8884a to #ca8840." Say why — what was wrong, what's better.
3. **Test all three variants.** A change to the dark theme often needs a parallel change in soft.
4. **No new dependencies** without discussion first.
5. **Keep the companion minimal.** It should never be intrusive. If in doubt, make it opt-in.

### PR Title Format

```
feat: add SCSS support for property values
fix: increase contrast on inactive tab foreground
chore: bump @types/vscode to 1.82
```

---

## Reporting Issues

Use [GitHub Issues](https://github.com/rohithsaai/butter/issues). Include:
- Which variant (Dark/Light/Soft)
- Which language or file type looks wrong
- A screenshot if possible
- Your VS Code version (`Help → About`)
