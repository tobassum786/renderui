# Switch

Binary toggle with `role="switch"` semantics.

## Basic usage

<script setup>
import { ref } from 'vue'
const dark = ref(true)
const auto = ref(false)
</script>

<div class="demo-stack">
  <RSwitch v-model="dark" label="Dark mode" />
  <RSwitch v-model="auto" label="Sync automatically" />
  <RSwitch label="Locked by policy" disabled />
</div>

```vue-html
<RSwitch v-model="enabled" label="Dark mode" />
<RSwitch label="Locked by policy" disabled />
```

Space and Enter toggle the switch natively; state is announced as
checked/unchecked through `aria-checked`.

## API

| Prop         | Type      | Default |
| ------------ | --------- | ------- |
| `v-model`    | `boolean` | `false` |
| `label`      | `string`  | —       |
| `disabled`   | `boolean` | `false` |

**Events:** `update:modelValue`, `change`

## Overrides

`--r-switch-on` · `--r-switch-off`
