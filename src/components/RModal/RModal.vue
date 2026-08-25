<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  ref,
  useCssModule,
  useId,
  watch,
} from 'vue'
import { cn } from '../../utils/class-names'

export interface RModalProps {
  modelValue?: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg'
  closeOnEsc?: boolean
  closeOnBackdrop?: boolean
  hideClose?: boolean
}

const props = withDefaults(defineProps<RModalProps>(), {
  modelValue: false,
  title: undefined,
  size: 'md',
  closeOnEsc: true,
  closeOnBackdrop: true,
  hideClose: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  open: []
  close: []
}>()

defineOptions({ name: 'RModal' })

const s = useCssModule()
const uid = useId()

const panelRef = ref<HTMLElement | null>(null)
let previouslyFocused: HTMLElement | null = null
let bodyOverflowSnapshot = ''
let scrollLocked = false

function requestClose(): void {
  emit('update:modelValue', false)
  emit('close')
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape' && props.closeOnEsc) {
    event.stopPropagation()
    requestClose()
  }
}

function onOverlayClick(): void {
  if (props.closeOnBackdrop) requestClose()
}

watch(
  () => props.modelValue,
  async (open) => {
    if (typeof document === 'undefined') return
    if (open) {
      previouslyFocused = document.activeElement as HTMLElement | null
      const { overflow } = document.body.style
      document.body.style.overflow = 'hidden'
      bodyOverflowSnapshot = overflow
      scrollLocked = true
      emit('open')
      document.addEventListener('keydown', onKeydown, true)
      await nextTick()
      panelRef.value?.focus()
    } else {
      releaseScroll()
      document.removeEventListener('keydown', onKeydown, true)
      previouslyFocused?.focus?.()
      previouslyFocused = null
    }
  },
  { immediate: true },
)

function releaseScroll(): void {
  if (!scrollLocked) return
  scrollLocked = false
  document.body.style.overflow = bodyOverflowSnapshot
}

onBeforeUnmount(() => {
  if (typeof document === 'undefined') return
  releaseScroll()
  document.removeEventListener('keydown', onKeydown, true)
})

const titleId = computed(() => `r-modal-${uid}-title`)
</script>

<template>
  <Teleport to="body">
    <Transition name="r-modal-fade">
      <div
        v-if="modelValue"
        :class="s.overlay"
        @mousedown.self="onOverlayClick"
      >
        <div
          ref="panelRef"
          class="r-modal-panel-hook"
          :class="cn(s.panel, s[size])"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="title ? titleId : undefined"
          tabindex="-1"
        >
          <header v-if="title || !hideClose" :class="s.header">
            <h2 v-if="title" :id="titleId" :class="s.title">{{ title }}</h2>
            <button
              v-if="!hideClose"
              :class="s.close"
              type="button"
              aria-label="Close"
              @click="requestClose"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </header>
          <div :class="s.body"><slot /></div>
          <footer v-if="$slots.footer" :class="s.footer">
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style module>
.overlay {
  position: fixed;
  inset: 0;
  z-index: var(--r-z-modal);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--r-space-4);
  background-color: var(--r-modal-overlay-bg, var(--r-color-bg-overlay));
}

.panel {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: min(85vh, 40rem);
  background-color: var(--r-modal-bg, var(--r-color-bg-surface));
  color: var(--r-color-text-primary);
  border-radius: var(--r-radius-lg);
  box-shadow: var(--r-shadow-lg);
  outline: none;
}

.panel:focus-visible {
  outline: none;
}

.sm {
  max-width: 24rem;
}

.md {
  max-width: 34rem;
}

.lg {
  max-width: 44rem;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--r-space-4);
  padding: var(--r-space-5) var(--r-space-6) var(--r-space-4);
}

.title {
  font-size: var(--r-font-size-lg);
  font-weight: var(--r-font-weight-semibold);
  line-height: var(--r-line-height-tight);
}

.close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  border-radius: var(--r-radius-md);
  color: var(--r-color-text-muted);
  transition:
    color var(--r-duration-fast) var(--r-ease-out),
    background-color var(--r-duration-fast) var(--r-ease-out);
}

.close:hover {
  color: var(--r-color-text-primary);
  background-color: var(--r-color-bg-sunken);
}

.close > svg {
  width: 1.125rem;
  height: 1.125rem;
}

.body {
  padding-inline: var(--r-space-6);
  padding-bottom: var(--r-space-6);
  font-size: var(--r-font-size-sm);
  color: var(--r-color-text-secondary);
  line-height: var(--r-line-height-relaxed);
  overflow-y: auto;
}

.header + .body {
  padding-top: 0;
}

.footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--r-space-2);
  margin-top: auto;
  padding: var(--r-space-4) var(--r-space-6);
  border-top: 1px solid var(--r-color-border-subtle);
}
</style>

<style>
/* Transition classes are global so Vue's <Transition> can resolve them
   even though component styles are CSS Modules. */
.r-modal-fade-enter-active,
.r-modal-fade-leave-active {
  transition:
    opacity var(--r-duration-base) var(--r-ease-out),
    transform var(--r-duration-base) var(--r-ease-out);
}

.r-modal-fade-enter-active .r-modal-panel-hook,
.r-modal-fade-leave-active .r-modal-panel-hook {
  transition: transform var(--r-duration-base) var(--r-ease-out);
}

.r-modal-fade-enter-from,
.r-modal-fade-leave-to {
  opacity: 0;
}

.r-modal-fade-enter-from .r-modal-panel-hook,
.r-modal-fade-leave-to .r-modal-panel-hook {
  transform: translateY(8px) scale(0.98);
}
</style>
