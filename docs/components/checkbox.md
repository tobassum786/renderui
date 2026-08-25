# Checkbox

Native checkbox under the hood — full keyboard support — with custom styling,
description text and indeterminate state.

## Basic usage

<script setup>
import { ref } from 'vue'
const notifications = ref(true)
</script>

<div class="demo-stack">
  <RCheckbox v-model="notifications" label="Email notifications" description="Product updates, twice a month." />
  <RCheckbox label="Accept terms" invalid />
  <RCheckbox label="Unavailable" disabled />
</div>

```vue-html
<RCheckbox v-model="checked" label="Email notifications"
           description="Product updates, twice a month." />
<RCheckbox label="Accept terms" invalid />
<RCheckbox label="Unavailable" disabled />
```

## API

| Prop             | Type      | Default |
| ---------------- | --------- | ------- |
| `v-model`        | `boolean` | `false` |
| `label`          | `string`  | —       |
| `description`    | `string`  | —       |
| `indeterminate`  | `boolean` | `false` |
| `disabled`       | `boolean` | `false` |
| `invalid`        | `boolean` | `false` |

**Events:** `update:modelValue`, `change`

**Slots:** `default` (replaces label)

## Overrides

`--r-checkbox-bg` · `--r-checkbox-bg-checked` · `--r-checkbox-border`
