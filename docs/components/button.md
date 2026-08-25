# Button

Trigger actions with four visual variants, three sizes, loading and block
states.

## Basic usage

<div class="demo-surface">
  <RButton>Primary</RButton>
  <RButton variant="secondary">Secondary</RButton>
  <RButton variant="ghost">Ghost</RButton>
  <RButton variant="danger">Danger</RButton>
</div>

```vue-html
<RButton>Primary</RButton>
<RButton variant="secondary">Secondary</RButton>
<RButton variant="ghost">Ghost</RButton>
<RButton variant="danger">Danger</RButton>
```

## Sizes and states

<div class="demo-surface">
  <RButton size="sm">Small</RButton>
  <RButton size="md">Medium</RButton>
  <RButton size="lg">Large</RButton>
  <RButton disabled>Disabled</RButton>
</div>

Loading buttons show a spinner, disable interaction and expose `aria-busy`:

<div class="demo-surface">
  <RButton loading>Saving…</RButton>
</div>

## Icon slots

<div class="demo-surface">
  <RButton variant="secondary">
    <template #icon>⭐</template>
    Star
    <template #icon-right>↗</template>
  </RButton>
</div>

## API

| Prop       | Type                                          | Default     |
| ---------- | --------------------------------------------- | ----------- |
| `variant`  | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'primary'` |
| `size`     | `'sm' \| 'md' \| 'lg'`                        | `'md'`      |
| `type`     | `'button' \| 'submit' \| 'reset'`             | `'button'`  |
| `disabled` | `boolean`                                     | `false`     |
| `loading`  | `boolean`                                     | `false`     |
| `block`    | `boolean`                                     | `false`     |

**Events:** `click`

**Slots:** `default`, `icon`, `icon-right`

## Overrides

`--r-button-bg` · `--r-button-bg-hover` · `--r-button-bg-active` · `--r-button-text` · `--r-button-border`
