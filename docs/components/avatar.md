# Avatar

User representation with an image → initials → icon fallback chain.

## Basic usage

<div class="demo-surface">
  <RAvatar name="Ada Lovelace" />
  <RAvatar name="Grace Hopper" size="lg" />
  <RAvatar src="https://i.pravatar.cc/96?img=5" alt="Community member" />
  <RAvatar />
</div>

```vue-html
<RAvatar name="Ada Lovelace" />            <!-- renders "AL" -->
<RAvatar src="/user.png" alt="User" />     <!-- image -->
<RAvatar name="Grace Hopper" size="lg" />
```

If the image fails to load, initials from `name` are shown; without either,
a person icon renders as last resort.

## API

| Prop   | Type                                      | Default |
| ------ | ----------------------------------------- | ------- |
| `src`  | `string`                                  | —       |
| `alt`  | `string`                                  | falls back to `name` |
| `name` | `string`                                  | —       |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`    | `'md'`  |

## Overrides

`--r-avatar-size` · `--r-avatar-bg` · `--r-avatar-text`
