<script setup lang="ts">
import { computed, ref, useCssModule, useId, watch } from 'vue'
import { cn } from '../../utils/class-names'

export interface TabItem {
  id: string
  label: string
  disabled?: boolean
}

export interface RTabsProps {
  tabs: TabItem[]
  modelValue?: string
}

const props = defineProps<RTabsProps>()

const emit = defineEmits<{
  'update:modelValue': [id: string]
  change: [id: string]
}>()

defineOptions({ name: 'RTabs' })

const s = useCssModule()
const uid = useId()

function firstEnabled(): string {
  return (props.tabs.find((t) => !t.disabled) ?? props.tabs[0])?.id ?? ''
}

const active = ref(props.modelValue ?? firstEnabled())

watch(
  () => props.modelValue,
  (value) => {
    if (value !== undefined && value !== active.value) active.value = value
  },
)

const activeIndex = computed(() =>
  Math.max(
    0,
    props.tabs.findIndex((t) => t.id === active.value),
  ),
)

function select(id: string): void {
  if (props.tabs.find((t) => t.id === id)?.disabled) return
  active.value = id
  emit('update:modelValue', id)
  emit('change', id)
}

function move(delta: 1 | -1 | 'first' | 'last'): void {
  const { tabs } = props
  if (tabs.length === 0) return
  let index = activeIndex.value
  if (delta === 'first') index = 0
  else if (delta === 'last') index = tabs.length - 1
  else {
    do {
      index = (index + delta + tabs.length) % tabs.length
    } while (tabs[index].disabled && index !== activeIndex.value)
  }
  const tab = tabs[index]
  if (!tab || tab.disabled) return
  select(tab.id)
  tabRefs.value[index]?.focus()
}

const tabRefs = ref<HTMLElement[]>([])

function setTabRef(el: unknown, index: number): void {
  if (el) tabRefs.value[index] = el as HTMLElement
}

function onKeydown(event: KeyboardEvent): void {
  const actions: Record<string, 1 | -1 | 'first' | 'last'> = {
    ArrowRight: 1,
    ArrowLeft: -1,
    Home: 'first',
    End: 'last',
  }
  const action = actions[event.key]
  if (action !== undefined) {
    event.preventDefault()
    move(action)
  }
}
</script>

<template>
  <div :class="s.root">
    <div :class="s.list" role="tablist" @keydown="onKeydown">
      <button
        v-for="(tab, index) in tabs"
        :id="`r-tabs-${uid}-tab-${tab.id}`"
        :key="tab.id"
        :ref="(el) => setTabRef(el, index)"
        :class="
          cn(s.tab, { [s.active]: tab.id === active, [s.disabled]: tab.disabled })
        "
        type="button"
        role="tab"
        :aria-selected="tab.id === active"
        :aria-controls="`r-tabs-${uid}-panel-${tab.id}`"
        :disabled="tab.disabled"
        :tabindex="tab.id === active ? 0 : -1"
        @click="select(tab.id)"
      >
        {{ tab.label }}
      </button>
    </div>
    <div
      v-for="tab in tabs"
      v-show="tab.id === active"
      :id="`r-tabs-${uid}-panel-${tab.id}`"
      :key="tab.id"
      :class="s.panel"
      role="tabpanel"
      :aria-labelledby="`r-tabs-${uid}-tab-${tab.id}`"
      tabindex="0"
    >
      <slot :name="`panel-${tab.id}`" />
    </div>
  </div>
</template>

<style module>
.root {
  display: flex;
  flex-direction: column;
  gap: var(--r-space-4);
}

.list {
  display: flex;
  gap: var(--r-space-1);
  border-bottom: 1px solid var(--r-color-border-subtle);
}

.tab {
  position: relative;
  padding: var(--r-space-2) var(--r-space-4);
  font-size: var(--r-font-size-sm);
  font-weight: var(--r-font-weight-medium);
  color: var(--r-color-text-secondary);
  border-radius: var(--r-radius-sm) var(--r-radius-sm) 0 0;
  transition:
    color var(--r-duration-fast) var(--r-ease-out),
    background-color var(--r-duration-fast) var(--r-ease-out);
}

.tab:hover:not(.disabled):not(.active) {
  color: var(--r-color-text-primary);
  background-color: var(--r-color-bg-sunken);
}

.tab:focus-visible {
  outline-offset: -2px;
  border-radius: var(--r-radius-sm);
}

.active {
  color: var(--r-color-accent);
}

.active::after {
  content: '';
  position: absolute;
  inset-inline: var(--r-space-3);
  bottom: -1px;
  height: 2px;
  border-radius: var(--r-radius-full);
  background-color: var(--r-color-accent);
}

.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.panel {
  font-size: var(--r-font-size-sm);
  line-height: var(--r-line-height-relaxed);
  color: var(--r-color-text-secondary);
}

.panel:focus-visible {
  outline-offset: 4px;
}
</style>
