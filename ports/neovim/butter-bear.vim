" Butter Bear colorscheme for Vim
" https://github.com/rohith1125/Butter
" Set g:butter_variant before loading: let g:butter_variant = "dark"

set background=dark
highlight clear
if exists("syntax_on")
  syntax reset
endif
let g:colors_name = "butter-bear"

let s:v = get(g:, "butter_variant", "dark")

" Palettes
let s:palettes = {
\ "dark":     {"bg": "#1e1b12", "bg2": "#252015", "fg": "#e8dfc8", "fg2": "#c8bc9c", "fg3": "#6a6050", "acc": "#c9a227", "kw": "#c47c3a", "str": "#d4a843", "fn": "#e8c870", "cls": "#d4956a", "cm": "#6a6050", "num": "#e8c84a", "grn": "#7ab860", "red": "#c85050", "blu": "#60a8b0"},
\ "midnight": {"bg": "#0d1117", "bg2": "#161b22", "fg": "#c9d1d9", "fg2": "#8b949e", "fg3": "#3a4248", "acc": "#e8a838", "kw": "#e8a838", "str": "#79c0ff", "fn": "#d2a8ff", "cls": "#ffa657", "cm": "#3a4248", "num": "#79c0ff", "grn": "#3fb950", "red": "#f85149", "blu": "#58a6ff"},
\ "mocha":    {"bg": "#1e1208", "bg2": "#261a0d", "fg": "#e8d5b0", "fg2": "#c8ae88", "fg3": "#6a4e30", "acc": "#d4a064", "kw": "#d4a064", "str": "#f5c842", "fn": "#e8c870", "cls": "#c08040", "cm": "#6a4e30", "num": "#f5c842", "grn": "#8fc870", "red": "#c85050", "blu": "#60a8b0"},
\ "storm":    {"bg": "#0d1626", "bg2": "#1a2535", "fg": "#c0d8f0", "fg2": "#88aac8", "fg3": "#3a5068", "acc": "#f0c060", "kw": "#f0c060", "str": "#9ecbff", "fn": "#c792ea", "cls": "#ffa657", "cm": "#3a5068", "num": "#9ecbff", "grn": "#7dcfb0", "red": "#f07070", "blu": "#79c0ff"},
\ "rose":     {"bg": "#1e1015", "bg2": "#261520", "fg": "#f0c8d0", "fg2": "#c8a0b0", "fg3": "#6a4050", "acc": "#e8a838", "kw": "#e8a838", "str": "#f5a0c0", "fn": "#dba0c0", "cls": "#c78080", "cm": "#6a4050", "num": "#f5a0c0", "grn": "#88c880", "red": "#e06060", "blu": "#a0b8d8"},
\ "forest":   {"bg": "#0d1a0f", "bg2": "#142018", "fg": "#c8e0c0", "fg2": "#98b890", "fg3": "#406040", "acc": "#f0c060", "kw": "#f0c060", "str": "#80c080", "fn": "#a8d080", "cls": "#70a868", "cm": "#406040", "num": "#80c080", "grn": "#60c060", "red": "#c06060", "blu": "#70b8a0"},
\ "amoled":   {"bg": "#000000", "bg2": "#0d0d0d", "fg": "#ffe0a0", "fg2": "#c8a878", "fg3": "#555555", "acc": "#ffa500", "kw": "#ffa500", "str": "#ffcc66", "fn": "#cc88ff", "cls": "#ff9944", "cm": "#555555", "num": "#ffcc66", "grn": "#66cc88", "red": "#ff5555", "blu": "#55aacc"},
\ "hc":       {"bg": "#000000", "bg2": "#0a0a0a", "fg": "#ffffff", "fg2": "#dddddd", "fg3": "#888888", "acc": "#ffcc00", "kw": "#ffcc00", "str": "#ffaa00", "fn": "#00ff88", "cls": "#ff88cc", "cm": "#888888", "num": "#ffaa00", "grn": "#00ff00", "red": "#ff4444", "blu": "#00ccff"},
\ "soft":     {"bg": "#1a1814", "bg2": "#222018", "fg": "#c4b89a", "fg2": "#a8a080", "fg3": "#5a5040", "acc": "#b09060", "kw": "#b09060", "str": "#c8a850", "fn": "#c0a060", "cls": "#b08050", "cm": "#5a5040", "num": "#c8a040", "grn": "#7ab060", "red": "#c05050", "blu": "#5aa0a8"},
\ "light":    {"bg": "#fdf6e3", "bg2": "#f5edd0", "fg": "#3d2f00", "fg2": "#6a5030", "fg3": "#a09070", "acc": "#b07800", "kw": "#b07800", "str": "#c07000", "fn": "#7a6000", "cls": "#8a5020", "cm": "#a09070", "num": "#b07000", "grn": "#5a8020", "red": "#c03030", "blu": "#3080a0"},
\ }

let s:p = get(s:palettes, s:v, s:palettes["dark"])

function! s:hi(group, fg, bg, attr)
  let l:cmd = "highlight " . a:group
  if a:fg != "" | let l:cmd .= " guifg=" . a:fg | endif
  if a:bg != "" | let l:cmd .= " guibg=" . a:bg | endif
  if a:attr != "" | let l:cmd .= " gui=" . a:attr | endif
  execute l:cmd
endfunction

call s:hi("Normal",       s:p.fg,  s:p.bg,  "none")
call s:hi("LineNr",       s:p.fg3, "",      "none")
call s:hi("CursorLineNr", s:p.acc, "",      "bold")
call s:hi("CursorLine",   "",      s:p.bg2, "none")
call s:hi("Visual",       "",      s:p.bg2, "none")
call s:hi("Search",       s:p.bg,  s:p.acc, "none")
call s:hi("IncSearch",    s:p.bg,  s:p.fn,  "none")
call s:hi("StatusLine",   s:p.fg2, s:p.bg2, "none")
call s:hi("StatusLineNC", s:p.fg3, s:p.bg2, "none")
call s:hi("Pmenu",        s:p.fg,  s:p.bg2, "none")
call s:hi("PmenuSel",     s:p.fg,  s:p.fg3, "bold")
call s:hi("Comment",      s:p.cm,  "",      "italic")
call s:hi("Constant",     s:p.num, "",      "none")
call s:hi("String",       s:p.str, "",      "none")
call s:hi("Number",       s:p.num, "",      "none")
call s:hi("Boolean",      s:p.num, "",      "none")
call s:hi("Identifier",   s:p.fg,  "",      "none")
call s:hi("Function",     s:p.fn,  "",      "none")
call s:hi("Statement",    s:p.kw,  "",      "bold")
call s:hi("Keyword",      s:p.kw,  "",      "bold")
call s:hi("Conditional",  s:p.kw,  "",      "bold")
call s:hi("Repeat",       s:p.kw,  "",      "bold")
call s:hi("Operator",     s:p.acc, "",      "none")
call s:hi("PreProc",      s:p.fn,  "",      "none")
call s:hi("Include",      s:p.kw,  "",      "none")
call s:hi("Type",         s:p.cls, "",      "none")
call s:hi("StorageClass", s:p.kw,  "",      "bold")
call s:hi("Structure",    s:p.cls, "",      "none")
call s:hi("Special",      s:p.acc, "",      "none")
call s:hi("Error",        s:p.red, "",      "bold")
call s:hi("Todo",         s:p.acc, "",      "bold")
call s:hi("MatchParen",   s:p.acc, "",      "bold,underline")
call s:hi("DiffAdd",      s:p.grn, "",      "none")
call s:hi("DiffChange",   s:p.acc, "",      "none")
call s:hi("DiffDelete",   s:p.red, "",      "none")
call s:hi("ErrorMsg",     s:p.red, "",      "bold")
call s:hi("WarningMsg",   s:p.acc, "",      "none")
call s:hi("Directory",    s:p.acc, "",      "none")
call s:hi("Title",        s:p.fn,  "",      "bold")
