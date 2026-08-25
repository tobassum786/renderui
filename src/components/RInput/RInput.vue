<script setup lang="ts">
import { computed, useAttrs, useCssModule, useId } from 'vue'
import { cn } from '../../utils/class-names'

export interface RInputProps {
  modelValue?: string
  label?: string
  hint?: string
  error?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  readonly?: boolean
  placeholder?: string
  type?: string
}

const props = withDefaults(defineProps<RInputProps>(), {
  modelValue: '',
  label: undefined,
  hint: undefined,
  error: undefined,
  size: 'md',
  disabled: false,
  readonly: false,
  placeholder: undefined,
  type: 'text',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

defineOptions({ name: 'RInput', inheritAttrs: false })

const attrs = useAttrs()
const uid = useId()
const s = useCssModule()

const inputId = computed(() => (attrs.id as string | undefined) ?? `r-input-${uid}`)
const hintId = computed(() => `${inputId.value}-hint`)
const errorId = computed(() => `${inputId.value}-error`)

const describedBy = computed(() => {
  if (props.error) return errorId.value
  if (props.hint) return hintId.value
  return undefined
})

const restAttrs = computed(() => {
  const { id: _id, class: _class, style: _style, ...rest } = attrs
  return rest
})

function onInput(event: Event): void {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}

const classes = computed(() =>
  cn(s.control, s[props.size], { [s.invalid]: Boolean(props.error) }),
)
</script>

<template>
  <div :class="s.field">
    <label v-if="label" :for="inputId" :class="s.label">{{ label }}</label>
    <input
      v-bind="restAttrs"
      :id="inputId"
      :class="classes"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :aria-invalid="Boolean(error) || undefined"
      :aria-describedby="describedBy"
      @input="onInput"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
    />
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

.control {
  width: 100%;
  font-family: var(--r-font-sans);
  color: var(--r-color-text-primary);
  background-color: var(--r-input-bg, var(--r-color-bg-surface));
  border: 1px solid var(--r-color-border-strong);
  border-radius: var(--r-radius-md);
  transition:
    border-color var(--r-duration-fast) var(--r-ease-out),
    box-shadow var(--r-duration-fast) var(--r-ease-out);
}

.control::placeholder {
  color: var(--r-color-text-muted);
}

.control:hover:not(:disabled):not(:read-only) {
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

.hint {
  font-size: var(--r-font-size-xs);
  color: var(--r-color-text-secondary);
}

.error {
  font-size: var(--r-font-size-xs);
  color: var(--r-color-danger);
}
</style>
