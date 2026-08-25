# Input

Text field with label, hint and error wiring — including
`aria-invalid` and `aria-describedby`.

## Basic usage

<div class="demo-stack" style="max-width: 22rem;">
  <RInput label="Email" type="email" placeholder="you@example.com" hint="We never share your email." />
  <RInput label="Workspace" error="This name is taken." />
</div>

```vue-html
<RInput v-model="email" label="Email" hint="We never share your email." />
<RInput v-model="name" label="Workspace" error="This name is taken." />
```

## Sizes

<div class="demo-surface demo-stack" style="flex-direction: column; align-items: stretch; max-width: 22rem;">
  <RInput size="sm" placeholder="Small" />
  <RInput size="md" placeholder="Medium (default)" />
  <RInput size="lg" placeholder="Large" />
</div>

## API

| Prop          | Type                       | Default |
| ------------- | -------------------------- | ------- |
| `v-model`     | `string`                   | `''`    |
| `label`       | `string`                   | —       |
| `hint`        | `string`                   | —       |
| `error`       | `string`                   | —       |
| `size`        | `'sm' \| 'md' \| 'lg'`     | `'md'`  |
| `type`        | `string`                   | `'text'`|
| `placeholder` | `string`                   | —       |
| `disabled`    | `boolean`                  | `false` |
| `readonly`    | `boolean`                  | `false` |

**Events:** `update:modelValue`, `focus`, `blur`

When both `hint` and `error` are set, the error wins and is announced via
`aria-describedby`.

## Overrides

`--r-input-bg`
