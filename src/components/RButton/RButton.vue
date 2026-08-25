<script setup lang="ts">
import { computed, useSlots, useCssModule } from 'vue'
import { cn } from '../../utils/class-names'
import { RSpinner } from '../RSpinner'

export interface RButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  block?: boolean
}

const props = withDefaults(defineProps<RButtonProps>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  block: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

defineOptions({ name: 'RButton' })

const s = useCssModule()
const slots = useSlots()

const classes = computed(() =>
  cn(
    s.button,
    s[props.variant],
    s[props.size],
    { [String(s.block)]: props.block },
  ),
)

const hasIcon = computed(() => Boolean(slots.icon))
const hasIconRight = computed(() => Boolean(slots['icon-right']))

function onClick(event: MouseEvent): void {
  if (!props.disabled && !props.loading) emit('click', event)
}
</script>

<template>
  <button
    :type="type"
    :class="classes"
    :disabled="disabled || loading"
    :aria-busy="loading || undefined"
    :aria-disabled="disabled || undefined"
    @click="onClick"
  >
    <span v-if="(hasIcon || loading)" :class="s.icon">
      <RSpinner v-if="loading" :size="size === 'lg' ? 'md' : 'sm'" />
      <slot v-else name="icon" />
    </span>
    <span v-if="$slots.default" :class="s.label"><slot /></span>
    <span v-if="hasIconRight" :class="s.icon"><slot name="icon-right" /></span>
  </button>
</template>

<style module>
/* Component tokens (public overrides) -> private fallbacks */
.button {
  --_bg: var(--r-button-bg, var(--r-color-accent));
  --_bg-hover: var(--r-button-bg-hover, var(--r-color-accent-hover));
  --_bg-active: var(--r-button-bg-active, var(--r-color-accent-active));
  --_text: var(--r-button-text, var(--r-color-text-on-brand));
  --_border: var(--r-button-border, transparent);

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--r-space-2);
  font-family: var(--r-font-sans);
  font-weight: var(--r-font-weight-semibold);
  line-height: var(--r-line-height-normal);
  color: var(--_text);
  background-color: var(--_bg);
  border: 1px solid var(--_border);
  border-radius: var(--r-radius-md);
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  text-decoration: none;
  transition:
    background-color var(--r-duration-fast) var(--r-ease-out),
    border-color var(--r-duration-fast) var(--r-ease-out),
    box-shadow var(--r-duration-fast) var(--r-ease-out),
    transform var(--r-duration-fast) var(--r-ease-out);
}

.button:focus-visible {
  outline-offset: 2px;
}

.button:active:not(:disabled) {
  transform: translateY(0.5px);
}

.button:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

/* Variants ---------------------------------------------------------- */
.primary {
  --_bg: var(--r-button-bg, var(--r-color-accent));
  --_bg-hover: var(--r-button-bg-hover, var(--r-color-accent-hover));
  --_bg-active: var(--r-button-bg-active, var(--r-color-accent-active));
}

.primary:hover:not(:disabled) {
  background-color: var(--_bg-hover);
}

.primary:active:not(:disabled) {
  background-color: var(--_bg-active);
}

.secondary {
  --_bg: var(--r-button-bg, var(--r-color-bg-surface));
  --_bg-hover: var(--r-button-bg-hover, var(--r-color-bg-sunken));
  --_bg-active: var(--r-button-bg-active, var(--r-color-bg-sunken));
  --_text: var(--r-button-text, var(--r-color-text-primary));
  --_border: var(--r-button-border, var(--r-color-border-strong));
}

.secondary:hover:not(:disabled),
.secondary:active:not(:disabled) {
  background-color: var(--_bg-hover);
}

.ghost {
  --_bg: var(--r-button-bg, transparent);
  --_bg-hover: var(--r-button-bg-hover, var(--r-color-bg-sunken));
  --_bg-active: var(--r-button-bg-hover, var(--r-color-bg-sunken));
  --_text: var(--r-button-text, var(--r-color-text-primary));
}

.ghost:hover:not(:disabled),
.ghost:active:not(:disabled) {
  background-color: var(--_bg-hover);
}

.danger {
  --_bg: var(--r-button-bg, var(--r-color-danger));
  --_bg-hover: var(--r-button-bg-hover, var(--r-color-danger-700));
  --_bg-active: var(--r-button-bg-active, var(--r-color-danger-700));
}

.danger:hover:not(:disabled),
.danger:active:not(:disabled) {
  background-color: var(--_bg-hover);
}

/* Sizes ------------------------------------------------------------- */
.sm {
  height: 2rem;
  padding-inline: var(--r-space-3);
  font-size: var(--r-font-size-sm);
  border-radius: var(--r-radius-sm);
}

.md {
  height: 2.375rem;
  padding-inline: var(--r-space-4);
  font-size: var(--r-font-size-sm);
}

.lg {
  height: 2.75rem;
  padding-inline: var(--r-space-6);
  font-size: var(--r-font-size-md);
  border-radius: var(--r-radius-lg);
}

.block {
  display: flex;
  width: 100%;
}

.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon > svg {
  width: 1em;
  height: 1em;
}

.label {
  display: inline-flex;
  align-items: center;
}
</style>
