# Card

Group related content with optional header and footer sections. Cards are the primary surface for organizing information in RenderUI.

## Basic Usage

<div class="demo-grid" style="max-width: 30rem;">
  <RCard title="Team plan" hoverable>
    Everything you need to ship accessible products faster.
    <template #footer>
      <RButton variant="ghost" size="sm">Not now</RButton>
      <RButton size="sm">Upgrade</RButton>
    </template>
  </RCard>
</div>

```vue
<RCard title="Team plan" hoverable>
  Everything you need to ship accessible products faster.
  <template #footer>
    <RButton variant="ghost" size="sm">Not now</RButton>
    <RButton size="sm">Upgrade</RButton>
  </template>
</RCard>
```

## Variants

### Flat Cards

Remove elevation for nested or low-emphasis layouts:

<div class="demo-grid" style="max-width: 30rem;">
  <RCard flat title="Flat card">No elevation — great for dense layouts.</RCard>
</div>

```vue
<RCard flat title="Flat card">No elevation.</RCard>
```

### Borderless Cards

Use CSS override for completely borderless cards:

<div class="demo-grid" style="max-width: 30rem;">
  <RCard class="borderless" title="Borderless">Custom styled via CSS.</RCard>
</div>

```css
/* In your global CSS */
.borderless {
  --r-card-border: transparent;
}
```

```vue
<RCard class="borderless" title="Borderless">Custom styled via CSS.</RCard>
```

## Slots

### Default Slot (Body)

Main content area:

```vue
<RCard title="Article">
  <p>Rich content with <strong>formatting</strong> and <a href="#">links</a>.</p>
  <ul>
    <li>List item one</li>
    <li>List item two</li>
  </ul>
</RCard>
```

### Header Slot

Complete control over header (replaces `title` prop):

<div class="demo-grid" style="max-width: 30rem;">
  <RCard>
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="font-semibold">Custom Header</h3>
        <RBadge variant="primary">New</RBadge>
      </div>
    </template>
    Body content with custom header.
  </RCard>
</div>

```vue
<RCard>
  <template #header>
    <div class="flex items-center justify-between">
      <h3 class="font-semibold">Custom Header</h3>
      <RBadge variant="primary">New</RBadge>
    </div>
  </template>
  Body content with custom header.
</RCard>
```

### Footer Slot

Action bar at bottom:

<div class="demo-grid" style="max-width: 30rem;">
  <RCard title="With footer">
    Card with action buttons in footer.
    <template #footer>
      <RButton variant="ghost" size="sm">Cancel</RButton>
      <RButton size="sm">Save</RButton>
    </template>
  </RCard>
</div>

```vue
<RCard title="With footer">
  Card with action buttons in footer.
  <template #footer>
    <RButton variant="ghost" size="sm">Cancel</RButton>
    <RButton size="sm">Save</RButton>
  </template>
</RCard>
```

## Common Patterns

### Pricing Card

<div class="demo-grid" style="max-width: 30rem;">
  <RCard hoverable>
    <template #header>
      <div class="text-center p-4 border-b">
        <h3 class="text-lg font-semibold">Pro</h3>
        <div class="mt-2 flex items-baseline justify-center gap-1">
          <span class="text-3xl font-bold">$29</span>
          <span class="text-muted-color">/month</span>
        </div>
      </div>
    </template>
    <ul class="space-y-2 my-4">
      <li class="flex items-center gap-2"><svg class="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>Unlimited projects</li>
      <li class="flex items-center gap-2"><svg class="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>Team collaboration</li>
      <li class="flex items-center gap-2"><svg class="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>Advanced analytics</li>
    </ul>
    <template #footer>
      <RButton block size="lg">Get Started</RButton>
    </template>
  </RCard>
</div>

### User Profile Card

<div class="demo-grid" style="max-width: 30rem;">
  <RCard flat>
    <template #header>
      <div class="flex items-center gap-4 p-4 border-b">
        <RAvatar name="Ada Lovelace" size="xl" />
        <div>
          <h3 class="font-semibold">Ada Lovelace</h3>
          <p class="text-sm text-muted-color">@ada · Developer</p>
        </div>
      </div>
    </template>
    <p class="px-4 py-4">Pioneer of computer programming. Wrote the first algorithm intended for a machine.</p>
    <template #footer>
      <div class="flex gap-2 w-full p-4 border-t">
        <RButton variant="ghost" class="flex-1">Follow</RButton>
        <RButton class="flex-1">Message</RButton>
      </div>
    </template>
  </RCard>
</div>

### Dashboard Stat Card

<div class="demo-grid" style="max-width: 30rem;">
  <RCard flat>
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm text-muted-color">Total Revenue</p>
        <p class="text-2xl font-bold mt-1">$48,352</p>
      </div>
      <div class="p-3 bg-primary/10 rounded-lg">
        <svg class="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-11a1 1 0 10-2 0v5a1 1 0 00.293.707l4 4a1 1 0 001.414 0l4-4a1 1 0 00.293-.707V7a1 1 0 00-2 0v5.586l-3.293-3.293a1 1 0 00-1.414 0L9 12.586V7z"/></svg>
      </div>
    </div>
    <div class="mt-4 flex items-center gap-1 text-success text-sm">
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
      <span>+12.5% vs last month</span>
    </div>
  </RCard>
</div>

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Shorthand header text |
| `hoverable` | `boolean` | `false` | Elevate + lift on hover |
| `flat` | `boolean` | `false` | Remove shadow entirely |
| `padded` | `boolean` | `true` | Control body padding |

**Slots:** `default` (body), `header` (replaces title), `footer`

**Events:** None

## CSS Variables (Overrides)

```css
/* Card-level customization */
--r-card-bg              /* Background color */
--r-card-border          /* Border color */
--r-card-radius          /* Border radius */
--r-card-shadow          /* Box shadow (elevation) */
--r-card-padding         /* Body padding */
--r-card-footer-bg       /* Footer background */
```

### Example: Custom Card Theme

```css
:root {
  /* Branded cards */
  --r-card-bg: var(--r-color-brand-50);
  --r-card-border: var(--r-color-brand-200);
  --r-card-radius: var(--r-radius-xl);
  --r-card-shadow: var(--r-shadow-lg);
}

[data-theme='dark'] {
  --r-card-bg: color-mix(in srgb, var(--r-color-brand-900) 20%, var(--r-color-bg-surface));
  --r-card-border: var(--r-color-brand-800);
}
```

## Accessibility

- Cards use semantic `<article>` or `<section>` elements
- `title` prop renders as heading (h3 by default)
- Footer actions are keyboard accessible
- Focus management for interactive cards

## Integration Examples

### With Vue Router (Clickable Card)

```vue
<script setup>
import { RouterLink } from 'vue-router'
import { RCard, RButton } from 'renderui'
</script>

<template>
  <RouterLink to="/article/123" class="block">
    <RCard hoverable title="Article Title">
      Article preview text...
    </RCard>
  </RouterLink>
</template>

<style>
/* Prevent button clicks from triggering navigation */
a :deep(.r-button) { pointer-events: auto; }
</style>
```

### With TanStack Query (Loading State)

```vue
<script setup>
import { useQuery } from '@tanstack/vue-query'
import { RCard, RSkeleton, RButton } from 'renderui'

const { data, isLoading } = useQuery({
  queryKey: ['dashboard-stats'],
  queryFn: fetchStats
})
</script>

<template>
  <RCard flat v-if="isLoading">
    <RSkeleton variant="text" width="40%" />
    <RSkeleton variant="text" class="mt-2" width="60%" />
    <RSkeleton variant="rect" class="mt-4" height="60px" />
  </RCard>

  <RCard flat v-else title="Dashboard">
    <!-- stats content -->
  </RCard>
</template>
```

### With VeeValidate / Zod (Form Card)

```vue
<script setup>
import { useForm, useField } from 'vee-validate'
import * as zod from 'zod'
import { RCard, RInput, RButton } from 'renderui'

const schema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8)
})

const { handleSubmit } = useForm({ validationSchema: schema })
const email = useField('email')
const password = useField('password')
</script>

<template>
  <RCard title="Sign In">
    <form @submit="handleSubmit(() => {})" class="space-y-4">
      <RInput
        v-model="email.value"
        label="Email"
        type="email"
        :error="email.errorMessage"
      />
      <RInput
        v-model="password.value"
        label="Password"
        type="password"
        :error="password.errorMessage"
      />
      <template #footer>
        <RButton type="submit" block>Sign In</RButton>
      </template>
    </form>
  </RCard>
</template>
```