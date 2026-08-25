# Theming & Tokens

RenderUI styles are plain CSS custom properties organized in three layers.
Components only ever read **semantic** tokens, so themes swap without touching
component code.

## Layer 1 — Primitives

Raw scales: `neutral`, `brand`, `success`, `warning`, `danger`, `info` colors
plus type, spacing, radius, shadow, motion and z-index scales.

```css
--r-color-brand-600: #4f46e5;
--r-space-4: 1rem;
--r-radius-lg: 0.75rem;
```

## Layer 2 — Semantic roles

Intent-based names mapped to primitives, once per theme:

| Token                     | Light              | Dark            |
| ------------------------- | ------------------ | --------------- |
| `--r-color-bg-canvas`     | neutral-50         | neutral-950     |
| `--r-color-bg-surface`    | white              | neutral-900     |
| `--r-color-text-primary`  | neutral-900        | neutral-50      |
| `--r-color-accent`        | brand-600          | brand-500       |
| `--r-color-border-subtle` | neutral-200        | neutral-800     |

Light values live on `:root`; dark values on `[data-theme='dark']` (and `.dark`
for class-based theming systems such as VitePress or Nuxt color-mode).

## Layer 3 — Component overrides

Every component reads a public custom property first and falls back to a
semantic token:

```css
.button {
  --_bg: var(--r-button-bg, var(--r-color-accent));
}
```

Rebrand without forking:

```css
:root {
  --r-button-bg: #0ea5e9;
  --r-button-bg-hover: #0284c7;
}
```

Each component's documentation lists its override tokens.

## Runtime theme switching

```ts
const { setTheme } = useTheme()
setTheme('dark')
```

`useTheme()` writes `data-theme="dark"` onto `<html>`; every semantic token
re-maps instantly because components reference variables, not literals.

## Programmatic access

Key scales are mirrored in TypeScript for tooling:

```ts
import { brand, space, radius } from 'renderui'

brand[600] // '#4f46e5'
```
