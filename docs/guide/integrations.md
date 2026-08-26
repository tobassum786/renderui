# Framework Integrations

RenderUI works with any Vue 3 project. Here are optimized setups for popular frameworks and build tools.

## Vite (Vanilla Vue 3)

### Minimal Setup

```bash
npm create vite@latest my-app -- --template vue-ts
cd my-app
npm install
npm install renderui
```

```ts
// src/main.ts
import { createApp } from 'vue'
import { RenderUI } from 'renderui'
import 'renderui/styles.css'
import App from './App.vue'

createApp(App).use(RenderUI).mount('#app')
```

### With UnoCSS / Tailwind (No Conflicts)

RenderUI uses `--r-` prefix for all CSS variables — zero collision risk.

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  plugins: [vue(), UnoCSS()]
})
```

```vue
<!-- App.vue - Mix RenderUI components with utility classes -->
<script setup>
import { RButton, RCard } from 'renderui'
</script>

<template>
  <div class="p-8">
    <RCard class="max-w-md mx-auto shadow-lg" title="Hybrid Approach">
      <p class="mb-4 text-gray-600 dark:text-gray-300">
        RenderUI components + UnoCSS utilities work seamlessly.
      </p>
      <RButton class="w-full" variant="primary">Submit</RButton>
    </RCard>
  </div>
</template>
```

## Nuxt 3

### Module Installation (Recommended)

```bash
npx nuxi@latest init my-app
cd my-app
npm install renderui
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [],
  css: ['renderui/styles.css'],
  vite: {
    vue: {
      script: {
        defineModel: true
      }
    }
  }
})
```

```vue
<!-- app.vue -->
<script setup>
import { RButton, RCard, useTheme } from 'renderui'

const { toggleTheme, resolvedTheme } = useTheme()
</script>

<template>
  <div class="min-h-screen" :class="{ dark: resolvedTheme === 'dark' }">
    <header class="p-4 border-b">
      <div class="max-w-4xl mx-auto flex justify-end">
        <RButton variant="ghost" @click="toggleTheme">
          {{ resolvedTheme === 'dark' ? '☀️' : '🌙' }} Toggle
        </RButton>
      </div>
    </header>
    <main class="max-w-4xl mx-auto p-8">
      <RCard title="Nuxt 3 + RenderUI" hoverable>
        <RButton block>Server-rendered!</RButton>
      </RCard>
    </main>
  </div>
</template>
```

### Auto-imports (Optional)

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  imports: {
    dirs: ['components'],
    presets: [
      {
        from: 'renderui',
        imports: ['RButton', 'RCard', 'RInput', 'RModal', 'useTheme']
      }
    ]
  }
})
```

## Astro

### Island Pattern (Recommended)

```bash
npm create astro@latest my-app
cd my-app
npm install renderui @astrojs/vue
```

```astro
--- 
// astro.config.mjs
import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'

export default defineConfig({
  integrations: [vue()]
})
```

```astro
---
// components/InteractiveCard.astro
import { RButton, RCard, RInput } from 'renderui'
import 'renderui/styles.css'
---

<RCard title="Astro Island" hoverable class="max-w-md">
  <RInput label="Email" placeholder="you@example.com" />
  <RButton block client:visible>Subscribe</RButton>
</RCard>
```

```astro
---
// pages/index.astro
import InteractiveCard from '../components/InteractiveCard.astro'
---

<html>
  <head>
    <title>Astro + RenderUI</title>
  </head>
  <body>
    <InteractiveCard client:visible />
  </body>
</html>
```

## SvelteKit (via Vite)

RenderUI is Vue-only, but you can use it in a SvelteKit monorepo with a shared Vite config:

```ts
// vite.config.ts (shared)
import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [sveltekit(), vue()]
})
```

## Laravel + Vite

```bash
composer create-project laravel/laravel my-app
cd my-app
npm install
npm install renderui vue@latest @vitejs/plugin-vue
```

```js
// vite.config.js
import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    laravel({ input: ['resources/css/app.css', 'resources/js/app.js'], refresh: true }),
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

```blade
<!-- resources/views/welcome.blade.php -->
<!DOCTYPE html>
<html>
<head>
  @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
  <div id="app"></div>
</body>
</html>
```

## Rails 7+ (Importmaps / Propshaft / Vite)

### With Vite (vite_rails gem)

```ruby
# Gemfile
gem 'vite_rails'
```

```bash
bundle install
bundle exec vite install
npm install renderui vue@latest @vitejs/plugin-vue
```

```js
// vite.config.ts
import { defineConfig } from 'vite'
import Rails from 'vite-plugin-rails'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [Rails(), vue()]
})
```

```js
// app/javascript/entrypoints/application.js
import { createApp } from 'vue'
import { RenderUI } from 'renderui'
import 'renderui/styles.css'
import App from '../components/App.vue'

createApp(App).use(RenderUI).mount('#app')
```

## Django + Vite

```bash
# Install django-vite
pip install django-vite
```

```python
# settings.py
INSTALLED_APPS = [
    'django_vite',
    # ...
]

DJANGO_VITE = {
    'default': {
        'dev_mode': DEBUG,
        'manifest_path': BASE_DIR / 'frontend' / 'dist' / '.vite' / 'manifest.json',
    }
}
```

```ts
// frontend/src/main.ts
import { createApp } from 'vue'
import { RenderUI } from 'renderui'
import 'renderui/styles.css'
import App from './App.vue'

createApp(App).use(RenderUI).mount('#app')
```

```html
<!-- templates/base.html -->
{% load django_vite %}
<!DOCTYPE html>
<html>
<head>
  {% vite_react_refresh %}
  {% vite_asset 'src/main.ts' %}
</head>
<body>
  <div id="app"></div>
</body>
</html>
```

## Electron

```bash
npm create electron-app@latest my-app -- --template=vite-vue
cd my-app
npm install renderui
```

```ts
// src/main.ts (renderer process)
import { createApp } from 'vue'
import { RenderUI } from 'renderui'
import 'renderui/styles.css'
import App from './App.vue'

createApp(App).use(RenderUI).mount('#app')
```

## Storybook

```bash
npx storybook@latest init --type vue3
npm install renderui
```

```ts
// .storybook/preview.ts
import { RenderUI } from 'renderui'
import 'renderui/styles.css'
import type { Preview } from '@storybook/vue3'

const preview: Preview = {
  decorators: [
    (story) => ({
      components: { story },
      template: '<div class="p-4"><story /></div>'
    })
  ],
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true
      }
    }
  }
}

export default preview
```

```ts
// .storybook/preview-head.html
<script>
  window.addEventListener('message', (event) => {
    if (event.data.type === 'SET_THEME') {
      document.documentElement.setAttribute('data-theme', event.data.theme)
    }
  })
</script>
```

```ts
// Button.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3'
import { RButton } from 'renderui'

const meta: Meta<typeof RButton> = {
  component: RButton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost', 'danger'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] }
  }
}

export default meta
type Story = StoryObj<typeof RButton>

export const Primary: Story = { args: { variant: 'primary', default: 'Primary' } }
export const Secondary: Story = { args: { variant: 'secondary', default: 'Secondary' } }
export const Loading: Story = { args: { loading: true, default: 'Loading...' } }
```

## Monorepo (Nx / Turborepo / pnpm Workspaces)

```json
// package.json (root)
{
  "workspaces": ["packages/*"],
  "devDependencies": {
    "renderui": "workspace:*"
  }
}
```

```json
// packages/ui/package.json
{
  "name": "@myorg/ui",
  "version": "0.1.0",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "peerDependencies": { "vue": "^3.5.0" }
}
```

```ts
// packages/ui/src/index.ts (re-export with your custom theme)
export { RenderUI, RButton, RCard, /* ... */ } from 'renderui'
export { default as '@myorg/ui/styles.css' } from 'renderui/styles.css'
```

## Docker

```dockerfile
# Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```nginx
# nginx.conf
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## CDN / No-Build (ESM Import)

For quick prototypes or non-bundled projects:

```html
<!DOCTYPE html>
<html>
<head>
  <script type="importmap">
  {
    "imports": {
      "vue": "https://esm.sh/vue@3.5.13",
      "renderui": "https://esm.sh/renderui@0.1.0"
    }
  }
  </script>
  <link rel="stylesheet" href="https://esm.sh/renderui@0.1.0/styles.css">
</head>
<body>
  <div id="app"></div>
  <script type="module">
    import { createApp } from 'vue'
    import { RenderUI, RButton } from 'renderui'

    createApp({
      components: { RButton },
      template: '<RButton @click="alert">Click me</RButton>',
      methods: { alert() { alert('RenderUI via CDN!') } }
    }).use(RenderUI).mount('#app')
  </script>
</body>
</html>
```

## SSR Considerations

RenderUI is **SSR-safe** — no `window`/`document` access in component setup.

```ts
// nuxt.config.ts / vite.config.ts - ensure proper hydration
export default defineConfig({
  ssr: {
    noExternal: ['renderui']
  }
})
```

### Hydration Mismatch Prevention

```vue
<!-- Use ClientOnly for theme-dependent renders -->
<script setup>
import { useTheme } from 'renderui'
const { resolvedTheme } = useTheme()
</script>

<template>
  <ClientOnly>
    <div v-if="resolvedTheme === 'dark'" class="dark-only-content">
      Dark mode content
    </div>
  </ClientOnly>
</template>
```

## Testing Setup

### Vitest + Vue Test Utils

```ts
// tests/setup.ts
import { RenderUI } from 'renderui'
import 'renderui/styles.css'
import { config } from '@vue/test-utils'

config.global.plugins = [RenderUI]
```

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.ts']
  }
})
```

```ts
// tests/MyComponent.test.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { RButton } from 'renderui'

describe('RButton', () => {
  it('renders primary variant', () => {
    const wrapper = mount(RButton, { props: { variant: 'primary' } })
    expect(wrapper.classes()).toContain('primary')
  })

  it('emits click when not disabled', async () => {
    const wrapper = mount(RButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
```

## TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "jsx": "preserve",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "types": ["vite/client", "vitest/globals"],
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

## IDE Support

### VS Code Extensions

- **Vue Language Features (Volar)** — Official Vue 3 support
- **ESLint** — For linting
- **Stylelint** — For CSS/token linting

### Recommended Settings

```json
// .vscode/settings.json
{
  "vue.codeActions.enabled": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.fixAll.stylelint": "explicit"
  },
  "css.customData": [".vscode/renderui-tokens.json"]
}
```

```json
// .vscode/renderui-tokens.json (for IntelliSense on CSS variables)
{
  "version": 1.1,
  "properties": [
    { "name": "--r-color-brand-500", "description": "Brand primary color", "syntax": "<color>" },
    { "name": "--r-color-bg-canvas", "description": "Page background", "syntax": "<color>" },
    { "name": "--r-space-4", "description": "Spacing unit (1rem)", "syntax": "<length>" }
    // ... add more as needed
  ]
}
```