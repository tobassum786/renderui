# Getting Started

RenderUI is a **themeable Vue 3 design system** built on design tokens, CSS Modules, and TypeScript. Zero runtime dependencies beyond Vue itself (~10 kB gzipped JS for all 16 components).

## Installation

```bash
# npm
npm install renderui

# pnpm
pnpm add renderui

# yarn
yarn add renderui
```

## Quick Start

```ts
// main.ts
import { createApp } from 'vue'
import { RenderUI } from 'renderui'
import 'renderui/styles.css'

import App from './App.vue'

createApp(App).use(RenderUI).mount('#app')
```

```vue
<!-- App.vue -->
<script setup>
import { RButton, RCard, RInput } from 'renderui'
</script>

<template>
  <RCard title="Welcome" hoverable>
    <RInput label="Email" placeholder="you@example.com" />
    <RButton block class="mt-4">Get Started</RButton>
  </RCard>
</template>
```

## Cherry-picking (Tree-shakeable)

Import only what you need — unused components are eliminated by your bundler:

```ts
import { RButton, RModal, useTheme } from 'renderui'
import 'renderui/styles.css' // still required once
```

## Vite / Nuxt / Astro Setup

### Vite (vanilla)

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "renderui/styles.css" as *;`
      }
    }
  }
})
```

### Nuxt 3

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/vite'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "renderui/styles.css" as *;`
        }
      }
    }
  }
})
```

```vue
<!-- app.vue -->
<script setup>
import { RButton } from 'renderui'
</script>

<template>
  <RButton>Nuxt + RenderUI</RButton>
</template>
```

### Astro

```astro
---
// components/RenderUIButton.astro
import { RButton } from 'renderui'
import 'renderui/styles.css'
---

<RButton client:visible>Astro + RenderUI</RButton>
```

### Laravel + Vite

```js
// vite.config.js
import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    laravel({ input: 'resources/css/app.css', refresh: true }),
    vue()
  ]
})
```

```js
// resources/js/app.js
import { createApp } from 'vue'
import { RenderUI } from 'renderui'
import 'renderui/styles.css'
import App from './App.vue'

createApp(App).use(RenderUI).mount('#app')
```

## TypeScript

RenderUI ships with first-class TypeScript support. All component props, events, and slots are typed.

```ts
import type { RButtonProps, RInputProps } from 'renderui'

const buttonProps: RButtonProps = {
  variant: 'primary',
  size: 'lg',
  loading: false
}
```

## Browser Support

| Browser | Version |
|---------|---------|
| Chrome  | 90+     |
| Firefox | 88+     |
| Safari  | 14+     |
| Edge    | 90+     |

Requires CSS Custom Properties and `:focus-visible` support.

## Next Steps

- [Theming & Tokens](/guide/theming) — customize colors, spacing, radii
- [Components](/components/button) — browse all 16 components
- [Integration Guides](/guide/integrations) — framework-specific setup