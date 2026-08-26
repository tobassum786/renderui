# Input

Text field with label, hint and error wiring — including `aria-invalid` and `aria-describedby`. Built for accessibility and form library integration.

## Basic Usage

<div class="demo-stack" style="max-width: 22rem;">
  <RInput label="Email" type="email" placeholder="you@example.com" hint="We never share your email." />
  <RInput label="Workspace" error="This name is taken." />
</div>

```vue
<RInput v-model="email" label="Email" hint="We never share your email." />
<RInput v-model="name" label="Workspace" error="This name is taken." />
```

## Sizes

<div class="demo-surface demo-stack" style="flex-direction: column; align-items: stretch; max-width: 22rem;">
  <RInput size="sm" placeholder="Small" />
  <RInput size="md" placeholder="Medium (default)" />
  <RInput size="lg" placeholder="Large" />
</div>

```vue
<RInput size="sm" placeholder="Small" />
<RInput size="md" placeholder="Medium (default)" />
<RInput size="lg" placeholder="Large" />
```

## States

### Disabled

<div class="demo-stack" style="max-width: 22rem;">
  <RInput label="Disabled" placeholder="Cannot edit" disabled />
</div>

```vue
<RInput label="Disabled" placeholder="Cannot edit" disabled />
```

### Readonly

<div class="demo-stack" style="max-width: 22rem;">
  <RInput label="Readonly" value="Pre-filled value" readonly />
</div>

```vue
<RInput label="Readonly" :model-value="value" readonly />
```

### With Error

<div class="demo-stack" style="max-width: 22rem;">
  <RInput label="Email" type="email" value="invalid" error="Enter a valid email address" />
</div>

```vue
<RInput label="Email" type="email" value="invalid" error="Enter a valid email address" />
```

### Required Indicator

<div class="demo-stack" style="max-width: 22rem;">
  <RInput label="Username" required placeholder="Required field" />
</div>

```vue
<RInput label="Username" required placeholder="Required field" />
```

## Form Library Integration

### VeeValidate + Zod

```vue
<script setup>
import { useForm, useField } from 'vee-validate'
import * as zod from 'zod'
import { RInput, RButton } from 'renderui'

const schema = zod.object({
  email: zod.string().email('Invalid email'),
  password: zod.string().min(8, 'At least 8 characters'),
  confirmPassword: zod.string()
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
})

const { handleSubmit, isSubmitting } = useForm({ validationSchema: schema })
const email = useField('email')
const password = useField('password')
const confirmPassword = useField('confirmPassword')

function onSubmit(values) {
  console.log('Form submitted:', values)
}
</script>

<template>
  <form @submit="handleSubmit(onSubmit)" class="space-y-4 max-w-md">
    <RInput
      v-model="email.value"
      label="Email"
      type="email"
      :error="email.errorMessage"
      placeholder="you@example.com"
    />
    <RInput
      v-model="password.value"
      label="Password"
      type="password"
      :error="password.errorMessage"
      placeholder="••••••••"
    />
    <RInput
      v-model="confirmPassword.value"
      label="Confirm Password"
      type="password"
      :error="confirmPassword.errorMessage"
      placeholder="••••••••"
    />
    <RButton type="submit" block :loading="isSubmitting">Create Account</RButton>
  </form>
</template>
```

### TanStack Form

```vue
<script setup>
import { useForm } from '@tanstack/vue-form'
import { RInput, RButton } from 'renderui'

const form = useForm({
  defaultValues: { name: '', bio: '' },
  onSubmit: async (values) => {
    await submitProfile(values)
  }
})
</script>

<template>
  <form @submit="form.handleSubmit" class="space-y-4 max-w-md">
    <RInput
      :value="form.state.values.name"
      @input="e => form.setFieldValue('name', e.target.value)"
      @blur="form.handleBlur"
      label="Name"
      :error="form.state.errors.name"
      placeholder="John Doe"
    />
    <RTextarea
      :value="form.state.values.bio"
      @input="e => form.setFieldValue('bio', e.target.value)"
      @blur="form.handleBlur"
      label="Bio"
      :error="form.state.errors.bio"
      rows="3"
    />
    <RButton type="submit" block :loading="form.state.isSubmitting">Save</RButton>
  </form>
</template>
```

### Native HTML Form

```vue
<script setup>
import { ref } from 'vue'
import { RInput, RButton } from 'renderui'

const formData = ref({ username: '', email: '' })

function submit() {
  console.log('Submitted:', formData.value)
}
</script>

<template>
  <form @submit.prevent="submit" class="space-y-4 max-w-md">
    <RInput
      v-model="formData.username"
      label="Username"
      required
      autocomplete="username"
    />
    <RInput
      v-model="formData.email"
      label="Email"
      type="email"
      required
      autocomplete="email"
    />
    <RButton type="submit" block>Submit</RButton>
  </form>
</template>
```

## Input Types

All standard HTML5 input types supported:

<div class="demo-stack" style="max-width: 22rem;">
  <RInput label="Text" type="text" placeholder="Text input" />
  <RInput label="Email" type="email" placeholder="email@example.com" />
  <RInput label="Password" type="password" placeholder="••••••••" />
  <RInput label="Number" type="number" placeholder="42" />
  <RInput label="URL" type="url" placeholder="https://example.com" />
  <RInput label="Tel" type="tel" placeholder="+1 (555) 123-4567" />
  <RInput label="Search" type="search" placeholder="Search..." />
</div>

```vue
<RInput type="text" placeholder="Text input" />
<RInput type="email" placeholder="email@example.com" />
<RInput type="password" placeholder="••••••••" />
<RInput type="number" placeholder="42" />
<RInput type="url" placeholder="https://example.com" />
<RInput type="tel" placeholder="+1 (555) 123-4567" />
<RInput type="search" placeholder="Search..." />
```

## With Icons (Using Slots)

<div class="demo-stack" style="max-width: 22rem;">
  <RInput label="Search" placeholder="Search...">
    <template #prepend>
      <svg class="w-5 h-5 text-muted-color" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
    </template>
  </RInput>
  <RInput label="Amount" placeholder="0.00">
    <template #prepend>$</template>
    <template #append>.00</template>
  </RInput>
  <RInput label="Website" placeholder="example.com">
    <template #prepend>
      <svg class="w-5 h-5 text-muted-color" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
    </template>
  </RInput>
</div>

```vue
<RInput label="Search" placeholder="Search...">
  <template #prepend>
    <svg class="w-5 h-5 text-muted-color" ... />
  </template>
</RInput>

<RInput label="Amount" placeholder="0.00">
  <template #prepend>$</template>
  <template #append>.00</template>
</RInput>
```

> **Note**: Use CSS to style prepend/append:
> ```css
> .my-input :deep(.r-input-affix) {
>   display: flex;
>   align-items: center;
>   padding: 0 var(--r-space-3);
>   color: var(--r-color-text-muted);
> }
> ```

## Autocomplete Values

Common `autocomplete` values for better UX:

| Field | Autocomplete |
|-------|--------------|
| Name | `name` |
| Given name | `given-name` |
| Family name | `family-name` |
| Email | `email` |
| Username | `username` |
| New password | `new-password` |
| Current password | `current-password` |
| One-time code | `one-time-code` |
| Address (street) | `street-address` |
| Address (line 2) | `address-line2` |
| City | `address-level2` |
| State/Province | `address-level1` |
| ZIP/Postal | `postal-code` |
| Country | `country` |
| Phone | `tel` |
| Credit card | `cc-number` |
| CC expiry | `cc-exp` |
| CC CVC | `cc-csc` |

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | `''` | v-model value |
| `label` | `string` | — | Label text |
| `hint` | `string` | — | Helper text below input |
| `error` | `string` | — | Error message (red, `aria-invalid`) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Input size |
| `type` | `string` | `'text'` | HTML input type |
| `placeholder` | `string` | — | Placeholder text |
| `disabled` | `boolean` | `false` | Disable input |
| `readonly` | `boolean` | `false` | Readonly mode |
| `required` | `boolean` | `false` | Required attribute |
| `autocomplete` | `string` | — | Autocomplete hint |
| `autofocus` | `boolean` | `false` | Auto-focus on mount |
| `maxlength` | `number` | — | Max character limit |
| `minlength` | `number` | — | Min character limit |
| `pattern` | `string` | — | Validation regex |

**Events:** `update:modelValue`, `focus`, `blur`, `input`, `change`

**Slots:** `prepend`, `append` (for icons/affixes)

## CSS Variables (Overrides)

```css
--r-input-bg              /* Background */
--r-input-border          /* Border color */
--r-input-border-hover    /* Hover border */
--r-input-border-focus    /* Focus border */
--r-input-text            /* Text color */
--r-input-placeholder     /* Placeholder color */
--r-input-radius          /* Border radius */
--r-input-height          /* Input height */
```

### Custom Input Theme

```css
:root {
  /* Material-style outlined input */
  --r-input-bg: transparent;
  --r-input-border: var(--r-color-border-strong);
  --r-input-border-focus: var(--r-color-brand-500);
  --r-input-radius: var(--r-radius-md);
  --r-input-height: 3rem;
}

:root {
  /* Filled input style */
  --r-input-bg: var(--r-color-bg-sunken);
  --r-input-border: transparent;
  --r-input-border-focus: var(--r-color-brand-500);
  --r-input-radius: var(--r-radius-md);
}
```

## Accessibility

- **Labels**: Always associate via `label` prop (renders `<label for="...">`)
- **Errors**: Announced via `aria-describedby` + `aria-invalid="true"`
- **Hints**: Announced via `aria-describedby` when no error
- **Required**: `aria-required="true"` + visual `*` indicator
- **Focus**: Visible focus ring using `--r-color-focus-ring`
- **Autocomplete**: Proper `autocomplete` attributes for password managers

## Testing

```ts
import { mount } from '@vue/test-utils'
import { RInput } from 'renderui'

it('shows error state', () => {
  const wrapper = mount(RInput, {
    props: { label: 'Email', error: 'Invalid email' }
  })
  expect(wrapper.find('[aria-invalid="true"]').exists()).toBe(true)
  expect(wrapper.text()).toContain('Invalid email')
})

it('emits update:modelValue', async () => {
  const wrapper = mount(RInput, { props: { modelValue: '' } })
  await wrapper.find('input').setValue('test@example.com')
  expect(wrapper.emitted('update:modelValue')[0]).toEqual(['test@example.com'])
})
```