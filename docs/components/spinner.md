# Spinner

Inline loading indicator driven by `currentColor`.

## Basic usage

<div class="demo-surface" style="color: var(--r-color-accent); gap: 1.25rem;">
  <RSpinner size="sm" />
  <RSpinner />
  <RSpinner size="lg" />
  <RSpinner size="xl" />
  <RSpinner label="Loading users" />
</div>

```vue-html
<RSpinner size="lg" label="Loading users" />
```

The optional `label` is visually hidden but announced to assistive tech via
`role="status"`.

## API

| Prop    | Type                            | Default   |
| ------- | ------------------------------- | --------- |
| `size`  | `'sm' \| 'md' \| 'lg' \| 'xl'`  | `'md'`    |
| `label` | `string`                        | —         |

Animation respects `prefers-reduced-motion`.
