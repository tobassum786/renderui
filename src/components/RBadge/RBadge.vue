<script setup lang="ts">
import { useSlots, useCssModule } from 'vue'
import { cn } from '../../utils/class-names'

export interface RBadgeProps {
  variant?: 'neutral' | 'primary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md'
  dot?: boolean
}

const props = withDefaults(defineProps<RBadgeProps>(), {
  variant: 'neutral',
  size: 'md',
  dot: false,
})

defineOptions({ name: 'RBadge' })

const slots = useSlots()
const s = useCssModule()
</script>

<template>
  <span :class="cn(s.badge, s[variant], s[size])">
    <span v-if="dot || !slots.default" :class="s.dot" aria-hidden="true" />
    <slot />
  </span>
</template>

<style module>
.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--r-space-1-5, var(--r-space-1));
  font-weight: var(--r-font-weight-semibold);
  line-height: var(--r-line-height-normal);
  border-radius: var(--r-radius-full);
  white-space: nowrap;
}

.sm {
  font-size: var(--r-font-size-xs);
  padding-block: 0;
  padding-inline: calc(var(--r-space-2));
  min-height: 1.25rem;
}

.md {
  font-size: var(--r-font-size-xs);
  padding-inline: var(--r-space-2);
  min-height: 1.5rem;
}

.neutral {
  --_text: var(--r-badge-text, var(--r-color-text-secondary));
  --_bg: var(--r-badge-bg, var(--r-color-bg-sunken));

  color: var(--_text);
  background-color: var(--_bg);
}

.primary {
  --_text: var(--r-badge-text, var(--r-color-accent));
  --_bg: var(--r-badge-bg, var(--r-color-accent-subtle));

  color: var(--_text);
  background-color: var(--_bg);
}

.success {
  --_text: var(--r-badge-text, var(--r-color-success));
  --_bg: var(--r-badge-bg, var(--r-color-success-subtle));

  color: var(--_text);
  background-color: var(--_bg);
}

.warning {
  --_text: var(--r-badge-text, var(--r-color-warning));
  --_bg: var(--r-badge-bg, var(--r-color-warning-subtle));

  color: var(--_text);
  background-color: var(--_bg);
}

.danger {
  --_text: var(--r-badge-text, var(--r-color-danger));
  --_bg: var(--r-badge-bg, var(--r-color-danger-subtle));

  color: var(--_text);
  background-color: var(--_bg);
}

.dot {
  width: 0.375rem;
  height: 0.375rem;
  border-radius: var(--r-radius-full);
  background-color: currentColor;
  flex-shrink: 0;
}
</style>
