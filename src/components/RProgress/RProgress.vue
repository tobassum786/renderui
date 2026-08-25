<script setup lang="ts">
import { computed, useCssModule } from 'vue'
import { cn } from '../../utils/class-names'

export interface RProgressProps {
  value?: number
  max?: number
  label?: string
  showValue?: boolean
  variant?: 'accent' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md'
}

const props = withDefaults(defineProps<RProgressProps>(), {
  value: 0,
  max: 100,
  label: undefined,
  showValue: false,
  variant: 'accent',
  size: 'md',
})

defineOptions({ name: 'RProgress' })

const s = useCssModule()

const clamped = computed(() => {
  const max = Math.max(props.max, 1)
  const value = Math.min(Math.max(props.value, 0), props.max)
  return Math.round((value / max) * 1000) / 10
})
</script>

<template>
  <div
    :class="s.root"
    role="progressbar"
    :aria-valuenow="value"
    :aria-valuemin="0"
    :aria-valuemax="max"
    :aria-label="label"
  >
    <div v-if="label || showValue" :class="s.meta">
      <span v-if="label" :class="s.label">{{ label }}</span>
      <span v-if="showValue" :class="s.valueText">{{ clamped }}%</span>
    </div>
    <div :class="cn(s.track, s[size])">
      <div
        :class="cn(s.fill, s[variant])"
        :style="{ width: `${clamped}%` }"
      />
    </div>
  </div>
</template>

<style module>
.root {
  display: flex;
  flex-direction: column;
  gap: var(--r-space-1);
}

.meta {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--r-space-3);
}

.label {
  font-size: var(--r-font-size-xs);
  font-weight: var(--r-font-weight-medium);
  color: var(--r-color-text-secondary);
}

.valueText {
  font-size: var(--r-font-size-xs);
  font-variant-numeric: tabular-nums;
  color: var(--r-color-text-muted);
}

.track {
  width: 100%;
  overflow: hidden;
  background-color: var(--r-progress-track, var(--r-color-bg-sunken));
  border-radius: var(--r-radius-full);
}

.sm {
  height: 0.375rem;
}

.md {
  height: 0.5rem;
}

.fill {
  height: 100%;
  border-radius: inherit;
  transition: width var(--r-duration-slow) var(--r-ease-out);
}

.accent {
  background-color: var(--r-progress-fill, var(--r-color-accent));
}

.success {
  background-color: var(--r-progress-fill, var(--r-color-success));
}

.warning {
  background-color: var(--r-progress-fill, var(--r-color-warning));
}

.danger {
  background-color: var(--r-progress-fill, var(--r-color-danger));
}
</style>
