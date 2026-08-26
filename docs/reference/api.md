# API Reference

Complete TypeScript API for all RenderUI exports.

## Main Exports

```ts
import {
  // Plugin
  RenderUI,

  // Components
  RButton,
  RCard,
  RBadge,
  RAvatar,
  RInput,
  RTextarea,
  RSelect,
  RCheckbox,
  RSwitch,
  RAlert,
  RModal,
  RSpinner,
  RProgress,
  RSkeleton,
  RTabs,
  RTooltip,

  // Composables
  useTheme,

  // Tokens (TypeScript mirror)
  brand,
  neutral,
  fontSize,
  space,
  radius,

  // Utilities
  cn
} from 'renderui'
```

---

## Plugin: `RenderUI`

```ts
import { createApp } from 'vue'
import { RenderUI } from 'renderui'
import 'renderui/styles.css'

createApp(App).use(RenderUI).mount('#app')
```

Registers all 16 components globally. Tree-shaking still works for cherry-picked imports.

---

## Composables

### `useTheme()`

```ts
const {
  theme,              // Ref<'light' | 'dark' | 'system'> — user preference (persisted)
  resolvedTheme,      // ComputedRef<'light' | 'dark'> — actual applied theme
  setTheme,           // (value: 'light' | 'dark' | 'system') => void
  toggleTheme         // () => void
} = useTheme()
```

**Behavior:**
- `'system'` follows `prefers-color-scheme` and updates live
- Preference persisted to `localStorage` (`renderui-theme`)
- Sets `[data-theme]` on `<html>` for CSS access
- Also adds `.dark` class for VitePress/other tool compatibility

---

## Components

### RButton

```ts
import { RButton } from 'renderui'
import type { RButtonProps } from 'renderui'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Native button type |
| `disabled` | `boolean` | `false` | Disables interaction |
| `loading` | `boolean` | `false` | Shows spinner, sets `aria-busy` |
| `block` | `boolean` | `false` | Full-width (`display: flex; width: 100%`) |

**Events:** `click: [event: MouseEvent]`

**Slots:** `default`, `icon`, `icon-right`

**CSS Variables:**
```css
--r-button-bg
--r-button-bg-hover
--r-button-bg-active
--r-button-text
--r-button-border
--r-button-radius
```

---

### RCard

```ts
import { RCard } from 'renderui'
import type { RCardProps } from 'renderui'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Card header text |
| `hoverable` | `boolean` | `false` | Elevate on hover |
| `bordered` | `boolean` | `true` | Show border |

**Slots:** `default`, `header`, `footer`

**CSS Variables:**
```css
--r-card-bg
--r-card-border
--r-card-radius
--r-card-shadow
--r-card-padding
```

---

### RBadge

```ts
import { RBadge } from 'renderui'
import type { RBadgeProps } from 'renderui'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'neutral' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `'neutral'` | Color variant |
| `dot` | `boolean` | `false` | Show indicator dot |
| `size` | `'sm' \| 'md'` | `'md'` | Badge size |

**Slots:** `default`

**CSS Variables:**
```css
--r-badge-bg
--r-badge-text
--r-badge-border
--r-badge-radius
```

---

### RAvatar

```ts
import { RAvatar } from 'renderui'
import type { RAvatarProps } from 'renderui'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | — | Image URL |
| `alt` | `string` | — | Alt text for image |
| `name` | `string` | — | Fallback: generates initials |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Avatar size |

**CSS Variables:**
```css
--r-avatar-bg
--r-avatar-text
--r-avatar-border
--r-avatar-radius
```

---

### RInput

```ts
import { RInput } from 'renderui'
import type { RInputProps } from 'renderui'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | — | v-model value |
| `label` | `string` | — | Label text |
| `type` | `string` | `'text'` | Input type |
| `placeholder` | `string` | — | Placeholder text |
| `hint` | `string` | — | Helper text below input |
| `error` | `string` | — | Error message (shows red) |
| `disabled` | `boolean` | `false` | Disable input |
| `required` | `boolean` | `false` | Required attribute |
| `autocomplete` | `string` | — | Autocomplete hint |

**Events:** `update:modelValue: [value: string]`, `blur`, `focus`

**CSS Variables:**
```css
--r-input-bg
--r-input-border
--r-input-border-hover
--r-input-border-focus
--r-input-text
--r-input-placeholder
--r-input-radius
--r-input-height
```

---

### RTextarea

```ts
import { RTextarea } from 'renderui'
import type { RTextareaProps } from 'renderui'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | — | v-model value |
| `label` | `string` | — | Label text |
| `placeholder` | `string` | — | Placeholder text |
| `hint` | `string` | — | Helper text |
| `error` | `string` | — | Error message |
| `rows` | `number` | `3` | Visible rows |
| `disabled` | `boolean` | `false` | Disable |
| `resize` | `'none' \| 'vertical' \| 'both'` | `'vertical'` | Resize handle |

**Events:** `update:modelValue`, `blur`, `focus`

**CSS Variables:** Same as RInput

---

### RSelect

```ts
import { RSelect } from 'renderui'
import type { RSelectProps, RSelectOption } from 'renderui'
```

```ts
interface RSelectOption {
  label: string
  value: string
  disabled?: boolean
}
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | — | v-model value |
| `label` | `string` | — | Label text |
| `options` | `RSelectOption[]` | `[]` | Options array |
| `placeholder` | `string` | — | Placeholder when empty |
| `hint` | `string` | — | Helper text |
| `error` | `string` | — | Error message |
| `disabled` | `boolean` | `false` | Disable |
| `multiple` | `boolean` | `false` | Allow multiple selection |
| `searchable` | `boolean` | `false` | Enable search filter |

**Events:** `update:modelValue: [value: string \| string[]]`, `change`

**CSS Variables:** Same as RInput

---

### RCheckbox

```ts
import { RCheckbox } from 'renderui'
import type { RCheckboxProps } from 'renderui'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | — | v-model value |
| `label` | `string` | — | Label text |
| `hint` | `string` | — | Helper text |
| `disabled` | `boolean` | `false` | Disable |
| `indeterminate` | `boolean` | `false` | Indeterminate state |

**Events:** `update:modelValue: [value: boolean]`, `change`

**CSS Variables:**
```css
--r-control-bg
--r-control-border
--r-control-checked
--r-control-radius
--r-control-size
```

---

### RSwitch

```ts
import { RSwitch } from 'renderui'
import type { RSwitchProps } from 'renderui'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | — | v-model value |
| `label` | `string` | — | Label text |
| `hint` | `string` | — | Helper text |
| `disabled` | `boolean` | `false` | Disable |

**Events:** `update:modelValue: [value: boolean]`, `change`

**CSS Variables:** Same as RCheckbox

---

### RAlert

```ts
import { RAlert } from 'renderui'
import type { RAlertProps } from 'renderui'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'neutral' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `'neutral'` | Visual variant |
| `title` | `string` | — | Alert title |
| `dismissible` | `boolean` | `false` | Show close button |
| `icon` | `boolean` | `true` | Show variant icon |

**Events:** `dismiss` (when dismissed)

**Slots:** `default` (content), `icon` (custom icon)

**CSS Variables:**
```css
--r-alert-bg
--r-alert-border
--r-alert-text
--r-alert-radius
--r-alert-icon-color
```

---

### RModal

```ts
import { RModal } from 'renderui'
import type { RModalProps } from 'renderui'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | — | v-model visibility |
| `title` | `string` | — | Modal title |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Modal width |
| `closeOnOverlay` | `boolean` | `true` | Close on backdrop click |
| `closeOnEscape` | `boolean` | `true` | Close on Escape key |
| `trapped` | `boolean` | `true` | Focus trap (basic) |

**Events:** `update:modelValue: [value: boolean]`, `close`

**Slots:** `default` (body), `header`, `footer`

**CSS Variables:**
```css
--r-modal-bg
--r-modal-border
--r-modal-radius
--r-modal-shadow
--r-modal-overlay
```

---

### RSpinner

```ts
import { RSpinner } from 'renderui'
import type { RSpinnerProps } from 'renderui'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Spinner size |
| `variant` | `'primary' \| 'secondary' \| 'white'` | `'primary'` | Color variant |

**CSS Variables:**
```css
--r-spinner-color
--r-spinner-track
--r-spinner-size
```

---

### RProgress

```ts
import { RProgress } from 'renderui'
import type { RProgressProps } from 'renderui'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Progress (0-100) |
| `variant` | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | Color variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Bar height |
| `label` | `string` | — | Label text |
| `showValue` | `boolean` | `false` | Show percentage |
| `indeterminate` | `boolean` | `false` | Animated indeterminate |

**CSS Variables:**
```css
--r-progress-bg
--r-progress-fill
--r-progress-radius
--r-progress-height
```

---

### RSkeleton

```ts
import { RSkeleton } from 'renderui'
import type { RSkeletonProps } from 'renderui'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'text' \| 'rect' \| 'circle'` | `'text'` | Shape variant |
| `width` | `string \| number` | `'100%'` | Width |
| `height` | `string \| number` | — | Height (auto for text) |
| `animated` | `boolean` | `true` | Shimmer animation |

**CSS Variables:**
```css
--r-skeleton-bg
--r-skeleton-shimmer
--r-skeleton-radius
```

---

### RTabs

```ts
import { RTabs } from 'renderui'
import type { RTabsProps, RTabsTab } from 'renderui'
```

```ts
interface RTabsTab {
  id: string
  label: string
  disabled?: boolean
}
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | — | v-model active tab ID |
| `tabs` | `RTabsTab[]` | `[]` | Tab definitions |
| `variant` | `'line' \| 'enclosed' \| 'soft'` | `'line'` | Visual style |

**Events:** `update:modelValue: [id: string]`

**Slots:** `panel-{tabId}` (panel content)

**CSS Variables:**
```css
--r-tabs-bg
--r-tabs-indicator
--r-tabs-text
--r-tabs-text-active
--r-tabs-border
```

---

### RTooltip

```ts
import { RTooltip } from 'renderui'
import type { RTooltipProps } from 'renderui'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | — | Tooltip text (required) |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Position |
| `offset` | `number` | `8` | Distance from trigger |
| `delay` | `number` | `150` | Show delay (ms) |

**Slots:** `default` (trigger element — required)

**CSS Variables:**
```css
--r-tooltip-bg
--r-tooltip-text
--r-tooltip-radius
--r-tooltip-arrow-size
```

---

## Tokens (TypeScript Mirror)

```ts
import { brand, neutral, fontSize, space, radius } from 'renderui/tokens'
```

```ts
// brand: { 50: '#eef2ff', 100: '#e0e7ff', ..., 900: '#312e81' }
brand[500] // '#6366f1'

// neutral: { 0: '#ffffff', 50: '#f8fafc', ..., 950: '#020617' }
neutral[900] // '#0f172a'

// fontSize: { xs: '0.75rem', sm: '0.875rem', ..., '4xl': '2.25rem' }
fontSize.lg // '1.125rem'

// space: { 0: '0', px: '1px', 1: '0.25rem', ..., 24: '6rem' }
space[4] // '1rem'

// radius: { none: '0', xs: '0.25rem', ..., full: '9999px' }
radius.lg // '0.75rem'
```

---

## Utilities

### `cn(...classes)`

```ts
import { cn } from 'renderui'

cn('base', { active: isActive, disabled: isDisabled }, 'extra')
// → 'base active extra' (if isActive, not isDisabled)
```

Tiny class name utility used internally. Handles strings, objects, arrays, and conditional classes.

---

## CSS Custom Properties (Complete List)

### Primitives (Never use directly in components)

```css
/* Colors */
--r-color-neutral-0 ... --r-color-neutral-950
--r-color-brand-50 ... --r-color-brand-900
--r-color-success-50/100/500/600/700
--r-color-warning-50/100/500/600/700
--r-color-danger-50/100/500/600/700
--r-color-info-50/100/500/600/700

/* Typography */
--r-font-sans, --r-font-mono
--r-font-size-xs ... --r-font-size-4xl
--r-font-weight-regular/medium/semibold/bold
--r-line-height-tight/normal/relaxed

/* Spacing */
--r-space-0 ... --r-space-24

/* Radius */
--r-radius-none ... --r-radius-full

/* Shadows */
--r-shadow-xs/sm/md/lg

/* Motion */
--r-duration-fast/base/slow
--r-ease-out/in-out

/* Z-index */
--r-z-dropdown/sticky/overlay/modal/toast
```

### Semantic (Use these in your app CSS)

```css
/* Surfaces */
--r-color-bg-canvas, --r-color-bg-surface, --r-color-bg-sunken, --r-color-bg-overlay

/* Text */
--r-color-text-primary, --r-color-text-secondary, --r-color-text-muted, --r-color-text-on-brand

/* Borders */
--r-color-border-subtle, --r-color-border-strong, --r-color-focus-ring

/* Interactive */
--r-color-accent, --r-color-accent-hover, --r-color-accent-active
--r-color-accent-subtle, --r-color-accent-subtle-hover
--r-color-link, --r-color-link-hover

/* Status */
--r-color-success, --r-color-success-subtle
--r-color-warning, --r-color-warning-subtle
--r-color-danger, --r-color-danger-subtle
--r-color-info, --r-color-info-subtle
```

### Component Overrides (Per-component customization)

See [Theming Guide](/guide/theming#per-component-overrides) for complete table.

---

## TypeScript Types

All component props, emits, and slots are fully typed. Import types directly:

```ts
import type {
  RButtonProps,
  RButtonEmits,
  RButtonSlots,
  RCardProps,
  RInputProps,
  RModalProps,
  // ... all components
} from 'renderui'

// Usage in your own components
interface MyButtonProps extends RButtonProps {
  analyticsId?: string
}
```