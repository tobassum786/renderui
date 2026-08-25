# Getting Started

RenderUI is a component library and token system for Vue 3 applications.

## Installation

```bash
npm install renderui
```

Vue 3.5+ is the only peer dependency.

## Quick start

Register everything globally and load the stylesheet once:

```ts
import { createApp } from 'vue'
import { RenderUI } from 'renderui'
import 'renderui/styles.css'

createApp(App).use(RenderUI).mount('#app')
```

```vue-html
<RButton>Ship it</RButton>
```

### Tree-shakeable usage

Every component is also a named export with its own `install`, so bundles only
pay for what you import:

```ts
import { RButton, RInput } from 'renderui'
import 'renderui/styles.css'
```

## Dark mode

Call `useTheme()` once anywhere — it applies `data-theme` to `<html>` and
persists the choice:

```ts
import { useTheme } from 'renderui'

const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme()

setTheme('dark') // 'light' | 'dark' | 'system'
```

The docs site you are reading uses it — try the toggle in the navbar.

## What's inside

- **16 components** across general, form, feedback and navigation categories
- **Design tokens** for color, type, spacing, radius, shadow, motion and z-index
- **TypeScript** types for every prop and event
- **51 unit tests** guarding behavior and accessibility contracts
