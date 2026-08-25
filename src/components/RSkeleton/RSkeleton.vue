<script setup lang="ts">
import { computed, useCssModule } from 'vue'
import { cn } from '../../utils/class-names'

export interface RSkeletonProps {
  variant?: 'text' | 'circle' | 'rect'
  width?: string
  height?: string
  animated?: boolean
}

const props = withDefaults(defineProps<RSkeletonProps>(), {
  variant: 'text',
  width: undefined,
  height: undefined,
  animated: true,
})

defineOptions({ name: 'RSkeleton', inheritAttrs: false })

const s = useCssModule()

const classes = computed(() =>
  cn(s.skeleton, s[props.variant], { [s.animated]: props.animated }),
)

const style = computed(() => ({
  width: props.width ?? (props.variant === 'circle' ? undefined : '100%'),
  height: props.height,
}))
</script>

<template>
  <span :class="classes" :style="style" aria-hidden="true" v-bind="$attrs" />
</template>

<style module>
.skeleton {
  display: inline-block;
  vertical-align: middle;
  background-color: var(--r-skeleton-bg, var(--r-color-bg-sunken));
  border-radius: var(--r-radius-sm);
}

.text {
  height: 0.875em;
}

.circle {
  aspect-ratio: 1 / 1;
  width: 2.5rem;
  border-radius: var(--r-radius-full);
}

.rect {
  height: 5rem;
  border-radius: var(--r-radius-md);
}

.animated {
  position: relative;
  overflow: hidden;
}

.animated::after {
  content: '';
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    transparent,
    color-mix(in srgb, var(--r-color-bg-surface) 65%, transparent),
    transparent
  );
  animation: r-shimmer 1.6s infinite;
}

@keyframes r-shimmer {
  to {
    transform: translateX(100%);
  }
}
</style>
