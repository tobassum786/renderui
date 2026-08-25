<script setup lang="ts">
import { computed, useCssModule } from 'vue'
import { cn } from '../../utils/class-names'

export interface RTooltipProps {
  content?: string
  placement?: 'top' | 'bottom' | 'left' | 'right'
}

const props = withDefaults(defineProps<RTooltipProps>(), {
  content: undefined,
  placement: 'top',
})

defineOptions({ name: 'RTooltip' })

const s = useCssModule()
const tooltipId = `r-tooltip-${Math.random().toString(36).slice(2, 9)}`

const classes = computed(() => cn(s.tip, s[props.placement]))
</script>

<template>
  <span :class="s.wrapper" tabindex="0">
    <span :class="s.trigger" :aria-describedby="content ? tooltipId : undefined">
      <slot />
    </span>
    <span v-if="content || $slots.content" :id="tooltipId" :class="classes" role="tooltip">
      <slot name="content">{{ content }}</slot>
    </span>
  </span>
</template>

<style module>
.wrapper {
  position: relative;
  display: inline-flex;
  max-width: 100%;
  cursor: help;
}

.wrapper:focus-visible {
  outline-offset: 4px;
}

.trigger {
  display: inline-flex;
}

.tip {
  --_bg: var(--r-tooltip-bg, var(--r-color-text-primary));
  --_text: var(--r-tooltip-text, var(--r-color-bg-surface));

  position: absolute;
  z-index: var(--r-z-dropdown);
  max-width: min(16rem, 80vw);
  padding: var(--r-space-1) var(--r-space-2);
  font-size: var(--r-font-size-xs);
  line-height: var(--r-line-height-normal);
  text-align: center;
  color: var(--_text);
  background-color: var(--_bg);
  border-radius: var(--r-radius-sm);
  box-shadow: var(--r-shadow-md);
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity var(--r-duration-fast) var(--r-ease-out),
    transform var(--r-duration-fast) var(--r-ease-out),
    visibility 0s linear var(--r-duration-fast);
}

/* Reveal on hover or keyboard focus anywhere inside the wrapper */
.wrapper:hover .tip,
.wrapper:focus-within .tip {
  opacity: 1;
  visibility: visible;
  transition-delay: 0s;
}

.top {
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%) translateY(2px);
}

.bottom {
  top: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%) translateY(-2px);
}

.left {
  right: calc(100% + 6px);
  top: 50%;
  transform: translateY(-50%) translateX(2px);
}

.right {
  left: calc(100% + 6px);
  top: 50%;
  transform: translateY(-50%) translateX(-2px);
}

.wrapper:hover .top,
.wrapper:focus-within .top {
  transform: translateX(-50%) translateY(0);
}

.wrapper:hover .bottom,
.wrapper:focus-within .bottom {
  transform: translateX(-50%) translateY(0);
}

.wrapper:hover .left,
.wrapper:focus-within .left {
  transform: translateY(-50%) translateX(0);
}

.wrapper:hover .right,
.wrapper:focus-within .right {
  transform: translateY(-50%) translateX(0);
}
</style>
