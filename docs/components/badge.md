# Badge

Status indicators with subtle tinted variants.

## Basic usage

<div class="demo-surface">
  <RBadge>Neutral</RBadge>
  <RBadge variant="primary" dot>Primary</RBadge>
  <RBadge variant="success">Success</RBadge>
  <RBadge variant="warning">Warning</RBadge>
  <RBadge variant="danger">Danger</RBadge>
</div>

```vue-html
<RBadge variant="success">Active</RBadge>
<RBadge variant="primary" dot>Beta</RBadge>
```

## Sizes

<div class="demo-surface">
  <RBadge size="sm" variant="primary">sm</RBadge>
  <RBadge size="md" variant="primary">md</RBadge>
</div>

## API

| Prop      | Type                                                          | Default    |
| --------- | ------------------------------------------------------------- | ---------- |
| `variant` | `'neutral' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `'neutral'` |
| `size`    | `'sm' \| 'md'`                                                | `'md'`     |
| `dot`     | `boolean`                                                     | `false`    |

## Overrides

`--r-badge-text` · `--r-badge-bg` (per-variant)
