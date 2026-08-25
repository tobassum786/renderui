# Card

Group related content with optional header and footer sections.

## Basic usage

<div class="demo-grid" style="max-width: 30rem;">
  <RCard title="Team plan" hoverable>
    Everything you need to ship accessible products faster.
    <template #footer>
      <RButton variant="ghost" size="sm">Not now</RButton>
      <RButton size="sm">Upgrade</RButton>
    </template>
  </RCard>
</div>

```vue-html
<RCard title="Team plan" hoverable>
  Body content.
  <template #footer>
    <RButton size="sm">Upgrade</RButton>
  </template>
</RCard>
```

## Flat cards

Remove the shadow for nested or low-emphasis layouts:

<div class="demo-grid" style="max-width: 30rem;">
  <RCard flat title="Flat card">No elevation.</RCard>
</div>

## API

| Prop        | Type      | Default | Notes                     |
| ----------- | --------- | ------- | ------------------------- |
| `title`     | `string`  | —       | Shorthand header          |
| `hoverable` | `boolean` | `false` | Elevate + lift on hover   |
| `flat`      | `boolean` | `false` | Remove shadow entirely    |
| `padded`    | `boolean` | `true`  | Control body padding      |

**Slots:** `default`, `header` (replaces title), `footer`

## Overrides

`--r-card-bg` · `--r-card-border` · `--r-card-radius` · `--r-card-padding` · `--r-card-footer-bg`
