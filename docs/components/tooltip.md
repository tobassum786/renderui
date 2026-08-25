# Tooltip

Pure-CSS tooltip revealed on hover or keyboard focus — no positioning library.

## Basic usage

<div class="demo-surface" style="gap: 1.5rem;">
  <RTooltip content="Deploy to production">
    <RButton size="sm">Top (default)</RButton>
  </RTooltip>
  <RTooltip content="Shown below" placement="bottom">
    <RButton size="sm">Bottom</RButton>
  </RTooltip>
  <RTooltip content="To the left" placement="left">
    <RButton size="sm">Left</RButton>
  </RTooltip>
  <RTooltip content="To the right" placement="right">
    <RButton size="sm">Right</RButton>
  </RTooltip>
</div>

```vue-html
<RTooltip content="Deploy to production">
  <RButton size="sm">Deploy</RButton>
</RTooltip>

<RTooltip placement="bottom" content="Shown below">
  …
</RTooltip>
```

Hover the examples — or Tab to them — to reveal. The trigger exposes
`aria-describedby` linked to the tooltip's `role="tooltip"` element; colors
auto-invert per theme.

::: warning
CSS-only tooltips clip inside `overflow: hidden` containers and don't flip at
viewport edges. For those cases, pair with a floating-ui-based solution.
:::

## API

| Prop        | Type                                        | Default |
| ----------- | ------------------------------------------- | ------- |
| `content`   | `string`                                    | —       |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'`    | `'top'` |

**Slots:** `default` (trigger), `content` (rich tooltip)

## Overrides

`--r-tooltip-bg` · `--r-tooltip-text`
