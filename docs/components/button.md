# Button

Trigger actions with four visual variants, three sizes, loading and block states.

## Basic Usage

<div class="demo-surface">
  <RButton>Primary</RButton>
  <RButton variant="secondary">Secondary</RButton>
  <RButton variant="ghost">Ghost</RButton>
  <RButton variant="danger">Danger</RButton>
</div>

```vue
<RButton>Primary</RButton>
<RButton variant="secondary">Secondary</RButton>
<RButton variant="ghost">Ghost</RButton>
<RButton variant="danger">Danger</RButton>
```

## Variants

### Primary
Main action — high emphasis.

<div class="demo-surface">
  <RButton>Primary Action</RButton>
</div>

### Secondary
Alternative action — medium emphasis.

<div class="demo-surface">
  <RButton variant="secondary">Secondary Action</RButton>
</div>

### Ghost
Low-emphasis action — no background until hover.

<div class="demo-surface">
  <RButton variant="ghost">Ghost Action</RButton>
</div>

### Danger
Destructive action — warns user.

<div class="demo-surface">
  <RButton variant="danger">Delete</RButton>
</div>

## Sizes

<div class="demo-surface">
  <RButton size="sm">Small</RButton>
  <RButton size="md">Medium (default)</RButton>
  <RButton size="lg">Large</RButton>
</div>

```vue
<RButton size="sm">Small</RButton>
<RButton size="md">Medium</RButton>
<RButton size="lg">Large</RButton>
```

## States

### Disabled

<div class="demo-surface">
  <RButton disabled>Disabled</RButton>
</div>

```vue
<RButton disabled>Disabled</RButton>
```

### Loading

Shows spinner, disables interaction, exposes `aria-busy`.

<div class="demo-surface">
  <RButton loading>Saving…</RButton>
</div>

```vue
<RButton loading>Saving…</RButton>
```

### Block (Full Width)

<div class="demo-surface" style="width: 100%;">
  <RButton block>Full Width Button</RButton>
</div>

```vue
<RButton block>Full Width Button</RButton>
```

## Icon Slots

### Leading Icon

<div class="demo-surface">
  <RButton variant="secondary">
    <template #icon>
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
      </svg>
    </template>
    Add Item
  </RButton>
</div>

### Trailing Icon

<div class="demo-surface">
  <RButton variant="secondary">
    Continue
    <template #icon-right>
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
      </svg>
    </template>
  </RButton>
</div>

### Icon Only

<div class="demo-surface">
  <RButton variant="ghost" size="sm" aria-label="Add">
    <template #icon>
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
      </svg>
    </template>
  </RButton>
  <RButton variant="ghost" size="sm" aria-label="Settings">
    <template #icon>
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    </template>
  </RButton>
</div>

```vue
<!-- Leading icon -->
<RButton variant="secondary">
  <template #icon>
    <svg class="w-5 h-5" ...>+</svg>
  </template>
  Add Item
</RButton>

<!-- Trailing icon -->
<RButton variant="secondary">
  Continue
  <template #icon-right>
    <svg class="w-5 h-5" ...>→</svg>
  </template>
</RButton>

<!-- Icon only (always add aria-label) -->
<RButton variant="ghost" size="sm" aria-label="Add">
  <template #icon>+</template>
</RButton>
```

## As Links

Use `type="button"` (default) for actions, or wrap with RouterLink:

```vue
<!-- For navigation, use RouterLink -->
<RouterLink to="/settings">
  <RButton variant="ghost">Settings</RButton>
</RouterLink>

<!-- For external links -->
<a href="https://github.com" target="_blank" rel="noopener">
  <RButton variant="ghost">GitHub</RButton>
</a>
```

## Form Submit

```vue
<form @submit.prevent="handleSubmit">
  <RInput v-model="email" label="Email" type="email" />
  <RButton type="submit" block :loading="submitting">Sign In</RButton>
</form>
```

## Keyboard Accessibility

| Key | Action |
|-----|--------|
| `Enter` / `Space` | Activates button |
| `Tab` | Moves focus to/from button |
| `Shift+Tab` | Moves focus backward |

- Focus visible ring uses `--r-color-focus-ring`
- Disabled buttons removed from tab order
- Loading state announces `aria-busy="true"`

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Native button type |
| `disabled` | `boolean` | `false` | Disables interaction |
| `loading` | `boolean` | `false` | Shows spinner, `aria-busy` |
| `block` | `boolean` | `false` | Full width (`width: 100%`) |

**Events:** `click: [event: MouseEvent]`

**Slots:** `default` (label), `icon` (leading), `icon-right` (trailing)

## CSS Variables (Overrides)

```css
--r-button-bg              /* Background */
--r-button-bg-hover        /* Hover background */
--r-button-bg-active       /* Active/pressed background */
--r-button-text            /* Text color */
--r-button-border          /* Border color */
--r-button-radius          /* Border radius */
```

### Custom Button Themes

```css
:root {
  /* Pill buttons (fully rounded) */
  --r-button-radius: var(--r-radius-full);
}

:root {
  /* Outlined primary (like secondary but brand color) */
  --r-button-bg: transparent;
  --r-button-border: var(--r-color-brand-500);
  --r-button-text: var(--r-color-brand-600);
  --r-button-bg-hover: var(--r-color-brand-50);
}

:root {
  /* Minimal flat buttons */
  --r-button-bg: transparent;
  --r-button-border: transparent;
  --r-button-text: var(--r-color-text-primary);
  --r-button-bg-hover: var(--r-color-bg-sunken);
}

[data-theme='dark'] {
  /* Dark mode adjustments */
  --r-button-bg: var(--r-color-brand-500);
  --r-button-text: var(--r-color-text-on-brand);
}
```

## Common Patterns

### Action Groups

```vue
<div class="flex gap-2">
  <RButton variant="ghost">Cancel</RButton>
  <RButton variant="secondary">Save Draft</RButton>
  <RButton>Publish</RButton>
</div>
```

### Destructive Confirmation

```vue
<RModal v-model="showDelete" title="Delete project?">
  <p>This action cannot be undone.</p>
  <template #footer>
    <RButton variant="ghost" @click="showDelete = false">Cancel</RButton>
    <RButton variant="danger" @click="confirmDelete">Delete</RButton>
  </template>
</RModal>
```

### Loading with Async Action

```vue
<script setup>
import { ref } from 'vue'
import { RButton } from 'renderui'

const loading = ref(false)

async function save() {
  loading.value = true
  try {
    await api.save(data)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <RButton :loading="loading" @click="save">
    <template #default>Save</template>
    <template #default v-if="loading">Saving…</template>
  </RButton>
</template>
```

## Accessibility

- **Native `<button>`** — all keyboard behavior built-in
- **Focus ring** — visible `:focus-visible` using design tokens
- **ARIA** — `aria-busy` when loading, `aria-disabled` when disabled
- **Color contrast** — meets WCAG AA in all variants
- **Reduced motion** — respects `prefers-reduced-motion`

## Testing

```ts
import { mount } from '@vue/test-utils'
import { RButton } from 'renderui'

it('renders variants', () => {
  expect(mount(RButton, { props: { variant: 'primary' } }).classes()).toContain('primary')
  expect(mount(RButton, { props: { variant: 'danger' } }).classes()).toContain('danger')
})

it('emits click when not disabled', async () => {
  const wrapper = mount(RButton)
  await wrapper.trigger('click')
  expect(wrapper.emitted('click')).toBeTruthy()
})

it('does not emit when disabled', async () => {
  const wrapper = mount(RButton, { props: { disabled: true } })
  await wrapper.trigger('click')
  expect(wrapper.emitted('click')).toBeFalsy()
})

it('shows loading state', () => {
  const wrapper = mount(RButton, { props: { loading: true } })
  expect(wrapper.findComponent({ name: 'RSpinner' }).exists()).toBe(true)
  expect(wrapper.attributes('aria-busy')).toBe('true')
})
```