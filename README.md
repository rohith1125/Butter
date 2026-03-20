# Butter

> A warm golden theme with a cozy companion. Easy on your eyes, hard to uninstall.

<!-- screenshots: see /docs/screenshots/ once generated -->

## Why Butter

Most dark themes are cold: neon purple on pure black, or blue-gray on dark navy. Beautiful for screenshots. Tiring after three hours.

Butter is built on deep amber and gold — the color of warm lamp light, not a server room. Every decision asks: *does this hurt after four hours?*

- **Warm, not harsh.** Golden amber instead of neon-on-black. Middle-ground contrast that doesn't fatigue.
- **Three variants.** Dark for evening, Light for daytime, Soft for 2am.
- **Butter Bear.** A tiny companion in your status bar that reacts to what you're doing. Optional, opt-out, never annoying.
- **Complete coverage.** Every token defined. JS/TS, Python, Rust, Go, Ruby, Java, C/C++, CSS, HTML, Markdown, JSON, YAML, SQL — no surprises in a new language.
- **Semantic highlighting.** Modern VS Code semantic token support fully implemented.

---

## Themes

### Butter Dark
The flagship. Deep amber backgrounds (`#1e1b12`), gold syntax, warm terminal. Designed for evening and long sessions. The status bar stays gold — always.

### Butter Light
Warm parchment. Like writing on good paper under a lamp. Background `#fdf8ec` (cream, not white). Dark amber syntax on warm beige. Status bar stays gold for brand consistency.

### Butter Soft
Same palette as Dark, pulled toward neutral. Everything desaturated ~30%. For 2am coding when even Dark feels like too much. Only the cursor stays bright gold — so you always know where you are.

---

## Installation

**Via Marketplace:**
1. Open VS Code
2. Go to Extensions (`Cmd+Shift+X` / `Ctrl+Shift+X`)
3. Search "Butter"
4. Install, select theme, done.

**Via Command Palette:**
```
Ctrl+Shift+P → Preferences: Color Theme → Butter Dark / Butter Light / Butter Soft
```

**Switch between variants:**
```
Ctrl+Shift+P → Butter: Switch Butter Theme
```

---

## Butter Bear (Companion)

Butter Bear lives in your status bar and reacts to what you're doing.

| What you're doing | Bear's state |
|---|---|
| First activation of the day | Morning greeting |
| Actively typing | Coding |
| Paused for ~10 seconds | Thinking |
| Away for a while | Resting |
| Saved with no errors | Celebrating |
| Nothing happening | Idle |

Bear is **on by default**. To disable:

```json
"butter.companion.enabled": false
```

Click the Bear in the status bar to see the current mood.

---

## Configuration

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `butter.companion.enabled` | boolean | `true` | Enable/disable Butter Bear |
| `butter.companion.activityTimeout` | number | `30000` | Ms of inactivity before resting state |
| `butter.companion.morningGreeting` | boolean | `true` | Show morning notification |
| `butter.companion.showMessages` | boolean | `true` | Show state-change notifications |

---

## Commands

| Command | Description |
|---------|-------------|
| `butter.switchTheme` | Quick-pick between Dark, Light, Soft |
| `butter.toggleCompanion` | Show or hide Butter Bear |
| `butter.companionMood` | Display current Bear mood |

Access via `Ctrl+Shift+P` → type "Butter".

---

## Fonts That Pair Well

These are free and look great with Butter's warm palette:

- **JetBrains Mono** — Excellent ligatures, very readable. [Download](https://www.jetbrains.com/lp/mono/)
- **Fira Code** — Classic ligature font, warm at any size. [Download](https://github.com/tonsky/FiraCode)
- **Cascadia Code** — Microsoft's offering, clean and modern. [Download](https://github.com/microsoft/cascadia-code)

Recommended settings:
```json
"editor.fontFamily": "JetBrains Mono, Fira Code, Cascadia Code, monospace",
"editor.fontLigatures": true,
"editor.fontSize": 14,
"editor.lineHeight": 1.6
```

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to edit themes, test changes, and submit pull requests.

Bug reports and feature requests: [GitHub Issues](https://github.com/rohithsaai/butter/issues)

---

## License

MIT — see [LICENSE](LICENSE)

---

*Built with warmth. Designed for the long session.*
