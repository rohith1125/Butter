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

Switch themes anytime: `Ctrl+Shift+P` → **Switch Butter Theme**

---

## The Bear

Butter Bear lives in your status bar and reacts to what you're doing:

| State | Trigger |
|-------|---------|
| 🌅 Morning | First open of the day |
| ⌨️ Coding | Typing |
| 🤔 Thinking | 12s pause |
| 💤 Resting | Extended idle |
| ✨ Celebrating | Clean save (zero errors) |
| 🍯 Hungry | Hunger drops below 30 |
| 😭 Starving | Hunger drops below 10 |
| 🎉 Level Up | XP threshold hit |

### Growth & Prestige

Five stages — then **prestige**. Reset to Cub, keep the stars. Repeat.

```
🐣 Newborn Cub  (0 XP)
🐻 Tiny Cub     (200 XP)
🧸 Young Bear   (700 XP)
🐻‍❄️ Adult Bear  (1700 XP)
👑 Legend Bear  (3700 XP)  ← PRESTIGE here (+5000 XP)
       ↓
🌟🐣 Cub again — with a star
       ↓
🌟👑 Legend again → 🌟🌟🐣 → ... → 🌟🌟🌟👑
```

**Earn XP:** typing · saving · fixing errors
**Earn honey 🍯:** 50 keystrokes = 1 · save = 1 · error fixed = 2
**Spend honey** to feed the bear → XP bonus (3× when starving)

### Commands

| Command | What it does |
|---------|-------------|
| `Butter: Feed the Bear 🍯` | Spend honey for XP |
| `Butter: Bear Stats` | Full stats modal |
| `Butter: Switch Butter Theme` | Pick from all 10 themes |
| `Butter: Toggle Butter Bear` | Hide/show the status bar bear |

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
2. **Never pure white text** — cream/muted foreground (~5.5:1 contrast) is the sweet spot
3. **Functionally distinct syntax** — each token type has its own color family
4. **Muted base, vivid accents** — amber pops without neon glare

*Exceptions: AMOLED uses pure black intentionally (battery savings on OLED). HC uses maximum contrast intentionally (WCAG AAA accessibility).*

---

## Install

Search **"Butter Bear"** in the VS Code Extensions panel, or:

```bash
code --install-extension butterdev.butter-bear
```

---

MIT License · Made with 🧈
