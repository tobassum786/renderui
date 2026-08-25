# Tabs

Switch between panels with full ARIA tab semantics and arrow-key navigation.

## Basic usage

<script setup>
import { ref } from 'vue'
const active = ref('preview')
</script>

<RTabs
  v-model="active"
  :tabs="[
    { id: 'preview', label: 'Preview' },
    { id: 'code', label: 'Code' },
    { id: 'logs', label: 'Logs', disabled: true },
  ]"
>
  <template #panel-preview>Rendered output lives here.</template>
  <template #panel-code>Source code lives here.</template>
</RTabs>

```vue
<script setup>
import { ref } from 'vue'
const active = ref('preview')
</script>

<template>
  <RTabs v-model="active" :tabs="[
    { id: 'preview', label: 'Preview' },
    { id: 'code', label: 'Code' },
    { id: 'logs', label: 'Logs', disabled: true },
  ]">
    <template #panel-preview>…</template>
    <template #panel-code>…</template>
  </RTabs>
</template>
```

## Behavior

- Roving `tabindex`: only the active tab is in the tab order
- **←/→/Home/End** move selection, skipping disabled tabs
- Panels stay mounted (`v-show`) so state survives switching
- `role="tablist/tab/tabpanel"` with `aria-selected` and `aria-labelledby`

## API

| Prop       | Type                            | Default             |
| ---------- | ------------------------------- | ------------------- |
| `tabs`     | `{ id, label, disabled? }[]`    | required            |
| `v-model`  | `string`                        | first enabled tab   |

**Events:** `update:modelValue`, `change`

**Slots:** `panel-{id}` per tab
