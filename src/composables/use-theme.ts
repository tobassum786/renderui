import { computed, ref, watch } from 'vue'

export type Theme = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'

const STORAGE_KEY = 'renderui-theme'

function readStoredTheme(): Theme {
  if (typeof localStorage === 'undefined') return 'system'
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : 'system'
  } catch {
    return 'system'
  }
}

function systemPrefersDark(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )
}

const theme = ref<Theme>(readStoredTheme())
const systemDark = ref(systemPrefersDark())


let initialized = false

function applyTheme(value: ResolvedTheme): void {
  if (typeof document === 'undefined') return
  document.documentElement.dataset.theme = value
}

function init(): void {
  if (initialized || typeof window === 'undefined') return
  initialized = true

  window.matchMedia?.('(prefers-color-scheme: dark)').addEventListener?.(
    'change',
    (event) => {
      systemDark.value = event.matches
    },
  )

  watch(theme, persist)
  watch(resolvedTheme, applyTheme)
}

function persist(value: Theme): void {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    /* storage unavailable — non-fatal */
  }
}

const resolvedTheme = computed<ResolvedTheme>(() => {
  if (theme.value !== 'system') return theme.value
  return systemDark.value ? 'dark' : 'light'
})

/**
 * Global theme controller.
 * Applies `data-theme` on `<html>` so all tokens switch at once.
 */
export function useTheme() {
  init()
  applyTheme(resolvedTheme.value)

  function setTheme(value: Theme): void {
    theme.value = value
  }

  function toggleTheme(): void {
    setTheme(resolvedTheme.value === 'dark' ? 'light' : 'dark')
  }

  return { theme, resolvedTheme, setTheme, toggleTheme }
}

export function getResolvedTheme(): ResolvedTheme {
  init()
  return resolvedTheme.value
}
