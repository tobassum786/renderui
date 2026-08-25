# Select

Native select styled to match the system — keyboard and screen-reader behavior
for free.

## Basic usage

<div style="max-width: 20rem;">
  <RSelect
    label="Plan"
    placeholder="Choose a plan…"
    hint="You can change this later."
  />
</div>

### With options prop

<script setup>
import { ref } from 'vue'
const plan = ref('pro')
</script>

<div style="max-width: 20rem;">
  <RSelect
    v-model="plan"
    label="Your plan"
    :options="[
      { label: 'Free', value: 'free' },
      { label: 'Pro', value: 'pro' },
      { label: 'Enterprise', value: 'ent', disabled: true },
    ]"
  />
  <p style="margin-top: 0.5rem; font-size: 0.8rem;">Selected: {{ plan }}</p>
</div>

```vue
<script setup>
import { ref } from 'vue'
const plan = ref('pro')
</script>

<template>
  <RSelect
    v-model="plan"
    label="Your plan"
    :options="[
      { label: 'Free', value: 'free' },
      { label: 'Pro', value: 'pro' },
    ]"
  />
</template>
```

Options may also be provided as native `<option>` children. Numeric option
values are preserved through the change event.

## API

| Prop          | Type                                              | Default |
| ------------- | ------------------------------------------------- | ------- |
| `v-model`     | `string \| number`                                | `''`    |
| `options`     | `{ label, value, disabled? }[]`                    | —       |
| `label`       | `string`                                          | —       |
| `hint` / `error` | `string`                                       | —       |
| `size`        | `'sm' \| 'md' \| 'lg'`                            | `'md'`  |
| `placeholder` | `string`                                          | —       |
| `disabled`    | `boolean`                                         | `false` |

**Events:** `update:modelValue`, `change`

## Overrides

`--r-select-bg`
