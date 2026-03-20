# VS Code Theme Market Study

## Methodology

52 data points gathered from Hacker News, dev.to, GitHub issue threads, and VS Code Marketplace reviews. Focused on themes with 500k+ installs or strong community word-of-mouth. Themes studied: Catppuccin, Rose Pine, Gruvbox, Dracula, Night Owl, One Dark Pro, Synthwave '84, Tokyo Night, Solarized.

---

## Top Themes: What Users Actually Say

### Catppuccin (7M+ installs)
**Emotional language:** "creamy pastel," "middle ground," "warm flavors," "doesn't feel like I'm staring into a void"
**What works:** Multiple flavor variants (Latte/Frappe/Macchiato/Mocha), pastel palette avoids neon harshness, excellent semantic coverage, active community
**Retention driver:** Variants mean users upgrade within the family rather than leaving. Latte (light) to Mocha (dark) keeps the same user.
**Weakness:** Pastel-cool leans lavender/blue. Not warm. "Cozy" is claimed by users but the palette is cooler than it feels due to high community goodwill.

### Rose Pine (3M+ installs)
**Emotional language:** "warm natural," "cozy," "doesn't fight you," "feels like reading a book," "easy on eyes"
**What works:** Dusty rose and muted sage with warm dark background. Every variant feels cohesive. Excellent documentation.
**Retention driver:** Users describe it as "calming." The warm neutrals don't fatigue. Moon variant (darker) has cult following.
**Weakness:** Rose/pink is a narrow audience. Some users find it too feminine or too desaturated.

### Gruvbox (4M+ installs, 10+ years old)
**Emotional language:** "retro," "earthy," "amber glow," "feels like a terminal from the 80s," "doesn't feel like a theme — feels like a tool"
**What works:** Yellow-amber-orange syntax on warm dark brown background. Genuinely warm. Aged beautifully.
**Retention driver:** Nostalgia + genuine warmth. Users who switch to Gruvbox rarely leave.
**Weakness:** Old-school aesthetics put off newer developers. Default dark mode feels dated. No modern extension features.

### Dracula (7M+ installs)
**Emotional language:** "classic," "neon on dark," "vivid," "starting to hurt my eyes," "I used it for years then burned out"
**What works:** High contrast, very distinctive purple-pink-cyan palette. Strong brand.
**Churn driver:** Neon saturation causes fatigue. Many users describe "Dracula fatigue" explicitly — they leave after 6-18 months. Purple-pink is trendy but not timeless.
**Notable:** Despite high installs, churn rate appears higher than Gruvbox or Rose Pine.

### Night Owl (3M+ installs)
**Emotional language:** "designed with purpose," "meaningful contrast," "the creator clearly thought about this," "made for night coding"
**What works:** Sarah Drasner designed it with accessibility and night use explicitly in mind. Semantic decisions are explained in documentation.
**Retention driver:** Users feel respected. The theme has a philosophy they can read about.
**Weakness:** Cool blue base. Not warm. "Night" branding limits daytime use perception.

### Synthwave '84 (1M+ installs)
**Emotional language:** "neon nostalgia," "retro-futuristic," "the glow effect is everything," "I don't even like neon but the glow..."
**Retention driver:** ONE feature — the optional CSS glow effect. Creates strong word of mouth. Users recommend it specifically for the glow.
**Churn driver:** Neon palette causes fatigue. Many use it occasionally rather than as daily driver.
**Lesson:** A single delightful opt-in feature can drive more installs than a better base palette.

---

## What Creates Retention vs. Churn

### Retention Factors (users stay)
1. **Warmth** — warm-toned themes have lower stated churn. Users describe them as "comforting."
2. **Middle-ground contrast** — not harsh (pure black bg + neon), not washed out (low contrast). The sweet spot is a warm dark bg (#1e1b12 range) with amber/gold syntax.
3. **Semantic consistency** — things that mean the same thing look the same. Inconsistency breaks trust.
4. **Terminal harmony** — when the terminal matches the editor, users feel the theme is "complete."
5. **Variants** — users who can upgrade within a theme family stay loyal longer.
6. **Philosophy/story** — themes with a documented reason for their choices earn trust.

### Churn Factors (users leave)
1. **Oversaturated neons** — Dracula fatigue is the canonical example. Neon + pure black = beautiful screenshots, painful long sessions.
2. **Pure black (#000000) backgrounds** — reported as "harsh," "makes my eyes work harder," "like staring at a void."
3. **Cool blue saturation** — heavy blue theming feels cold during long sessions.
4. **Generic dark blue** — "looks like every other theme," zero personality.
5. **Incomplete coverage** — one unstyled language or missed workbench area breaks the immersion.

---

## Contrast Preferences

Users don't want maximum contrast OR minimum contrast. They want **meaningful contrast** — where contrast level communicates semantic hierarchy.

Preferred pattern (from Night Owl, Rose Pine analysis):
- Background: dark but not black (~#1e1b12 to #252020 range)
- Primary syntax: 60-70% luminance, warm-tinted
- Secondary syntax (operators, punctuation): 40-50% luminance, muted
- Comments: 30-35% luminance, italic
- Active line highlight: subtle warm bg tint

Users explicitly dislike:
- "Everything is the same brightness" (flat themes)
- "Comments are invisible" (too muted)
- "My eyes keep jumping to the operators" (operators brighter than identifiers)

---

## Color Temperature Preferences

Survey of stated preferences across 52 data points:

| Temperature | Themes | Long-session preference |
|-------------|--------|------------------------|
| Warm (amber/gold/rose) | Gruvbox, Rose Pine | High retention |
| Neutral warm (muted pastel) | Catppuccin Mocha | High retention |
| Cool blue-purple | Dracula, Tokyo Night, One Dark | Medium retention, higher churn |
| True neutral | Solarized | Polarizing |

**Conclusion:** Warm color temperatures correlate with longer usage and more positive emotional language. No surveyed user said they stayed on a cool theme because it was "comfortable." Cool theme praise centers on aesthetics/screenshots; warm theme praise centers on comfort/daily use.

---

## The Delight Factor

VS Code Pets has 1M+ installs from pure joy. Users describe it as "making coding feel less lonely." Key insight: opt-in delight features that are non-intrusive create word-of-mouth disproportionate to their complexity.

Themes that have a companion feature, sound, or interactive element get mentioned in "what's on your VS Code" posts far more than themes without one. The feature doesn't need to be useful — it needs to be delightful and opt-out.
