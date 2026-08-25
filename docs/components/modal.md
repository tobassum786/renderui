# Modal

Dialog with teleport, focus management, scroll locking, Escape/backdrop
dismissal and enter/leave transitions.

## Basic usage

<script setup>
import { ref } from 'vue'
const open = ref(false)
</script>

<RButton variant="secondary" @click="open = true">Open modal</RButton>

<RModal v-model="open" title="Confirm upgrade" size="sm">
  You are about to upgrade your workspace to the Team plan.
  <template #footer>
    <RButton variant="ghost" @click="open = false">Cancel</RButton>
    <RButton @click="open = false">Confirm</RButton>
  </template>
</RModal>

```vue
<script setup>
import { ref } from 'vue'
const open = ref(false)
</script>

<template>
  <RButton @click="open = true">Open modal</RButton>

  <RModal v-model="open" title="Confirm upgrade" size="sm">
    <p>Body content…</p>
    <template #footer>
      <RButton variant="ghost" @click="open = false">Cancel</RButton>
      <RButton @click="open = false">Confirm</RButton>
    </template>
  </RModal>
</template>
```

## Behavior

- Renders into `<body>` via Teleport — safe inside any layout
- Focus moves to the dialog on open and returns to the trigger on close
- Body scrolling is locked while open
- **Esc** closes (`closeOnesc`) unless disabled; backdrop mousedown closes
  unless `closeOnBackdrop` is false
- `aria-modal`, `role="dialog"` and labelled-by wiring included

## API

| Prop              | Type                      | Default |
| ----------------- | ------------------------- | ------- |
| `v-model`         | `boolean`                 | `false` |
| `title`           | `string`                  | —       |
| `size`            | `'sm' \| 'md' \| 'lg'`    | `'md'`  |
| `closeOnEsc`      | `boolean`                 | `true`  |
| `closeOnBackdrop` | `boolean`                 | `true`  |
| `hideClose`       | `boolean`                 | `false` |

**Events:** `update:modelValue`, `open`, `close`

**Slots:** `default`, `footer`

## Overrides

`--r-modal-bg` · `--r-modal-overlay-bg`
