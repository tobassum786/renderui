<script setup lang="ts">
import { computed, useCssModule } from 'vue'
import { cn } from '../../utils/class-names'

export interface RSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  label?: string
}

const props = withDefaults(defineProps<RSpinnerProps>(), {
  size: 'md',
  label: undefined,
})

defineOptions({ name: 'RSpinner', inheritAttrs: false })

const s = useCssModule()

const classes = computed(() => cn(s.spinner, s[props.size]))
</script>

<template>
  <span
    role="status"
    aria-live="polite"
    :class="classes"
    v-bind="$attrs"
  >
    <span v-if="label" class="r-visually-hidden">{{ label }}</span>
  </span>
</template>

<style module>
.spinner {
  display: inline-block;
  flex-shrink: 0;
  border-style: solid;
  border-color: currentColor;
  border-right-color: transparent;
  border-radius: var(--r-radius-full);
  animation: r-spin 0.6s linear infinite;
}

.sm {
  width: 0.875rem;
  height: 0.875rem;
  border-width: 2px;
}

.md {
  width: 1.125rem;
  height: 1.125rem;
  border-width: 2px;
}

.lg {
  width: 1.625rem;
  height: 1.625rem;
  border-width: 3px;
}

.xl {
  width: 2.25rem;
  height: 2.25rem;
  border-width: 4px;
}

@keyframes r-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
