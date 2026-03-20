# Butter 2.0 — Release Plan

## Pre-Release

### Code Quality
- [ ] `npm run compile` — zero TypeScript errors
- [ ] Lint check — no obvious issues in companion.ts state machine
- [ ] Manual test: activate extension in Extension Development Host
- [ ] Verify Butter Bear appears in status bar on activation
- [ ] Verify `butter.switchTheme` command works (quick pick cycles all 3 variants)
- [ ] Verify `butter.toggleCompanion` shows/hides Bear
- [ ] Verify `butter.companionMood` shows notification
- [ ] Verify morning greeting fires on first activation of day (test via globalState wipe)
- [ ] Verify `butter.companion.enabled: false` fully disables companion

### Theme QA
- [ ] Open JS/TS file — verify keyword, string, function, comment colors
- [ ] Open Python file — verify decorator, type hint, docstring colors
- [ ] Open Rust file — verify lifetime, macro, type colors
- [ ] Open HTML file — verify tag, attribute, entity colors
- [ ] Open CSS/SCSS — verify selector, property, value colors
- [ ] Open Markdown — verify heading, code fence, bold/italic colors
- [ ] Open JSON — verify key, string value, number colors
- [ ] Open YAML — verify key, string, anchor colors
- [ ] Open SQL — verify keyword, string, comment colors
- [ ] Open integrated terminal — verify ANSI colors match palette
- [ ] Verify Git decoration colors in Explorer (added=green, modified=gold, deleted=red)
- [ ] Verify diff editor colors (added/removed/modified lines)
- [ ] Verify peek view / reference search panel colors
- [ ] Verify suggestion widget colors
- [ ] Verify hover widget colors
- [ ] Verify breadcrumb colors

### Butter Light QA
- [ ] All above checks repeated with Butter Light active
- [ ] Verify readable contrast on all syntax colors (warm dark on warm light)
- [ ] Verify status bar is gold (brand consistent with Dark)

### Butter Soft QA
- [ ] All above checks repeated with Butter Soft active
- [ ] Verify desaturation is perceptible but not washed out
- [ ] Verify cursor remains gold (#c9a227)
- [ ] Check readability after simulated eye-fatigue (stare at screen 60s, then evaluate)

---

## Packaging

```bash
# 1. Bump version in package.json (2.0.0)
# 2. Update CHANGELOG.md
# 3. Compile
npm run compile

# 4. Package
npm run package
# → butter-2.0.0.vsix

# 5. Test packaged extension
code --install-extension butter-2.0.0.vsix
# → restart VS Code, verify all features work from installed extension
```

---

## Marketplace Launch

### Pre-launch
- [ ] Publisher account active on marketplace.visualstudio.com
- [ ] `butter.png` is 128x128 and looks good at small size
- [ ] `galleryBanner.color` updated to `#c9a227` (gold, not the old `#0e1421`)
- [ ] README has at least one screenshot (or screenshot placeholder is removed)
- [ ] All links in README are valid
- [ ] `package.json` `repository` field points to correct GitHub URL
- [ ] `package.json` `bugs` field points to GitHub Issues

### Publish
```bash
npm run publish
# or
vsce publish
```

### Post-launch
- [ ] Verify extension appears on marketplace within 5 minutes
- [ ] Test install from marketplace (not local .vsix)
- [ ] Submit to VS Code theme galleries (vscodethemes.com)
- [ ] Post announcement: dev.to article, HN Show HN, Twitter/X
- [ ] Create GitHub Discussions for feedback

---

## Announcement Checklist

- [ ] Write dev.to post: "Why I rebuilt Butter from scratch — and added a bear"
  - Cover: market research findings, design philosophy, the Butter Bear
  - Include before/after palette screenshots
- [ ] HN Show HN: "Show HN: Butter 2.0 — a warm golden VS Code theme with a companion"
- [ ] Reddit r/vscode post
- [ ] Twitter/X thread with GIF of Butter Bear reacting to code errors

---

## Version Roadmap (Post-Launch)

### 2.1.0
- Additional companion messages (community contributions)
- Italic font variant (for fonts with italic programming ligatures)
- Dimmed variant of Butter Dark (lower overall brightness)

### 2.2.0
- Ports: Windows Terminal, iTerm2, Alacritty, Zed
- Companion sounds (opt-in, system sounds only)

### 3.0.0
- Evaluate: high-contrast accessibility variant
- Evaluate: Butter HC for WCAG AA compliance
