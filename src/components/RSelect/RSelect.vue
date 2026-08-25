<script setup lang="ts">
import { computed, useAttrs, useCssModule, useId } from 'vue'
import { cn } from '../../utils/class-names'

export interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
}

export interface RSelectProps {
  modelValue?: string | number
  options?: SelectOption[]
  label?: string
  hint?: string
  error?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  placeholder?: string
}

const props = withDefaults(defineProps<RSelectProps>(), {
  modelValue: '',
  options: undefined,
  label: undefined,
  hint: undefined,
  error: undefined,
  size: 'md',
  disabled: false,
  placeholder: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [value: string | number]
}>()

defineOptions({ name: 'RSelect', inheritAttrs: false })

const attrs = useAttrs()
const uid = useId()
const s = useCssModule()

const selectId = computed(
  () => (attrs.id as string | undefined) ?? `r-select-${uid}`,
)
const hintId = computed(() => `${selectId.value}-hint`)
const errorId = computed(() => `${selectId.value}-error`)

const describedBy = computed(() => {
  if (props.error) return errorId.value
  if (props.hint) return hintId.value
  return undefined
})

const restAttrs = computed(() => {
  const { id: _id, class: _class, style: _style, ...rest } = attrs
  return rest
})

const isEmpty = computed(
  () => props.modelValue === '' || props.modelValue === undefined,
)

function onChange(event: Event): void {
  const raw = (event.target as HTMLSelectElement).value
  const match = props.options?.find((o) => String(o.value) === raw)
  const value = match ? match.value : raw
  emit('update:modelValue', value)
  emit('change', value)
}

const classes = computed(() =>
  cn(s.control, s[props.size], { [s.invalid]: Boolean(props.error) }),
)
</script>

<template>
  <div :class="s.field">
    <label v-if="label" :for="selectId" :class="s.label">{{ label }}</label>
    <div :class="s.shell">
      <select
        v-bind="restAttrs"
        :id="selectId"
        :class="classes"
        :value="String(modelValue)"
        :disabled="disabled"
        :aria-invalid="Boolean(error) || undefined"
        :aria-describedby="describedBy"
        @change="onChange"
      >
        <option v-if="placeholder" value="" :disabled="true">
          {{ placeholder }}
        </option>
        <slot />
        <template v-if="options">
          <option
            v-for="option in options"
            :key="option.value"
            :value="String(option.value)"
            :disabled="option.disabled"
          >
            {{ option.label }}
          </option>
        </template>
      </select>
      <svg
        :class="s.chevron"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
    <p v-if="error" :id="errorId" :class="s.error">{{ error }}</p>
    <p v-else-if="hint" :id="hintId" :class="s.hint">{{ hint }}</p>
  </div>
</template>

<style module>
.field {
  display: flex;
  flex-direction: column;
  gap: var(--r-space-2);
}

.label {
  font-size: var(--r-font-size-sm);
  font-weight: var(--r-font-weight-medium);
  color: var(--r-color-text-primary);
}

.shell {
  position: relative;
  display: inline-flex;
  width: 100%;
}

.control {
  appearance: none;
  width: 100%;
  padding-right: var(--r-space-8);
  font-family: var(--r-font-sans);
  color: var(--r-color-text-primary);
  background-color: var(--r-select-bg, var(--r-color-bg-surface));
  border: 1px solid var(--r-color-border-strong);
  border-radius: var(--r-radius-md);
  cursor: pointer;
  transition:
    border-color var(--r-duration-fast) var(--r-ease-out),
    box-shadow var(--r-duration-fast) var(--r-ease-out);
}

.control:hover:not(:disabled) {
  border-color: var(--r-color-focus-ring);
}

.control:focus {
  outline: none;
  border-color: var(--r-color-focus-ring);
  box-shadow: 0 0 0 3px
    color-mix(in srgb, var(--r-color-focus-ring) 25%, transparent);
}

.control:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  background-color: var(--r-color-bg-sunken);
}

.sm {
  height: 2rem;
  padding-inline: var(--r-space-3);
  font-size: var(--r-font-size-sm);
}

.md {
  height: 2.375rem;
  padding-inline: var(--r-space-3);
  font-size: var(--r-font-size-sm);
}

.lg {
  height: 2.75rem;
  padding-inline: var(--r-space-4);
  font-size: var(--r-font-size-md);
}

.invalid,
.invalid:hover:not(:disabled) {
  border-color: var(--r-color-danger);
}

.invalid:focus {
  border-color: var(--r-color-danger);
  box-shadow: 0 0 0 3px
    color-mix(in srgb, var(--r-color-danger) 25%, transparent);
}

.placeholder,
control.placeholder {
  color: var(--r-color-text-muted);
}

.chevron {
  position: absolute;
  right: var(--r-space-3);
  top: 50%;
  width: 1rem;
  height: 1rem;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--r-color-text-muted);
}

.hint {
  font-size: var(--r-font-size-xs);
  color: var(--r-color-text-secondary);
}

.error {
  font-size: var(--r-font-size-xs);
  color: var(--r-color-danger);
}
</style>
