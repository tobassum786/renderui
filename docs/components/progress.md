# Progress

Determinate progress bar with accessible value semantics.

## Basic usage

<script setup>
import { ref } from 'vue'
const value = ref(64)
</script>

<div class="demo-stack" style="max-width: 24rem;">
  <RProgress :value="value" label="Uploading assets…" show-value />
  <div style="display: flex; gap: 0.5rem;">
    <RButton size="sm" variant="secondary" @click="value = Math.max(0, value - 15)">-15</RButton>
    <RButton size="sm" variant="secondary" @click="value = Math.min(100, value + 15)">+15</RButton>
  </div>
</div>

## Variants

<div class="demo-stack" style="max-width: 24rem;">
  <RProgress :value="40" variant="accent" />
  <RProgress :value="60" variant="success" />
  <RProgress :value="80" variant="warning" />
  <RProgress :value="95" variant="danger" />
</div>

```vue-html
<RProgress :value="60" variant="success" label="Storage" show-value />
```

Values are clamped to `[0, max]`; the fill animates on change.

## API

| Prop        | Type                                            | Default   |
| ----------- | ----------------------------------------------- | --------- |
| `value`     | `number`                                        | `0`       |
| `max`       | `number`                                        | `100`     |
| `label`     | `string`                                        | —         |
| `showValue` | `boolean`                                       | `false`   |
| `variant`   | `'accent' \| 'success' \| 'warning' \| 'danger'` | `'accent'`|
| `size`      | `'sm' \| 'md'`                                  | `'md'`    |

## Overrides

`--r-progress-track` · `--r-progress-fill`
