# Butter Bear Full Revamp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 7 new Darcula-calibrated themes (10 total), implement bear prestige system, and revamp README.

**Architecture:** All themes share amber (#c9a227 family) as keyword accent — the Butter Bear brand thread. Bear prestige wraps back to Cub after Legend with a 🌟 prefix. Each theme JSON is derived from butter-dark.json structure with variant-specific palette.

**Tech Stack:** TypeScript, VS Code Extension API, JSON color themes

---

## Color Palettes Reference

| Variant | bg | fg | accent | keyword | string | func | class |
|---------|----|----|--------|---------|--------|------|-------|
| Dark (existing) | #1e1b12 | #e8dfc8 | #c9a227 | #c47c3a | #d4a843 | #e8c870 | #d4956a |
| Midnight | #0d1117 | #c9d1d9 | #e8a838 | #e8a838 | #79c0ff | #d2a8ff | #ffa657 |
| Mocha | #1e1208 | #e8d5b0 | #d4a064 | #d4a064 | #f5c842 | #e8c870 | #c08040 |
| Storm | #0d1626 | #c0d8f0 | #f0c060 | #f0c060 | #9ecbff | #c792ea | #ffa657 |
| Rose | #1e1015 | #f0c8d0 | #e8a838 | #e8a838 | #f5a0c0 | #dba0c0 | #c78080 |
| Forest | #0d1a0f | #c8e0c0 | #f0c060 | #f0c060 | #80c080 | #a8d080 | #70a868 |
| AMOLED | #000000 | #ffe0a0 | #ffa500 | #ffa500 | #ffcc66 | #cc88ff | #ff9944 |
| HC | #000000 | #ffffff | #ffcc00 | #ffcc00 | #ffaa00 | #00ff88 | #ff88cc |

---

## Task 1: Butter Midnight Theme

**Files:**
- Create: `themes/butter-midnight.json`

- [ ] Create `themes/butter-midnight.json` with full theme using palette: bg=#0d1117, fg=#c9d1d9, accent=#e8a838, keyword=#e8a838, string=#79c0ff, func=#d2a8ff, class=#ffa657. Copy structure from butter-dark.json replacing every color systematically. Set `"name": "Butter Midnight"`, `"type": "dark"`.

Key color mappings from dark → midnight:
- `#1e1b12` (editor bg) → `#0d1117`
- `#16130d` (deepest bg) → `#090d0f`
- `#252015` (widget bg) → `#161b22`
- `#2a2416` (hover bg) → `#1c2128`
- `#2e2918` (selection bg) → `#1f2937`
- `#4a4438` (border) → `#30363d`
- `#1a1710` (panel bg) → `#0d1117`
- `#e8dfc8` (fg) → `#c9d1d9`
- `#c8bc9c` (muted fg) → `#8b949e`
- `#5a5040` (dim fg) → `#484f58`
- `#c9a227` (accent) → `#e8a838`
- `#c47c3a` (keyword) → `#e8a838`
- `#d4a843` (string) → `#79c0ff`
- `#e8c870` (func) → `#d2a8ff`
- `#d4956a` (class) → `#ffa657`
- `#7ab860` (green/added) → `#3fb950`
- `#c85050` (error/red) → `#f85149`
- `#60a8b0` (info/cyan) → `#58a6ff`
- `#b87090` (magenta) → `#bc8cff`
- `#2a2416` (statusbar bg) → `#161b22`

- [ ] Commit: `git add themes/butter-midnight.json && git commit -m "feat: add Butter Midnight theme"`

---

## Task 2: Butter Mocha Theme

**Files:**
- Create: `themes/butter-mocha.json`

- [ ] Create `themes/butter-mocha.json` with palette: bg=#1e1208, fg=#e8d5b0, accent=#d4a064, keyword=#d4a064, string=#f5c842, func=#e8c870, class=#c08040. Copy structure from butter-dark.json.

Key color mappings from dark → mocha:
- `#1e1b12` → `#1e1208`
- `#16130d` → `#170e05`
- `#252015` → `#261a0d`
- `#2a2416` → `#2c1f0f`
- `#2e2918` → `#342516`
- `#4a4438` → `#4a3520`
- `#1a1710` → `#1a1008`
- `#e8dfc8` → `#e8d5b0`
- `#c8bc9c` → `#c8ae88`
- `#5a5040` → `#6a4e30`
- `#c9a227` → `#d4a064`
- `#c47c3a` → `#d4a064`
- `#d4a843` → `#f5c842`
- `#e8c870` → `#e8c870`
- `#d4956a` → `#c08040`
- `#7ab860` → `#8fc870`
- `#c85050` → `#c85050`
- `#60a8b0` → `#60a8b0`
- `#2a2416` (statusbar bg) → `#2c1f0f`

- [ ] Commit: `git add themes/butter-mocha.json && git commit -m "feat: add Butter Mocha theme"`

---

## Task 3: Butter Storm Theme

**Files:**
- Create: `themes/butter-storm.json`

- [ ] Create `themes/butter-storm.json` with palette: bg=#0d1626, fg=#c0d8f0, accent=#f0c060, keyword=#f0c060, string=#9ecbff, func=#c792ea, class=#ffa657. Copy structure from butter-dark.json.

Key color mappings dark → storm:
- `#1e1b12` → `#0d1626`
- `#16130d` → `#08101c`
- `#252015` → `#1a2535`
- `#2a2416` → `#1f2d40`
- `#2e2918` → `#243347`
- `#4a4438` → `#2d4060`
- `#1a1710` → `#0d1626`
- `#e8dfc8` → `#c0d8f0`
- `#c8bc9c` → `#88aac8`
- `#5a5040` → `#3a5068`
- `#c9a227` → `#f0c060`
- `#c47c3a` → `#f0c060`
- `#d4a843` → `#9ecbff`
- `#e8c870` → `#c792ea`
- `#d4956a` → `#ffa657`
- `#7ab860` → `#7dcfb0`
- `#c85050` → `#f07070`
- `#60a8b0` → `#79c0ff`
- `#2a2416` (statusbar bg) → `#0a1220`

- [ ] Commit: `git add themes/butter-storm.json && git commit -m "feat: add Butter Storm theme"`

---

## Task 4: Butter Rose Theme

**Files:**
- Create: `themes/butter-rose.json`

- [ ] Create `themes/butter-rose.json` with palette: bg=#1e1015, fg=#f0c8d0, accent=#e8a838, keyword=#e8a838, string=#f5a0c0, func=#dba0c0, class=#c78080.

Key color mappings dark → rose:
- `#1e1b12` → `#1e1015`
- `#16130d` → `#160c10`
- `#252015` → `#261520`
- `#2a2416` → `#2c1a22`
- `#2e2918` → `#341e28`
- `#4a4438` → `#4a3040`
- `#1a1710` → `#1a0e14`
- `#e8dfc8` → `#f0c8d0`
- `#c8bc9c` → `#c8a0b0`
- `#5a5040` → `#6a4050`
- `#c9a227` → `#e8a838`
- `#c47c3a` → `#e8a838`
- `#d4a843` → `#f5a0c0`
- `#e8c870` → `#dba0c0`
- `#d4956a` → `#c78080`
- `#7ab860` → `#88c880`
- `#c85050` → `#e06060`
- `#60a8b0` → `#a0b8d8`
- `#2a2416` (statusbar bg) → `#2c1520`

- [ ] Commit: `git add themes/butter-rose.json && git commit -m "feat: add Butter Rose theme"`

---

## Task 5: Butter Forest Theme

**Files:**
- Create: `themes/butter-forest.json`

- [ ] Create `themes/butter-forest.json` with palette: bg=#0d1a0f, fg=#c8e0c0, accent=#f0c060, keyword=#f0c060, string=#80c080, func=#a8d080, class=#70a868.

Key color mappings dark → forest:
- `#1e1b12` → `#0d1a0f`
- `#16130d` → `#08100a`
- `#252015` → `#142018`
- `#2a2416` → `#182818`
- `#2e2918` → `#1e301e`
- `#4a4438` → `#304838`
- `#1a1710` → `#0d1a0f`
- `#e8dfc8` → `#c8e0c0`
- `#c8bc9c` → `#98b890`
- `#5a5040` → `#406040`
- `#c9a227` → `#f0c060`
- `#c47c3a` → `#f0c060`
- `#d4a843` → `#80c080`
- `#e8c870` → `#a8d080`
- `#d4956a` → `#70a868`
- `#7ab860` → `#60c060`
- `#c85050` → `#c06060`
- `#60a8b0` → `#70b8a0`
- `#2a2416` (statusbar bg) → `#102015`

- [ ] Commit: `git add themes/butter-forest.json && git commit -m "feat: add Butter Forest theme"`

---

## Task 6: Butter AMOLED Theme

**Files:**
- Create: `themes/butter-amoled.json`

- [ ] Create `themes/butter-amoled.json` with palette: bg=#000000, fg=#ffe0a0, accent=#ffa500, keyword=#ffa500, string=#ffcc66, func=#cc88ff, class=#ff9944. Pure black everywhere — intentional for OLED battery savings.

Key color mappings dark → amoled:
- `#1e1b12` → `#000000`
- `#16130d` → `#000000`
- `#252015` → `#0d0d0d`
- `#2a2416` → `#111111`
- `#2e2918` → `#161616`
- `#4a4438` → `#2a2a2a`
- `#1a1710` → `#000000`
- `#e8dfc8` → `#ffe0a0`
- `#c8bc9c` → `#c8a878`
- `#5a5040` → `#555555`
- `#c9a227` → `#ffa500`
- `#c47c3a` → `#ffa500`
- `#d4a843` → `#ffcc66`
- `#e8c870` → `#cc88ff`
- `#d4956a` → `#ff9944`
- `#7ab860` → `#66cc88`
- `#c85050` → `#ff5555`
- `#60a8b0` → `#55aacc`
- `#2a2416` (statusbar bg) → `#000000`

- [ ] Commit: `git add themes/butter-amoled.json && git commit -m "feat: add Butter AMOLED theme"`

---

## Task 7: Butter HC Theme

**Files:**
- Create: `themes/butter-hc.json`

- [ ] Create `themes/butter-hc.json` with palette: bg=#000000, fg=#ffffff, accent=#ffcc00, keyword=#ffcc00, string=#ffaa00, func=#00ff88, class=#ff88cc. Max contrast for WCAG AAA accessibility.

Key color mappings dark → hc:
- `#1e1b12` → `#000000`
- `#16130d` → `#000000`
- `#252015` → `#0a0a0a`
- `#2a2416` → `#111111`
- `#2e2918` → `#181818`
- `#4a4438` → `#333333`
- `#1a1710` → `#000000`
- `#e8dfc8` → `#ffffff`
- `#c8bc9c` → `#dddddd`
- `#5a5040` → `#888888`
- `#c9a227` → `#ffcc00`
- `#c47c3a` → `#ffcc00`
- `#d4a843` → `#ffaa00`
- `#e8c870` → `#00ff88`
- `#d4956a` → `#ff88cc`
- `#7ab860` → `#00ff00`
- `#c85050` → `#ff4444`
- `#60a8b0` → `#00ccff`
- `#2a2416` (statusbar bg) → `#000000`

- [ ] Commit: `git add themes/butter-hc.json && git commit -m "feat: add Butter HC theme"`

---

## Task 8: Prestige System in bearState.ts

**Files:**
- Modify: `src/bearState.ts`

- [ ] Add `prestigeLevel: number` (default 0) to `BearStateData` interface and `DEFAULT_STATE`.

- [ ] Update `GROWTH_STAGES` — change the Legend Bear (level 4) `xpToNext` from `Infinity` to `5000` so prestige is reachable.

- [ ] Add `prestige()` method to `BearStateManager`:
```typescript
prestige(): { newPrestigeLevel: number } {
  this.data.prestigeLevel = (this.data.prestigeLevel || 0) + 1;
  this.data.xp = 0;
  this.save();
  return { newPrestigeLevel: this.data.prestigeLevel };
}
```

- [ ] Add `prestigeLevel` getter:
```typescript
get prestigeLevel(): number { return this.data.prestigeLevel || 0; }
```

- [ ] Update `isMaxLevel` getter — max level is now never permanent (prestige replaces it):
```typescript
get isMaxLevel(): boolean { return false; }
```

- [ ] Update `stage` getter to detect prestige trigger. Add helper `get isPrestigeReady(): boolean`:
```typescript
get isPrestigeReady(): boolean {
  return this.stage.level === GROWTH_STAGES.length - 1 &&
    this.data.xp >= GROWTH_STAGES[GROWTH_STAGES.length - 1].xpRequired + 5000;
}
```

- [ ] Update `stage` emoji getter — prefix with 🌟 per prestige level (up to 3 stars):
```typescript
get stageEmoji(): string {
  const stars = '🌟'.repeat(Math.min(this.data.prestigeLevel || 0, 3));
  return stars + this.stage.emoji;
}
```
Update all callers of `stage.emoji` in bearState.ts to use `stageEmoji` instead.

- [ ] Commit: `git add src/bearState.ts && git commit -m "feat: add prestige system to bear growth"`

---

## Task 9: Prestige Hook in companion.ts + extension.ts

**Files:**
- Modify: `src/companion.ts`
- Modify: `src/extension.ts`

- [ ] In `companion.ts`, update `addXP` call sites to check `bearState.isPrestigeReady` after XP is added and trigger prestige:

In the `onDidChangeTextDocument` handler and `onDidSaveTextDocument` handler, after `this.bearState.addXP(...)`, add:
```typescript
if (this.bearState.isPrestigeReady) {
  const { newPrestigeLevel } = this.bearState.prestige();
  this.triggerPrestige(newPrestigeLevel);
  return;
}
```

- [ ] Add `triggerPrestige` method to `Companion`:
```typescript
private triggerPrestige(level: number): void {
  this.transitionTo('levelup');
  const stars = '🌟'.repeat(Math.min(level, 3));
  const msgs = [
    `${stars} PRESTIGE ${level}! Your bear reset to Cub — but carries the stars of a legend.`,
    `${stars} The bear transcended. Prestige ${level} achieved. Starting over... stronger.`,
    `${stars} Legend → Cub. Prestige ${level}. The cycle continues.`,
  ];
  const config = vscode.workspace.getConfiguration('butter');
  if (config.get('companion.showMessages', true)) {
    vscode.window.showInformationMessage(msgs[Math.floor(Math.random() * msgs.length)]);
  }
  setTimeout(() => {
    if (this.activityState === 'levelup') { this.transitionTo('idle'); }
  }, 8_000);
}
```

- [ ] Update all `stage.emoji` references in `companion.ts` to use `bearState.stageEmoji` instead.

- [ ] In `extension.ts`, update the `switchTheme` command themes array:
```typescript
const themes = [
  'Butter Dark', 'Butter Light', 'Butter Soft',
  'Butter Midnight', 'Butter Mocha', 'Butter Storm',
  'Butter Rose', 'Butter Forest', 'Butter AMOLED', 'Butter HC'
];
```

- [ ] Update all `stage.emoji` refs in `extension.ts` to `companion.bearState.stageEmoji`.

- [ ] Commit: `git add src/companion.ts src/extension.ts && git commit -m "feat: prestige hook + all 10 themes in switcher"`

---

## Task 10: package.json — Register All 10 Themes

**Files:**
- Modify: `package.json`

- [ ] Update `"version"` to `"3.0.0"`.

- [ ] Replace `"contributes.themes"` array with all 10 themes:
```json
"themes": [
  { "label": "Butter Dark",     "uiTheme": "vs-dark", "path": "./themes/butter-dark.json" },
  { "label": "Butter Light",    "uiTheme": "vs",      "path": "./themes/butter-light.json" },
  { "label": "Butter Soft",     "uiTheme": "vs-dark", "path": "./themes/butter-soft.json" },
  { "label": "Butter Midnight", "uiTheme": "vs-dark", "path": "./themes/butter-midnight.json" },
  { "label": "Butter Mocha",    "uiTheme": "vs-dark", "path": "./themes/butter-mocha.json" },
  { "label": "Butter Storm",    "uiTheme": "vs-dark", "path": "./themes/butter-storm.json" },
  { "label": "Butter Rose",     "uiTheme": "vs-dark", "path": "./themes/butter-rose.json" },
  { "label": "Butter Forest",   "uiTheme": "vs-dark", "path": "./themes/butter-forest.json" },
  { "label": "Butter AMOLED",   "uiTheme": "vs-dark", "path": "./themes/butter-amoled.json" },
  { "label": "Butter HC",       "uiTheme": "hc-black", "path": "./themes/butter-hc.json" }
]
```

- [ ] Add keywords: `"midnight"`, `"mocha"`, `"storm"`, `"rose"`, `"forest"`, `"amoled"`, `"high contrast"`, `"oled"`, `"darcula"`, `"prestige"`.

- [ ] Update `"description"` to: `"10 warm golden themes (Dark, Light, Soft, Midnight, Mocha, Storm, Rose, Forest, AMOLED, HC) + a growing bear companion with prestige system."`.

- [ ] Commit: `git add package.json && git commit -m "feat: register all 10 themes in package.json, bump to v3.0.0"`

---

## Task 11: README Revamp

**Files:**
- Modify: `README.md`

- [ ] Rewrite README.md with this structure:

```markdown
# 🧈 Butter Bear

> 10 warm golden themes + a bear that lives in your status bar. Feed it. Watch it grow. Prestige.

---

## Themes

All 10 variants share **amber keywords** as the brand anchor — warm, readable, Darcula-calibrated.

| Theme | Vibe | Best For |
|-------|------|----------|
| **Butter Dark** | Deep warm amber | All-day default |
| **Butter Light** | Warm cream | Bright environments |
| **Butter Soft** | Desaturated amber | 2am sessions |
| **Butter Midnight** | Navy + amber | Serious late-night |
| **Butter Mocha** | Espresso brown | Coffee shop aesthetic |
| **Butter Storm** | Steel blue + amber | Tokyo Night fans 🔥 |
| **Butter Rose** | Warm rose + amber | Designers, Catppuccin fans 🔥 |
| **Butter Forest** | Deep green + amber | Nature lovers |
| **Butter AMOLED** | Pure black + amber | OLED battery savings 🔥 |
| **Butter HC** | Max contrast | Accessibility (WCAG AAA) |

Switch themes: `Ctrl+Shift+P` → **Switch Butter Theme**

---

## The Bear

Butter Bear lives in your status bar. It reacts to what you're doing:

| State | Trigger | Display |
|-------|---------|---------|
| 🌅 Morning | First open of the day | Greeting based on bear level |
| ⌨️ Coding | Typing | Encouraging message |
| 🤔 Thinking | 12s pause | Thoughtful message |
| 💤 Resting | Extended idle | Sleeping |
| ✨ Celebrating | Clean save | Celebration |
| 🍯 Hungry | Hunger < 30 | Feed reminder |
| 😭 Starving | Hunger < 10 | Urgent feed reminder |
| 🎉 Level Up | XP threshold | Growth notification |

### Growth & Prestige

The bear grows through **5 stages** — then **prestiges**, resetting to Cub with a 🌟 star. Keep going.

```
🐣 Newborn Cub → 🐻 Tiny Cub → 🧸 Young Bear → 🐻‍❄️ Adult Bear → 👑 Legend Bear
                                                                        ↓ PRESTIGE
                                                          🌟🐣 → 🌟🐻 → ... → 🌟👑
                                                                        ↓ PRESTIGE
                                                         🌟🌟🐣 → ... → 🌟🌟🌟👑
```

**Earn XP by:** typing · saving · fixing errors
**Earn honey 🍯 by:** 50 keystrokes = 1 honey · saving = 1 honey · fixing errors = 2 honey/error
**Spend honey** to feed the bear → XP multiplier (3× when starving)

### Commands

| Command | What it does |
|---------|-------------|
| `Butter: Feed the Bear 🍯` | Spend honey for XP |
| `Butter: Bear Stats` | Full stats modal |
| `Butter: Switch Butter Theme` | Pick from all 10 themes |
| `Butter: Toggle Butter Bear` | Hide/show status bar bear |

### Settings

```json
{
  "butter.companion.enabled": true,
  "butter.companion.morningGreeting": true,
  "butter.companion.showMessages": true,
  "butter.companion.activityTimeout": 30000
}
```

---

## Design Philosophy

> "Does this hurt after four hours?"

Every Butter theme follows four principles from JetBrains' Darcula:
1. **Never pure black** — warm-tinted medium-dark backgrounds reduce eye strain
2. **Never pure white text** — cream/muted foreground at 5.5:1 contrast is the sweet spot
3. **Functionally distinct syntax** — each token type has its own color family
4. **Muted base, vivid accents** — amber pops without neon glare

*Exceptions: AMOLED uses pure black intentionally (battery). HC uses maximum contrast intentionally (accessibility).*

---

## Install

Search **"Butter Bear"** in the VS Code Extensions panel, or:

```bash
code --install-extension butterdev.butter-bear
```

---

MIT License · Made with 🧈
```

- [ ] Commit: `git add README.md && git commit -m "docs: revamp README for v3.0.0 with all 10 themes and prestige system"`

---

## Task 12: Compile & Verify

**Files:** none new

- [ ] Run `npm run compile` in `/Users/friday/Desktop/Butter`
- [ ] Confirm zero TypeScript errors
- [ ] Run `npm run package` to generate `.vsix`
- [ ] Commit any final fixes
