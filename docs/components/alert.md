# Alert

Contextual messages with `role="alert"` and optional dismissal.

## Basic usage

<div class="demo-stack">
  <RAlert title="Heads up">
    A new version of this workspace is available.
  </RAlert>
  <RAlert variant="success" title="All good">
    Your changes have been saved.
  </RAlert>
  <RAlert variant="warning" title="Storage almost full">
    92% of your quota is in use.
  </RAlert>
  <RAlert variant="danger" dismissible title="Sync failed">
    We couldn't reach the server. Retrying in 30 seconds…
  </RAlert>
</div>

```vue-html
<RAlert variant="success" title="All good">Saved.</RAlert>
<RAlert variant="danger" dismissible @dismiss="hide = true">
  Sync failed.
</RAlert>
```

## API

| Prop          | Type                                          | Default |
| ------------- | --------------------------------------------- | ------- |
| `variant`     | `'info' \| 'success' \| 'warning' \| 'danger'` | `'info'` |
| `title`       | `string`                                      | —       |
| `dismissible` | `boolean`                                     | `false` |

**Events:** `dismiss`

**Slots:** `default` (body)

## Overrides

`--r-alert-accent` · `--r-alert-bg` (per-variant)
