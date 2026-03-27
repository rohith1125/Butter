# Butter Bear — Neovim / Vim

## Neovim (Lua)

### Using lazy.nvim
```lua
{
  "rohith1125/butter-bear-nvim",
  config = function()
    vim.g.butter_variant = "dark" -- dark | light | soft | midnight | mocha | storm | rose | forest | amoled | hc
    require("butter-bear").setup()
    vim.cmd("colorscheme butter-bear")
  end,
}
```

### Manual install
Copy `butter-bear.lua` to `~/.config/nvim/lua/butter-bear.lua`, then:
```lua
vim.g.butter_variant = "midnight"
require("butter-bear").setup()
vim.cmd("colorscheme butter-bear")
```

## Vim

Copy `butter-bear.vim` to `~/.vim/colors/butter-bear.vim`, then add to your `.vimrc`:
```vim
let g:butter_variant = "dark"
colorscheme butter-bear
```

## Variants
`dark` · `light` · `soft` · `midnight` · `mocha` · `storm` · `rose` · `forest` · `amoled` · `hc`
