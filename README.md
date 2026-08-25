# RenderUI

A themeable Vue 3 design system built on **design tokens**, **CSS Modules** and
**TypeScript**. Zero runtime dependencies beyond Vue itself (~7 kB gzipped JS,
4.6 kB CSS for all ten components).

## Architecture

```
┌─────────────────────────────────────────────────────┐
│  Consumers / Playground                             │
├─────────────────────────────────────────────────────┤
│  Components        RButton, RModal, …               │
│                    consume SEMANTIC tokens only;    │
│                    expose per-component overrides   │
│                    via public custom properties     │
├─────────────────────────────────────────────────────┤
│  Semantic tokens   --r-color-bg-surface,            │
│                    --r-color-text-primary, …        │
│                    remapped per [data-theme]        │
├─────────────────────────────────────────────────────┤
│  Primitives        scales: neutral/brand/success…,  │
│                    type, space, radius, shadow,     │
│                    motion, z-index                  │
└─────────────────────────────────────────────────────┘
```

Three-layer token architecture (`src/tokens/tokens.css`):

1. **Primitives** – raw values (`--r-color-brand-600`). Never referenced by components.
2. **Semantic** – intent-based roles (`--r-color-accent`, `--r-color-bg-canvas`) mapped to primitives once per theme. Light theme lives on `:root`, dark theme on `[data-theme='dark']`.
3. **Component tokens** – every component reads a public override first and falls back to a semantic token, e.g.
   ```css
   .button { --_bg: var(--r-button-bg, var(--r-color-accent)); }
   ```
   Rebrand the primary button without touching library code:
   ```css
   :root { --r-button-bg: #0ea5e9; }
   ```

## Getting started

```bash
npm install        # install deps
npm run dev        # playground at http://localhost:5173
npm test           # vitest (32 tests)
npm run typecheck  # vue-tsc
npm run build      # ESM bundle + d.ts to dist/
```

### Using the library

```ts
import { createApp } from 'vue'
import { RenderUI } from 'renderui'
import 'renderui/styles.css'

createApp(App).use(RenderUI).mount('#app')
```

Or cherry-pick (tree-shakeable):

```ts
import { RButton, useTheme } from 'renderui'
```

## Components

| Component    | Highlights                                                            |
| ------------ | --------------------------------------------------------------------- |
| `RButton`    | 4 variants × 3 sizes, loading state, icon slots, block mode           |
| `RInput`     | label/hint/error wiring, `aria-invalid` + `aria-describedby`, sizes    |
| `RTextarea`  | same semantics as input, resize modes                                 |
| `RCard`      | header/body/footer slots, hoverable & flat modes                      |
| `RBadge`     | status variants, dot indicator                                        |
| `RAlert`     | role="alert", iconography, dismissible                                |
| `RModal`     | Teleport, focus restore, Esc/backdrop close, scroll lock, transitions |
| `RSwitch`    | `role="switch"` + `aria-checked`, keyboard operable                   |
| `RSpinner`   | currentColor-driven, `role="status"` announcement                     |
| `RAvatar`    | image → initials → icon fallback chain                                |

All interactive components are focus-visible styled, ARIA-labelled and respect
`prefers-reduced-motion` globally.

## Theming

```ts
const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme()
setTheme('dark')    // sets data-theme="dark" on <html>, persists to localStorage
setTheme('system')  // follows prefers-color-scheme live
```

Dark values re-map semantic tokens only — components never change.

## Project structure

```
src/
  tokens/       tokens.css (3 layers), tokens.ts (TS mirror)
  styles/       reset.css, global.css (consumer entry)
  components/   <RName>/{RName.vue,index.ts}  (+ barrel)
  composables/  use-theme.ts
  utils/        class-names.ts, with-install.ts
  index.ts      public API + plugin installer
playground/     showcase dev app (npm run dev)
tests/          vitest unit tests
```

## Roadmap

- Focus trap utility for Modal
- Select / Combobox, Tooltip (floating-ui), Tabs, Toast
- Stylelint custom rule forbidding primitive tokens inside components
- Visual regression tests (Playwright screenshots, light/dark)
