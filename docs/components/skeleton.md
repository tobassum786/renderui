# Skeleton

Loading placeholders that mirror content shape. Hidden from assistive tech.

## Basic usage

<div class="demo-surface demo-stack" style="flex-direction: column; align-items: stretch; max-width: 24rem;">
  <RSkeleton variant="text" width="70%" />
  <RSkeleton variant="text" width="90%" />
  <RSkeleton variant="rect" height="6rem" />
  <div style="display: flex; gap: 0.75rem; align-items: center;">
    <RSkeleton variant="circle" />
    <RSkeleton variant="text" width="55%" />
  </div>
</div>

```vue-html
<RSkeleton variant="text" width="70%" />
<RSkeleton variant="circle" />
<RSkeleton variant="rect" height="6rem" />
```

The shimmer animation disables automatically under
`prefers-reduced-motion`. Pair with `v-if` on loaded data:

```vue-html
<RCard v-if="user" …>…</RCard>
<RSkeleton v-else variant="rect" height="10rem" />
```

## API

| Prop       | Type                              | Default  |
| ---------- | --------------------------------- | -------- |
| `variant`  | `'text' \| 'circle' \| 'rect'`    | `'text'` |
| `width`    | `string`                          | `'100%'` |
| `height`   | `string`                          | per variant |
| `animated` | `boolean`                         | `true`   |

## Overrides

`--r-skeleton-bg`
