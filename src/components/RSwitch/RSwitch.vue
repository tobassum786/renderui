<script setup lang="ts">
import { computed, useId, useCssModule } from 'vue'
import { cn } from '../../utils/class-names'

export interface RSwitchProps {
  modelValue?: boolean
  label?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<RSwitchProps>(), {
  modelValue: false,
  label: undefined,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [value: boolean]
}>()

defineOptions({ name: 'RSwitch' })

const uid = useId()
const s = useCssModule()

const switchId = computed(() => `r-switch-${uid}`)

function toggle(): void {
  if (props.disabled) return
  const next = !props.modelValue
  emit('update:modelValue', next)
  emit('change', next)
}
</script>

<template>
  <label :for="switchId" :class="cn(s.wrapper, { [s.disabled]: disabled })">
    <button
      :id="switchId"
      :class="cn(s.track, { [s.checked]: modelValue })"
      type="button"
      role="switch"
      :aria-checked="modelValue"
      :aria-label="label ? undefined : 'Toggle'"
      :disabled="disabled"
      @click="toggle"
    >
      <span :class="s.thumb" />
    </button>
    <span v-if="label" :class="s.label">{{ label }}</span>
  </label>
</template>

<style module>
.wrapper {
  display: inline-flex;
  align-items: center;
  gap: var(--r-space-2);
  cursor: pointer;
}

.disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.track {
  --_on: var(--r-switch-on, var(--r-color-accent));
  --_off: var(--r-switch-off, var(--r-color-border-strong));

  position: relative;
  display: inline-flex;
  align-items: center;
  width: 2.25rem;
  height: 1.25rem;
  padding: 2px;
  flex-shrink: 0;
  background-color: var(--_off);
  border-radius: var(--r-radius-full);
  transition: background-color var(--r-duration-fast) var(--r-ease-in-out);
}

.track:focus-visible {
  outline-offset: 2px;
}

.checked {
  background-color: var(--_on);
}

.checked .thumb {
  transform: translateX(1rem);
}

.thumb {
  width: 1rem;
  height: 1rem;
  border-radius: var(--r-radius-full);
  background-color: #ffffff;
  box-shadow: var(--r-shadow-xs);
  transition: transform var(--r-duration-fast) var(--r-ease-in-out);
}

.label {
  font-size: var(--r-font-size-sm);
  color: var(--r-color-text-primary);
  user-select: none;
}
</style>
