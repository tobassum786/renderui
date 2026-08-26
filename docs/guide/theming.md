# Theming & Tokens

RenderUI uses a **three-layer token architecture** that makes theming predictable, powerful, and maintainable.

## Token Layers

```
┌─────────────────────────────────────────────────────────────┐
│  1. PRIMITIVES (raw values)                                 │
│  --r-color-brand-500: #6366f1                               │
│  --r-space-4: 1rem                                           │
│  --r-radius-lg: 0.75rem                                      │
└─────────────────────────────────────────────────────────────┘
                            ↓ mapped once per theme
┌─────────────────────────────────────────────────────────────┐
│  2. SEMANTIC (intent-based roles)                           │
│  --r-color-accent: var(--r-color-brand-600)                 │
│  --r-color-bg-canvas: var(--r-color-neutral-50)             │
│  --r-color-text-primary: var(--r-color-neutral-900)         │
└─────────────────────────────────────────────────────────────┘
                            ↓ consumed by components
┌─────────────────────────────────────────────────────────────┐
│  3. COMPONENT (per-component overrides)                     │
│  --r-button-bg: var(--r-color-accent)                       │
│  --r-input-bg: var(--r-color-bg-surface)                    │
│  --r-card-border: var(--r-color-border-subtle)              │
└─────────────────────────────────────────────────────────────┘
```

**Rule**: Components **only** reference semantic tokens (layer 2) or component tokens (layer 3). Primitives are never used directly in component styles.

## Light / Dark Themes

Themes are applied via `[data-theme]` attribute (set by `useTheme()`) or `.dark` class:

```css
/* tokens.css - Light (default) on :root */
:root {
  --r-color-bg-canvas: var(--r-color-neutral-50);
  --r-color-text-primary: var(--r-color-neutral-900);
  --r-color-accent: var(--r-color-brand-600);
}

/* Dark theme on [data-theme="dark"] or .dark */
[data-theme='dark'],
.dark {
  --r-color-bg-canvas: var(--r-color-neutral-950);
  --r-color-text-primary: var(--r-color-neutral-50);
  --r-color-accent: var(--r-color-brand-500);
}
```

## Switching Themes

```vue
<script setup>
import { useTheme } from 'renderui'

const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme()
</script>

<template>
  <div class="theme-controls">
    <span>Current: {{ resolvedTheme }}</span>
    <RButton variant="secondary" @click="toggleTheme">
      Toggle
    </RButton>
    <RSelect
      v-model="theme"
      :options="[
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
        { label: 'System', value: 'system' }
      ]"
    />
  </div>
</template>
```

### `useTheme()` API

| Property | Type | Description |
|----------|------|-------------|
| `theme` | `Ref<'light' \| 'dark' \| 'system'>` | User preference (persisted) |
| `resolvedTheme` | `ComputedRef<'light' \| 'dark'>` | Actual applied theme |
| `setTheme(value)` | `Function` | Set preference + persist |
| `toggleTheme()` | `Function` | Toggle light/dark |

## Customizing the Brand Color

Change **one variable** to rebrand the entire system:

```css
/* your-theme.css - import AFTER renderui/styles.css */
@import 'renderui/styles.css';

:root {
  /* Override the brand primitive scale */
  --r-color-brand-50: #f0f9ff;
  --r-color-brand-100: #e0f2fe;
  --r-color-brand-200: #bae6fd;
  --r-color-brand-300: #7dd3fc;
  --r-color-brand-400: #38bdf8;
  --r-color-brand-500: #0ea5e9;  /* ← your brand */
  --r-color-brand-600: #0284c7;
  --r-color-brand-700: #0369a1;
  --r-color-brand-800: #075985;
  --r-color-brand-900: #0c4a6e;

  /* Semantic tokens automatically remap! */
  /* --r-color-accent becomes your brand-600 */
  /* --r-color-link becomes your brand-600 */
}
```

```ts
// main.ts
import { createApp } from 'vue'
import { RenderUI } from 'renderui'
import './your-theme.css'  // ← your custom theme

createApp(App).use(RenderUI).mount('#app')
```

## Per-Component Overrides

Every component exposes **public CSS custom properties** for surgical customization without forking:

```css
/* Only affects RButton — nothing else */
:root {
  --r-button-bg: var(--r-color-success-600);
  --r-button-bg-hover: var(--r-color-success-700);
  --r-button-radius: var(--r-radius-full);  /* pill buttons */
}

/* Only affects RInput */
:root {
  --r-input-bg: var(--r-color-bg-sunken);
  --r-input-border: var(--r-color-border-strong);
  --r-input-border-focus: var(--r-color-brand-500);
  --r-input-radius: var(--r-radius-lg);
}

/* Only affects RCard */
:root {
  --r-card-bg: var(--r-color-bg-surface);
  --r-card-border: var(--r-color-border-subtle);
  --r-card-radius: var(--r-radius-xl);
  --r-card-shadow: var(--r-shadow-md);
}
```

### Complete Component Token Reference

| Component | Tokens |
|-----------|--------|
| **RButton** | `--r-button-bg`, `--r-button-bg-hover`, `--r-button-bg-active`, `--r-button-text`, `--r-button-border`, `--r-button-radius` |
| **RInput / RTextarea / RSelect** | `--r-input-bg`, `--r-input-border`, `--r-input-border-hover`, `--r-input-border-focus`, `--r-input-text`, `--r-input-placeholder`, `--r-input-radius`, `--r-input-height` |
| **RCard** | `--r-card-bg`, `--r-card-border`, `--r-card-radius`, `--r-card-shadow`, `--r-card-padding` |
| **RBadge** | `--r-badge-bg`, `--r-badge-text`, `--r-badge-border`, `--r-badge-radius` |
| **RAlert** | `--r-alert-bg`, `--r-alert-border`, `--r-alert-text`, `--r-alert-radius`, `--r-alert-icon-color` |
| **RModal** | `--r-modal-bg`, `--r-modal-border`, `--r-modal-radius`, `--r-modal-shadow`, `--r-modal-overlay` |
| **RProgress** | `--r-progress-bg`, `--r-progress-fill`, `--r-progress-radius`, `--r-progress-height` |
| **RSpinner** | `--r-spinner-color`, `--r-spinner-track`, `--r-spinner-size` |
| **RAvatar** | `--r-avatar-bg`, `--r-avatar-text`, `--r-avatar-border`, `--r-avatar-radius` |
| **RTabs** | `--r-tabs-bg`, `--r-tabs-indicator`, `--r-tabs-text`, `--r-tabs-text-active`, `--r-tabs-border` |
| **RTooltip** | `--r-tooltip-bg`, `--r-tooltip-text`, `--r-tooltip-radius`, `--r-tooltip-arrow-size` |
| **RCheckbox / RSwitch** | `--r-control-bg`, `--r-control-border`, `--r-control-checked`, `--r-control-radius`, `--r-control-size` |

## Creating a Complete Custom Theme

```css
/* themes/acme-theme.css */
@import 'renderui/styles.css';

/* 1. Primitive overrides — your brand palette */
:root {
  --r-color-brand-50: #fdf4ff;
  --r-color-brand-100: #fae8ff;
  --r-color-brand-200: #f5d0fe;
  --r-color-brand-300: #f0abfc;
  --r-color-brand-400: #e879f9;
  --r-color-brand-500: #d946ef;  /* Acme Purple */
  --r-color-brand-600: #c026d3;
  --r-color-brand-700: #a21caf;
  --r-color-brand-800: #86198f;
  --r-color-brand-900: #701a75;

  /* Optional: custom success/warning/danger */
  --r-color-success-500: #10b981;
  --r-color-warning-500: #f59e0b;
  --r-color-danger-500: #ef4444;
}

/* 2. Semantic remapping (optional — defaults work) */
:root {
  --r-color-accent: var(--r-color-brand-600);
  --r-color-link: var(--r-color-brand-600);
}

[data-theme='dark'] {
  --r-color-accent: var(--r-color-brand-400);
  --r-color-link: var(--r-color-brand-400);
}

/* 3. Component-level tweaks (optional) */
:root {
  --r-button-radius: var(--r-radius-full);
  --r-input-radius: var(--r-radius-lg);
  --r-card-radius: var(--r-radius-xl);
  --r-card-shadow: var(--r-shadow-lg);
}
```

## Using Design Tokens in Your App

### CSS Approach (Recommended)

```css
.my-component {
  /* Use semantic tokens — they adapt to theme automatically */
  background: var(--r-color-bg-surface);
  color: var(--r-color-text-primary);
  border: 1px solid var(--r-color-border-subtle);
  border-radius: var(--r-radius-lg);
  padding: var(--r-space-4);
  box-shadow: var(--r-shadow-md);
  font-family: var(--r-font-sans);
}
```

### TypeScript/JavaScript Approach

```ts
// tokens.ts mirrors the CSS tokens for programmatic access
import { brand, neutral, fontSize, space, radius } from 'renderui/tokens'

// Use in inline styles, canvas, charts, etc.
const styles = {
  background: brand[500],
  color: neutral[0],
  padding: space[4],
  borderRadius: radius.lg,
  fontSize: fontSize.md
}
```

## CSS Variable Reference

### Color Primitives

```css
/* Neutral (slate) */
--r-color-neutral-0 through --r-color-neutral-950

/* Brand (indigo by default) */
--r-color-brand-50 through --r-color-brand-900

/* Semantic status colors */
--r-color-success-50/100/500/600/700
--r-color-warning-50/100/500/600/700
--r-color-danger-50/100/500/600/700
--r-color-info-50/100/500/600/700
```

### Semantic Colors (Theme-Aware)

```css
/* Surfaces */
--r-color-bg-canvas        /* Page background */
--r-color-bg-surface       /* Card/surface background */
--r-color-bg-sunken        /* Input/sunken background */
--r-color-bg-overlay       /* Modal overlay */

/* Text */
--r-color-text-primary     /* Primary text */
--r-color-text-secondary   /* Secondary text */
--r-color-text-muted       /* Muted/disabled text */
--r-color-text-on-brand    /* Text on brand background */

/* Borders */
--r-color-border-subtle    /* Subtle borders */
--r-color-border-strong    /* Strong borders */
--r-color-focus-ring       /* Focus ring color */

/* Interactive */
--r-color-accent           /* Primary action color */
--r-color-accent-hover     /* Hover state */
--r-color-accent-active    /* Active/pressed state */
--r-color-accent-subtle    /* Subtle brand background */
--r-color-link             /* Link color */

/* Status */
--r-color-success / --r-color-success-subtle
--r-color-warning / --r-color-warning-subtle
--r-color-danger / --r-color-danger-subtle
--r-color-info / --r-color-info-subtle
```

### Typography

```css
--r-font-sans              /* Primary font stack */
--r-font-mono              /* Monospace font stack */
--r-font-size-xs through --r-font-size-4xl
--r-font-weight-regular/medium/semibold/bold
--r-line-height-tight/normal/relaxed
```

### Spacing & Radius

```css
--r-space-0 through --r-space-24  /* 4px base grid */
--r-radius-none through --r-radius-full
```

### Motion & Z-Index

```css
--r-duration-fast/base/slow
--r-ease-out/in-out
--r-z-dropdown/sticky/overlay/modal/toast
```

## Advanced: Multiple Themes

Support multiple brands in one app using CSS scoping:

```css
/* Base theme (default) */
:root { /* ... */ }

/* Tenant A theme */
[data-theme='tenant-a'] {
  --r-color-brand-500: #0ea5e9;
  --r-color-brand-600: #0284c7;
}

/* Tenant B theme */
[data-theme='tenant-b'] {
  --r-color-brand-500: #d946ef;
  --r-color-brand-600: #c026d3;
}
```

```vue
<!-- App.vue -->
<script setup>
import { useTheme } from 'renderui'

const { setTheme } = useTheme()

function switchTenant(tenant: 'a' | 'b') {
  setTheme(`tenant-${tenant}`)
}
</script>

<template>
  <RSelect
    v-model="tenant"
    :options="[
      { label: 'Default', value: 'light' },
      { label: 'Tenant A', value: 'tenant-a' },
      { label: 'Tenant B', value: 'tenant-b' }
    ]"
  />
</template>
```

## Best Practices

1. **Always use semantic tokens** in your app CSS — they adapt to light/dark automatically
2. **Override at the right layer** — brand primitives for rebranding, component tokens for surgical changes
3. **Import custom theme AFTER** `renderui/styles.css` to ensure overrides win
4. **Test both themes** — use `useTheme()` to toggle during development
5. **Keep overrides minimal** — the default semantic mapping covers 95% of cases