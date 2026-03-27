-- Butter Bear colorscheme for Neovim
-- https://github.com/rohith1125/Butter
-- 10 variants: dark, light, soft, midnight, mocha, storm, rose, forest, amoled, hc

local M = {}

local palettes = {
  dark = {
    bg      = "#1e1b12", bg2     = "#252015", bg3     = "#2a2416",
    border  = "#4a4438", fg      = "#e8dfc8", fg2     = "#c8bc9c",
    fg3     = "#6a6050", accent  = "#c9a227", kw      = "#c47c3a",
    str     = "#d4a843", fn      = "#e8c870", cls     = "#d4956a",
    cm      = "#6a6050", num     = "#e8c84a", green   = "#7ab860",
    red     = "#c85050", blue    = "#60a8b0", orange  = "#d4824a",
    prop    = "#b8a878", param   = "#b8b0a0", var     = "#c8c0a8",
  },
  light = {
    bg      = "#fdf6e3", bg2     = "#f5edd0", bg3     = "#ede4c0",
    border  = "#c8b880", fg      = "#3d2f00", fg2     = "#6a5030",
    fg3     = "#a09070", accent  = "#b07800", kw      = "#b07800",
    str     = "#c07000", fn      = "#7a6000", cls     = "#8a5020",
    cm      = "#a09070", num     = "#b07000", green   = "#5a8020",
    red     = "#c03030", blue    = "#3080a0", orange  = "#a06020",
    prop    = "#8a7040", param   = "#7a6030", var     = "#5a4820",
  },
  soft = {
    bg      = "#1a1814", bg2     = "#222018", bg3     = "#282410",
    border  = "#3a3428", fg      = "#c4b89a", fg2     = "#a8a080",
    fg3     = "#5a5040", accent  = "#b09060", kw      = "#b09060",
    str     = "#c8a850", fn      = "#c0a060", cls     = "#b08050",
    cm      = "#5a5040", num     = "#c8a040", green   = "#7ab060",
    red     = "#c05050", blue    = "#5aa0a8", orange  = "#c08050",
    prop    = "#a89060", param   = "#989080", var     = "#b0a888",
  },
  midnight = {
    bg      = "#0d1117", bg2     = "#161b22", bg3     = "#1c2128",
    border  = "#30363d", fg      = "#c9d1d9", fg2     = "#8b949e",
    fg3     = "#3a4248", accent  = "#e8a838", kw      = "#e8a838",
    str     = "#79c0ff", fn      = "#d2a8ff", cls     = "#ffa657",
    cm      = "#3a4248", num     = "#79c0ff", green   = "#3fb950",
    red     = "#f85149", blue    = "#58a6ff", orange  = "#ffa657",
    prop    = "#8a9aaa", param   = "#9aa4ae", var     = "#b0bac4",
  },
  mocha = {
    bg      = "#1e1208", bg2     = "#261a0d", bg3     = "#2c1f0f",
    border  = "#4a3520", fg      = "#e8d5b0", fg2     = "#c8ae88",
    fg3     = "#6a4e30", accent  = "#d4a064", kw      = "#d4a064",
    str     = "#f5c842", fn      = "#e8c870", cls     = "#c08040",
    cm      = "#6a4e30", num     = "#f5c842", green   = "#8fc870",
    red     = "#c85050", blue    = "#60a8b0", orange  = "#c07838",
    prop    = "#b09860", param   = "#b8a888", var     = "#c8b890",
  },
  storm = {
    bg      = "#0d1626", bg2     = "#1a2535", bg3     = "#1f2d40",
    border  = "#2d4060", fg      = "#c0d8f0", fg2     = "#88aac8",
    fg3     = "#3a5068", accent  = "#f0c060", kw      = "#f0c060",
    str     = "#9ecbff", fn      = "#c792ea", cls     = "#ffa657",
    cm      = "#3a5068", num     = "#9ecbff", green   = "#7dcfb0",
    red     = "#f07070", blue    = "#79c0ff", orange  = "#ffa657",
    prop    = "#88a8c8", param   = "#98b8d8", var     = "#a8c8e8",
  },
  rose = {
    bg      = "#1e1015", bg2     = "#261520", bg3     = "#2c1a22",
    border  = "#4a3040", fg      = "#f0c8d0", fg2     = "#c8a0b0",
    fg3     = "#6a4050", accent  = "#e8a838", kw      = "#e8a838",
    str     = "#f5a0c0", fn      = "#dba0c0", cls     = "#c78080",
    cm      = "#6a4050", num     = "#f5a0c0", green   = "#88c880",
    red     = "#e06060", blue    = "#a0b8d8", orange  = "#e8a838",
    prop    = "#c090a0", param   = "#d0a8b8", var     = "#e0b8c8",
  },
  forest = {
    bg      = "#0d1a0f", bg2     = "#142018", bg3     = "#182818",
    border  = "#304838", fg      = "#c8e0c0", fg2     = "#98b890",
    fg3     = "#406040", accent  = "#f0c060", kw      = "#f0c060",
    str     = "#80c080", fn      = "#a8d080", cls     = "#70a868",
    cm      = "#406040", num     = "#80c080", green   = "#60c060",
    red     = "#c06060", blue    = "#70b8a0", orange  = "#f0c060",
    prop    = "#90b880", param   = "#a0c098", var     = "#b0d0a8",
  },
  amoled = {
    bg      = "#000000", bg2     = "#0d0d0d", bg3     = "#111111",
    border  = "#2a2a2a", fg      = "#ffe0a0", fg2     = "#c8a878",
    fg3     = "#555555", accent  = "#ffa500", kw      = "#ffa500",
    str     = "#ffcc66", fn      = "#cc88ff", cls     = "#ff9944",
    cm      = "#555555", num     = "#ffcc66", green   = "#66cc88",
    red     = "#ff5555", blue    = "#55aacc", orange  = "#ff9944",
    prop    = "#c8a858", param   = "#d8b878", var     = "#e8c888",
  },
  hc = {
    bg      = "#000000", bg2     = "#0a0a0a", bg3     = "#111111",
    border  = "#333333", fg      = "#ffffff", fg2     = "#dddddd",
    fg3     = "#888888", accent  = "#ffcc00", kw      = "#ffcc00",
    str     = "#ffaa00", fn      = "#00ff88", cls     = "#ff88cc",
    cm      = "#888888", num     = "#ffaa00", green   = "#00ff00",
    red     = "#ff4444", blue    = "#00ccff", orange  = "#ffaa00",
    prop    = "#cccccc", param   = "#dddddd", var     = "#eeeeee",
  },
}

function M.setup(opts)
  opts = opts or {}
  local variant = vim.g.butter_variant or opts.variant or "dark"
  local p = palettes[variant] or palettes.dark

  vim.cmd("highlight clear")
  if vim.fn.exists("syntax_on") then vim.cmd("syntax reset") end
  vim.o.background = (variant == "light") and "light" or "dark"
  vim.g.colors_name = "butter-bear"

  local hi = function(group, opts_hi)
    vim.api.nvim_set_hl(0, group, opts_hi)
  end

  -- Editor chrome
  hi("Normal",        { fg = p.fg,     bg = p.bg })
  hi("NormalFloat",   { fg = p.fg,     bg = p.bg2 })
  hi("NormalNC",      { fg = p.fg2,    bg = p.bg })
  hi("LineNr",        { fg = p.border })
  hi("CursorLineNr",  { fg = p.fg3,    bold = true })
  hi("CursorLine",    { bg = p.bg2 })
  hi("CursorColumn",  { bg = p.bg2 })
  hi("ColorColumn",   { bg = p.bg3 })
  hi("SignColumn",    { fg = p.border, bg = p.bg })
  hi("Folded",        { fg = p.fg3,    bg = p.bg2 })
  hi("FoldColumn",    { fg = p.border, bg = p.bg })
  hi("VertSplit",     { fg = p.border, bg = p.bg })
  hi("WinSeparator",  { fg = p.border })
  hi("StatusLine",    { fg = p.fg2,    bg = p.bg3 })
  hi("StatusLineNC",  { fg = p.fg3,    bg = p.bg2 })
  hi("Pmenu",         { fg = p.fg,     bg = p.bg2 })
  hi("PmenuSel",      { fg = p.fg,     bg = p.bg3, bold = true })
  hi("PmenuSbar",     { bg = p.bg3 })
  hi("PmenuThumb",    { bg = p.border })
  hi("TabLine",       { fg = p.fg3,    bg = p.bg2 })
  hi("TabLineSel",    { fg = p.fg,     bg = p.bg,  bold = true })
  hi("TabLineFill",   { bg = p.bg2 })
  hi("Visual",        { bg = p.bg3 })
  hi("VisualNOS",     { bg = p.bg3 })
  hi("Search",        { fg = p.bg,     bg = p.accent })
  hi("IncSearch",     { fg = p.bg,     bg = p.fn })
  hi("MatchParen",    { fg = p.accent, bold = true, underline = true })
  hi("NonText",       { fg = p.border })
  hi("SpecialKey",    { fg = p.border })
  hi("Whitespace",    { fg = p.bg3 })
  hi("EndOfBuffer",   { fg = p.bg3 })
  hi("Directory",     { fg = p.accent })
  hi("Title",         { fg = p.fn,     bold = true })
  hi("Question",      { fg = p.green })
  hi("MoreMsg",       { fg = p.green })
  hi("ModeMsg",       { fg = p.fg2 })
  hi("ErrorMsg",      { fg = p.red })
  hi("WarningMsg",    { fg = p.accent })

  -- Syntax
  hi("Comment",       { fg = p.cm,     italic = true })
  hi("Constant",      { fg = p.num })
  hi("String",        { fg = p.str })
  hi("Character",     { fg = p.str })
  hi("Number",        { fg = p.num })
  hi("Boolean",       { fg = p.num })
  hi("Float",         { fg = p.num })
  hi("Identifier",    { fg = p.var })
  hi("Function",      { fg = p.fn })
  hi("Statement",     { fg = p.kw })
  hi("Conditional",   { fg = p.kw })
  hi("Repeat",        { fg = p.kw })
  hi("Label",         { fg = p.kw })
  hi("Operator",      { fg = p.orange })
  hi("Keyword",       { fg = p.kw,     bold = true })
  hi("Exception",     { fg = p.red })
  hi("PreProc",       { fg = p.fn })
  hi("Include",       { fg = p.kw })
  hi("Define",        { fg = p.kw })
  hi("Macro",         { fg = p.fn })
  hi("PreCondit",     { fg = p.kw })
  hi("Type",          { fg = p.cls })
  hi("StorageClass",  { fg = p.kw })
  hi("Structure",     { fg = p.cls })
  hi("Typedef",       { fg = p.cls })
  hi("Special",       { fg = p.orange })
  hi("SpecialChar",   { fg = p.fn })
  hi("Tag",           { fg = p.kw })
  hi("Delimiter",     { fg = p.fg2 })
  hi("SpecialComment",{ fg = p.cm,     italic = true })
  hi("Debug",         { fg = p.red })
  hi("Underlined",    { underline = true })
  hi("Ignore",        { fg = p.fg3 })
  hi("Error",         { fg = p.red,    bold = true })
  hi("Todo",          { fg = p.accent, bold = true })

  -- Diff
  hi("DiffAdd",       { bg = p.green .. "20" })
  hi("DiffChange",    { bg = p.accent .. "20" })
  hi("DiffDelete",    { bg = p.red .. "20" })
  hi("DiffText",      { bg = p.accent .. "40" })
  hi("Added",         { fg = p.green })
  hi("Changed",       { fg = p.accent })
  hi("Removed",       { fg = p.red })

  -- Diagnostics
  hi("DiagnosticError",       { fg = p.red })
  hi("DiagnosticWarn",        { fg = p.accent })
  hi("DiagnosticInfo",        { fg = p.blue })
  hi("DiagnosticHint",        { fg = p.fg3 })
  hi("DiagnosticUnderlineError",  { underline = true, sp = p.red })
  hi("DiagnosticUnderlineWarn",   { underline = true, sp = p.accent })
  hi("DiagnosticUnderlineInfo",   { underline = true, sp = p.blue })
  hi("DiagnosticUnderlineHint",   { underline = true, sp = p.fg3 })

  -- LSP
  hi("LspReferenceText",  { bg = p.bg3 })
  hi("LspReferenceRead",  { bg = p.bg3 })
  hi("LspReferenceWrite", { bg = p.bg3, bold = true })

  -- TreeSitter
  hi("@comment",             { fg = p.cm,    italic = true })
  hi("@comment.doc",         { fg = p.cm,    italic = true })
  hi("@keyword",             { fg = p.kw,    bold = true })
  hi("@keyword.function",    { fg = p.kw,    bold = true })
  hi("@keyword.operator",    { fg = p.orange })
  hi("@keyword.return",      { fg = p.kw,    bold = true })
  hi("@keyword.import",      { fg = p.kw })
  hi("@function",            { fg = p.fn })
  hi("@function.builtin",    { fg = p.fn })
  hi("@function.call",       { fg = p.fn })
  hi("@function.method",     { fg = p.fn })
  hi("@function.method.call",{ fg = p.fn })
  hi("@constructor",         { fg = p.fn })
  hi("@class",               { fg = p.cls })
  hi("@type",                { fg = p.cls })
  hi("@type.builtin",        { fg = p.cls })
  hi("@type.definition",     { fg = p.cls })
  hi("@string",              { fg = p.str })
  hi("@string.escape",       { fg = p.fn })
  hi("@string.regex",        { fg = p.str })
  hi("@string.special",      { fg = p.fn })
  hi("@number",              { fg = p.num })
  hi("@number.float",        { fg = p.num })
  hi("@boolean",             { fg = p.num })
  hi("@constant",            { fg = p.num })
  hi("@constant.builtin",    { fg = p.num })
  hi("@constant.macro",      { fg = p.fn })
  hi("@variable",            { fg = p.var })
  hi("@variable.builtin",    { fg = p.kw })
  hi("@variable.member",     { fg = p.prop })
  hi("@variable.parameter",  { fg = p.param })
  hi("@property",            { fg = p.prop })
  hi("@attribute",           { fg = p.prop })
  hi("@operator",            { fg = p.orange })
  hi("@punctuation.bracket", { fg = p.fg2 })
  hi("@punctuation.delimiter",{ fg = p.fg2 })
  hi("@punctuation.special", { fg = p.orange })
  hi("@tag",                 { fg = p.kw })
  hi("@tag.attribute",       { fg = p.prop })
  hi("@tag.delimiter",       { fg = p.fg2 })
  hi("@namespace",           { fg = p.fg2 })
  hi("@module",              { fg = p.fg2 })
  hi("@label",               { fg = p.orange })
  hi("@error",               { fg = p.red })

  -- Telescope
  hi("TelescopeBorder",         { fg = p.border })
  hi("TelescopeNormal",         { fg = p.fg,    bg = p.bg })
  hi("TelescopePromptBorder",   { fg = p.accent })
  hi("TelescopePromptTitle",    { fg = p.accent, bold = true })
  hi("TelescopeResultsTitle",   { fg = p.fg3 })
  hi("TelescopePreviewTitle",   { fg = p.fn })
  hi("TelescopeSelection",      { bg = p.bg3 })
  hi("TelescopeMatching",       { fg = p.accent, bold = true })

  -- NvimTree / Neo-tree
  hi("NvimTreeNormal",          { fg = p.fg2,   bg = p.bg2 })
  hi("NvimTreeFolderIcon",      { fg = p.accent })
  hi("NvimTreeFolderName",      { fg = p.fg })
  hi("NvimTreeOpenedFolderName",{ fg = p.accent })
  hi("NvimTreeGitDirty",        { fg = p.accent })
  hi("NvimTreeGitNew",          { fg = p.green })
  hi("NvimTreeGitDeleted",      { fg = p.red })

  -- Git signs
  hi("GitSignsAdd",     { fg = p.green })
  hi("GitSignsChange",  { fg = p.accent })
  hi("GitSignsDelete",  { fg = p.red })

  -- Indent blankline
  hi("IblIndent",       { fg = p.bg3 })
  hi("IblScope",        { fg = p.border })
end

return M
