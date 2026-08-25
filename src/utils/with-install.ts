import type { Component } from 'vue'

/**
 * Attaches an `install` method so a component can also be registered
 * globally via `app.use(RButton)`.
 */
export function withInstall<T extends Component>(component: T): T & {
  install: (app: import('vue').App) => void
} {
  const comp = component as T & { install: (app: import('vue').App) => void }
  comp.install = (app: import('vue').App) => {
    const name = (comp as { name?: string }).name
    if (name) app.component(name, comp)
  }
  return comp
}
