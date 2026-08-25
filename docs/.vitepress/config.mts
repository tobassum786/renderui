import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'RenderUI',
  description:
    'A themeable Vue 3 design system: design tokens, accessible components, dark mode.',
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]],
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'RenderUI',
    nav: [
      { text: 'Guide', link: '/guide/getting-started', activeMatch: '/guide/' },
      { text: 'Components', link: '/components/button', activeMatch: '/components/' },
      { text: 'Playground', link: 'https://github.com/tobassum786/renderui' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Theming & Tokens', link: '/guide/theming' },
          ],
        },
      ],
      '/components/': [
        {
          text: 'General',
          items: [
            { text: 'Button', link: '/components/button' },
            { text: 'Card', link: '/components/card' },
            { text: 'Badge', link: '/components/badge' },
            { text: 'Avatar', link: '/components/avatar' },
          ],
        },
        {
          text: 'Form Controls',
          items: [
            { text: 'Input', link: '/components/input' },
            { text: 'Textarea', link: '/components/textarea' },
            { text: 'Select', link: '/components/select' },
            { text: 'Checkbox', link: '/components/checkbox' },
            { text: 'Switch', link: '/components/switch' },
          ],
        },
        {
          text: 'Feedback',
          items: [
            { text: 'Alert', link: '/components/alert' },
            { text: 'Modal', link: '/components/modal' },
            { text: 'Spinner', link: '/components/spinner' },
            { text: 'Progress', link: '/components/progress' },
            { text: 'Skeleton', link: '/components/skeleton' },
          ],
        },
        {
          text: 'Navigation & Overlay',
          items: [
            { text: 'Tabs', link: '/components/tabs' },
            { text: 'Tooltip', link: '/components/tooltip' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/tobassum786/renderui' },
    ],
    outline: [2, 3],
    search: {
      provider: 'local',
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 tobassum786',
    },
  },
})
