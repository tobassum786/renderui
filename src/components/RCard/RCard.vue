<script setup lang="ts">
import { useSlots, useCssModule } from 'vue'
import { cn } from '../../utils/class-names'

export interface RCardProps {
  title?: string
  hoverable?: boolean
  flat?: boolean
  padded?: boolean
}

withDefaults(defineProps<RCardProps>(), {
  title: undefined,
  hoverable: false,
  flat: false,
  padded: true,
})

defineOptions({ name: 'RCard' })

const slots = useSlots()
const s = useCssModule()
</script>

<template>
  <section :class="cn(s.card, { [s.hoverable]: hoverable, [s.flat]: flat })">
    <header v-if="slots.header || title" :class="s.header">
      <slot name="header">
        <h3 :class="s.title">{{ title }}</h3>
      </slot>
    </header>
    <div :class="[s.body, { [s.unpadded]: !padded }]">
      <slot />
    </div>
    <footer v-if="slots.footer" :class="s.footer">
      <slot name="footer" />
    </footer>
  </section>
</template>

<style module>
.card {
  --_bg: var(--r-card-bg, var(--r-color-bg-surface));
  --_border: var(--r-card-border, var(--r-color-border-subtle));
  --_radius: var(--r-card-radius, var(--r-radius-lg));
  --_padding: var(--r-card-padding, var(--r-space-6));

  background-color: var(--_bg);
  border: 1px solid var(--_border);
  border-radius: var(--_radius);
  box-shadow: var(--r-shadow-sm);
  overflow: hidden;
  transition:
    box-shadow var(--r-duration-base) var(--r-ease-out),
    transform var(--r-duration-base) var(--r-ease-out);
}

.flat {
  box-shadow: none;
}

.hoverable:hover {
  box-shadow: var(--r-shadow-lg);
  transform: translateY(-1px);
}

.header {
  padding: var(--_padding);
  padding-bottom: var(--r-space-4);
}

.title {
  font-size: var(--r-font-size-lg);
  font-weight: var(--r-font-weight-semibold);
  line-height: var(--r-line-height-tight);
  color: var(--r-color-text-primary);
}

.body {
  padding-inline: var(--_padding);
  padding-bottom: var(--_padding);
  font-size: var(--r-font-size-md);
  color: var(--r-color-text-secondary);
  line-height: var(--r-line-height-relaxed);
}

.header + .body,
.header + .unpadded {
  padding-top: 0;
}

.unpadded {
  padding: 0;
}

.footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--r-space-2);
  margin-top: var(--r-space-4);
  padding: var(--r-space-4) var(--_padding);
  border-top: 1px solid var(--r-color-border-subtle);
  background-color: var(--r-card-footer-bg, var(--r-color-bg-canvas));
}
</style>
