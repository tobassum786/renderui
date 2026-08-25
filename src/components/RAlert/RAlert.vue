<script setup lang="ts">
import { computed, useCssModule } from 'vue'

export interface RAlertProps {
  variant?: 'info' | 'success' | 'warning' | 'danger'
  title?: string
  dismissible?: boolean
}

const props = withDefaults(defineProps<RAlertProps>(), {
  variant: 'info',
  title: undefined,
  dismissible: false,
})

const emit = defineEmits<{
  dismiss: []
}>()

defineOptions({ name: 'RAlert' })

const s = useCssModule()

const iconPath = computed(
  () =>
    ({
      info: 'M12 8v.01M12 12v4m9-4a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
      success:
        'M9 12.5 11.5 15l5-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
      warning:
        'M12 9v4m0 4h.01M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.7 3.86a2 2 0 0 0-3.4 0Z',
      danger:
        'M10 14a5 5 0 0 0 7 0m-9.87-.13L4.3 17.7A9 9 0 0 0 19.7 17.7l-2.83-3.83M6.43 6.43 4.3 4.3m14.57 2.13L21 4.3M9.13 9.13A5 5 0 0 0 14 14M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z',
    })[props.variant],
)
</script>

<template>
  <div :class="s.alert" role="alert">
    <svg
      :class="s.icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path :d="iconPath" />
    </svg>
    <div :class="s.content">
      <p v-if="title" :class="s.title">{{ title }}</p>
      <div :class="s.body"><slot /></div>
    </div>
    <button
      v-if="dismissible"
      :class="s.close"
      type="button"
      aria-label="Dismiss"
      @click="emit('dismiss')"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        aria-hidden="true"
      >
        <path d="M6 6l12 12M18 6 6 18" />
      </svg>
    </button>
  </div>
</template>

<style module>
.alert {
  --_accent: var(--r-alert-accent, var(--r-color-info));
  --_bg: var(--r-alert-bg, var(--r-color-info-subtle));

  display: flex;
  align-items: flex-start;
  gap: var(--r-space-3);
  padding: var(--r-space-4);
  border-radius: var(--r-radius-md);
  background-color: var(--_bg);
  border-inline-start: 3px solid var(--_accent);
}

.info {
  --_accent: var(--r-alert-accent, var(--r-color-info));
  --_bg: var(--r-alert-bg, var(--r-color-info-subtle));
}

.success {
  --_accent: var(--r-alert-accent, var(--r-color-success));
  --_bg: var(--r-alert-bg, var(--r-color-success-subtle));
}

.warning {
  --_accent: var(--r-alert-accent, var(--r-color-warning));
  --_bg: var(--r-alert-bg, var(--r-color-warning-subtle));
}

.danger {
  --_accent: var(--r-alert-accent, var(--r-color-danger));
  --_bg: var(--r-alert-bg, var(--r-color-danger-subtle));
}

.icon {
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
  margin-top: 0.0625rem;
  color: var(--_accent);
}

.content {
  flex: 1;
  min-width: 0;
}

.title {
  font-size: var(--r-font-size-sm);
  font-weight: var(--r-font-weight-semibold);
  color: var(--r-color-text-primary);
  margin-bottom: var(--r-space-1);
}

.body {
  font-size: var(--r-font-size-sm);
  color: var(--r-color-text-secondary);
  line-height: var(--r-line-height-relaxed);
}

.body :deep(p) + p,
.body p + p {
  margin-top: var(--r-space-2);
}

.close {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  margin: -0.125rem -0.25rem 0 0;
  border-radius: var(--r-radius-sm);
  color: var(--r-color-text-muted);
  transition:
    color var(--r-duration-fast) var(--r-ease-out),
    background-color var(--r-duration-fast) var(--r-ease-out);
}

.close:hover {
  color: var(--r-color-text-primary);
  background-color: color-mix(in srgb, currentColor 10%, transparent);
}

.close > svg {
  width: 1rem;
  height: 1rem;
}
</style>
