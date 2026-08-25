<script setup lang="ts">
import { computed, ref, watch, useCssModule } from 'vue'
import { cn } from '../../utils/class-names'

export interface RAvatarProps {
  src?: string
  alt?: string
  name?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<RAvatarProps>(), {
  src: undefined,
  alt: undefined,
  name: undefined,
  size: 'md',
})

defineOptions({ name: 'RAvatar', inheritAttrs: false })

const s = useCssModule()

const failed = ref(false)

watch(
  () => props.src,
  () => {
    failed.value = false
  },
)

const initials = computed(() => {
  if (!props.name) return ''
  return props.name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
})

const classes = computed(() => cn(s.avatar, s[props.size]))
</script>

<template>
  <span :class="classes">
    <img
      v-if="src && !failed"
      :src="src"
      :alt="alt ?? name ?? ''"
      @error="failed = true"
    />
    <span v-else-if="initials" aria-hidden="true">{{ initials }}</span>
    <svg v-else viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path
        d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 2c-3.5 0-7 1.75-7 4.5V21h14v-2.5c0-2.75-3.5-4.5-7-4.5Z"
      />
    </svg>
  </span>
</template>

<style module>
.avatar {
  --_size: var(--r-avatar-size, 2.5rem);
  --_bg: var(--r-avatar-bg, var(--r-color-accent-subtle));
  --_text: var(--r-avatar-text, var(--r-color-accent));

  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--_size);
  height: var(--_size);
  flex-shrink: 0;
  overflow: hidden;
  background-color: var(--_bg);
  color: var(--_text);
  border-radius: var(--r-radius-full);
  font-weight: var(--r-font-weight-semibold);
  line-height: 1;
  user-select: none;
}

.xs {
  --_size: var(--r-avatar-size, 1.5rem);
  font-size: var(--r-font-size-xs);
}

.sm {
  --_size: var(--r-avatar-size, 2rem);
  font-size: var(--r-font-size-xs);
}

.md {
  font-size: var(--r-font-size-sm);
}

.lg {
  --_size: var(--r-avatar-size, 3rem);
  font-size: var(--r-font-size-md);
}

.xl {
  --_size: var(--r-avatar-size, 4rem);
  font-size: var(--r-font-size-xl);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

svg {
  width: 60%;
  height: 60%;
}
</style>
