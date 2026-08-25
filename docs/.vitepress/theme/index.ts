import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { RenderUI } from '../../../src'
import '../../../src/styles/global.css'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(RenderUI)
  },
} satisfies Theme
