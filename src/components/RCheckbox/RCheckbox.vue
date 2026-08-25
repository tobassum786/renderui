<script setup lang="ts">
import { computed, useCssModule, useId } from 'vue'
import { cn } from '../../utils/class-names'

export interface RCheckboxProps {
  modelValue?: boolean
  label?: string
  description?: string
  indeterminate?: boolean
  disabled?: boolean
  invalid?: boolean
}

const props = withDefaults(defineProps<RCheckboxProps>(), {
  modelValue: false,
  label: undefined,
  description: undefined,
  indeterminate: false,
  disabled: false,
  invalid: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [value: boolean]
}>()

defineOptions({ name: 'RCheckbox', inheritAttrs: false })

const s = useCssModule()
const uid = useId()
</script>

<template>
  <label :class="cn(s.wrapper, { [s.disabled]: disabled })">
    <input
      :id="uid"
      type="checkbox"
      :class="s.input"
      :checked="modelValue"
      :disabled="disabled"
      :aria-invalid="invalid || undefined"
      @change="
        emit('update:modelValue', ($event.target as HTMLInputElement).checked)
      "
    />
    <span :class="cn(s.box, { [s.invalid]: invalid })" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
        <path v-if="indeterminate" d="M5 12h14" />
        <path v-else d="m4.5 12.5 5 5L20 7" />
      </svg>
    </span>
    <span v-if="label || $slots.default || description" :class="s.text">
      <span v-if="label || $slots.default" :class="s.label">
        <slot>{{ label }}</slot>
      </span>
      <span v-if="description" :class="s.description">{{ description }}</span>
    </span>
  </label>
</template>

<style module>
.wrapper {
  display: inline-flex;
  align-items: flex-start;
  gap: var(--r-space-2);
  cursor: pointer;
  user-select: none;
}

.disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.input {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  clip-path: inset(50%);
  overflow: hidden;
  white-space: nowrap;
}

.box {
  --_bg: var(--r-checkbox-bg, transparent);
  --_bg-checked: var(--r-checkbox-bg-checked, var(--r-color-accent));
  --_border: var(--r-checkbox-border, var(--r-color-border-strong));

  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.125rem;
  height: 1.125rem;
  flex-shrink: 0;
  margin-top: 0.125rem;
  background-color: var(--_bg);
  border: 1.5px solid var(--_border);
  border-radius: var(--r-radius-xs);
  color: var(--r-color-text-on-brand);
  transition:
    background-color var(--r-duration-fast) var(--r-ease-out),
    border-color var(--r-duration-fast) var(--r-ease-out);
}

.box svg {
  width: 0.75rem;
  height: 0.75rem;
  opacity: 0;
  transform: scale(0.5);
  transition:
    opacity var(--r-duration-fast) var(--r-ease-out),
    transform var(--r-duration-fast) var(--r-ease-out);
}

.box.invalid {
  --_border: var(--r-color-danger);
}

.input:checked + .box,
.input:indeterminate + .box {
  background-color: var(--_bg-checked);
  border-color: var(--_bg-checked);
}

.input:checked + .box svg,
.input:indeterminate + .box svg {
  opacity: 1;
  transform: scale(1);
}

.input:focus-visible + .box {
  outline: 2px solid var(--r-color-focus-ring);
  outline-offset: 2px;
}

.text {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.label {
  font-size: var(--r-font-size-sm);
  line-height: var(--r-line-height-normal);
  color: var(--r-color-text-primary);
}

.description {
  font-size: var(--r-font-size-xs);
  color: var(--r-color-text-secondary);
}
</style>
