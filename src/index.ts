/**
 * RenderUI public API.
 *
 * Library usage:
 *   import { createApp } from 'vue'
 *   import { RenderUI } from 'renderui'
 *   import 'renderui/styles.css'
 *
 *   createApp(App).use(RenderUI).mount('#app')
 */

import type { App, Component } from 'vue'
import * as componentExports from './components'

type Installable = Component & { install: (app: App) => void }

function isInstallable(value: unknown): value is Installable {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    'install' in value &&
    typeof (value as Installable).install === 'function'
  )
}

const installables = Object.values(componentExports).filter(isInstallable)

export const RenderUI = {
  install(app: App): void {
    for (const component of installables) {
      component.install(app)
    }
  },
}

export * from './components'
export * from './tokens/tokens'
export * from './utils/class-names'
export * from './composables/use-theme'

import './styles/global.css'
