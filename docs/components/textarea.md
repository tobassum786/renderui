# Textarea

Multi-line input with the same label/hint/error semantics as Input.

## Basic usage

<div style="max-width: 26rem;">
  <RTextarea
    label="Bio"
    placeholder="Tell us about yourself…"
    :rows="4"
    hint="Markdown supported."
  />
</div>

```vue-html
<RTextarea v-model="bio" label="Bio" :rows="4" hint="Markdown supported." />
```

## Resize modes

<div style="max-width: 26rem;">
  <RTextarea resize="none" placeholder="resize: none" :rows="2" />
</div>

## API

| Prop          | Type                                     | Default      |
| ------------- | ---------------------------------------- | ------------ |
| `v-model`     | `string`                                 | `''`         |
| `label`       | `string`                                 | —            |
| `hint`        | `string`                                 | —            |
| `error`       | `string`                                 | —            |
| `rows`        | `number`                                 | `4`          |
| `resize`      | `'none' \| 'vertical' \| 'both'`         | `'vertical'` |
| `placeholder` | `string`                                 | —            |
| `disabled`    | `boolean`                                | `false`      |
| `readonly`    | `boolean`                                | `false`      |

**Events:** `update:modelValue`, `focus`, `blur`

## Overrides

`--r-textarea-bg`
