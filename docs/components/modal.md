# Modal

Accessible dialog with teleport, focus management, scroll locking, Escape/backdrop dismissal and enter/leave transitions.

<script setup>
import { ref } from 'vue'

// Basic usage
const open = ref(false)

// Sizes
const smOpen = ref(false)
const mdOpen = ref(false)
const lgOpen = ref(false)
const xlOpen = ref(false)
const fullOpen = ref(false)

// Advanced patterns
const deleteOpen = ref(false)
const formOpen = ref(false)
const form = ref({ name: '', email: '' })
const asyncOpen = ref(false)
const asyncProcessing = ref(false)
const nested1 = ref(false)
const nested2 = ref(false)
const customHeader = ref(false)

async function process() {
  asyncProcessing.value = true
  await new Promise(r => setTimeout(r, 1500))
  asyncProcessing.value = false
  asyncOpen.value = false
}
</script>

## Basic Usage

<RButton variant="secondary" @click="open = true">Open modal</RButton>

<RModal v-model="open" title="Confirm upgrade" size="sm">
  You are about to upgrade your workspace to the Team plan.
  <template #footer>
    <RButton variant="ghost" @click="open = false">Cancel</RButton>
    <RButton @click="open = false">Confirm</RButton>
  </template>
</RModal>

```vue
<script setup>
import { ref } from 'vue'
import { RButton, RModal } from 'renderui'

const open = ref(false)
</script>

<template>
  <RButton @click="open = true">Open modal</RButton>

  <RModal v-model="open" title="Confirm upgrade" size="sm">
    <p>You are about to upgrade your workspace to the Team plan.</p>
    <template #footer>
      <RButton variant="ghost" @click="open = false">Cancel</RButton>
      <RButton @click="open = false">Confirm</RButton>
    </template>
  </RModal>
</template>
```

## Sizes

<div class="demo-stack" style="max-width: 28rem;">
  <RButton variant="secondary" @click="smOpen = true">Small</RButton>
  <RButton variant="secondary" @click="mdOpen = true">Medium</RButton>
  <RButton variant="secondary" @click="lgOpen = true">Large</RButton>
  <RButton variant="secondary" @click="xlOpen = true">Extra Large</RButton>
  <RButton variant="secondary" @click="fullOpen = true">Full Screen</RButton>
</div>

<RModal v-model="smOpen" title="Small (sm)" size="sm">Compact dialog for simple confirmations.</RModal>
<RModal v-model="mdOpen" title="Medium (md)" size="md">Default size for most dialogs.</RModal>
<RModal v-model="lgOpen" title="Large (lg)" size="lg">More space for forms or content.</RModal>
<RModal v-model="xlOpen" title="Extra Large (xl)" size="xl">Complex forms or data views.</RModal>
<RModal v-model="fullOpen" title="Full Screen" size="full">Full viewport — mobile-friendly.</RModal>

```vue
<RModal v-model="open" size="sm">Small</RModal>
<RModal v-model="open" size="md">Medium (default)</RModal>
<RModal v-model="open" size="lg">Large</RModal>
<RModal v-model="open" size="xl">Extra Large</RModal>
<RModal v-model="open" size="full">Full Screen</RModal>
```

## Advanced Patterns

### Confirmation Dialog

<div class="demo-stack" style="max-width: 28rem;">
  <RButton variant="danger" @click="deleteOpen = true">Delete Project</RButton>
</div>

<RModal v-model="deleteOpen" title="Delete project?" size="sm">
  <div class="flex items-start gap-3">
    <svg class="w-6 h-6 text-danger mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
    </svg>
    <p>This action cannot be undone. All data associated with "Acme Project" will be permanently deleted.</p>
  </div>
  <template #footer>
    <RButton variant="ghost" @click="deleteOpen = false">Cancel</RButton>
    <RButton variant="danger" @click="deleteOpen = false">Delete permanently</RButton>
  </template>
</RModal>

### Form Modal

<div class="demo-stack" style="max-width: 28rem;">
  <RButton @click="formOpen = true">Edit Profile</RButton>
</div>

<RModal v-model="formOpen" title="Edit Profile" size="md">
  <form class="space-y-4">
    <RInput v-model="form.name" label="Full Name" />
    <RInput v-model="form.email" label="Email" type="email" />
  </form>
  <template #footer>
    <RButton variant="ghost" @click="formOpen = false">Cancel</RButton>
    <RButton @click="formOpen = false">Save Changes</RButton>
  </template>
</RModal>

### Async Confirmation (Loading State)

<div class="demo-stack" style="max-width: 28rem;">
  <RButton @click="asyncOpen = true">Process Payment</RButton>
</div>

<RModal v-model="asyncOpen" title="Processing Payment" size="sm">
  <div v-if="!asyncProcessing" class="text-center py-4">
    <p>Charging $29.00 to your card ending in 4242.</p>
  </div>
  <div v-else class="flex flex-col items-center gap-4 py-4">
    <RSpinner size="lg" />
    <p>Processing… please don't close this window.</p>
  </div>
  <template #footer>
    <RButton v-if="!asyncProcessing" variant="ghost" @click="asyncOpen = false">Cancel</RButton>
    <RButton v-if="!asyncProcessing" @click="process">Confirm Payment</RButton>
    <RButton v-else variant="ghost" disabled>Processing…</RButton>
  </template>
</RModal>

### Nested Modals

Modals stack automatically with proper z-index layering.

<div class="demo-stack" style="max-width: 28rem;">
  <RButton @click="nested1 = true">Open First Modal</RButton>
</div>

<RModal v-model="nested1" title="First Modal" size="md">
  <p>This is the first modal.</p>
  <RButton variant="secondary" class="mt-4" @click="nested2 = true">Open Second Modal</RButton>
  <template #footer>
    <RButton variant="ghost" @click="nested1 = false">Close</RButton>
  </template>
</RModal>
<RModal v-model="nested2" title="Second Modal" size="sm">
  <p>This modal stacks on top.</p>
  <template #footer>
    <RButton variant="ghost" @click="nested2 = false">Close</RButton>
  </template>
</RModal>

### Custom Header (No Title Prop)

<div class="demo-stack" style="max-width: 28rem;">
  <RButton @click="customHeader = true">Custom Header</RButton>
</div>

<RModal v-model="customHeader" :hide-close="true" size="md">
  <template #header>
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <svg class="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" clip-rule="evenodd"/></svg>
        </div>
        <div>
          <h3 class="font-semibold">Welcome to RenderUI</h3>
          <p class="text-sm text-muted-color">Get started in minutes</p>
        </div>
      </div>
    </div>
  </template>
  <p class="mt-4">Thanks for trying RenderUI! Check out the docs to learn more.</p>
  <template #footer>
    <RButton variant="ghost" @click="customHeader = false">Later</RButton>
    <RButton @click="customHeader = false">Read Docs</RButton>
  </template>
</RModal>

## Behavior

- **Teleport** — Renders into `<body>` via `<Teleport>`; safe inside any layout
- **Focus management** — Focus moves to dialog on open, returns to trigger on close
- **Scroll lock** — Body scrolling disabled while open
- **Escape key** — Closes modal (`closeOnEsc`, default `true`)
- **Backdrop click** — Closes modal (`closeOnBackdrop`, default `true`)
- **Accessibility** — `aria-modal`, `role="dialog"`, `aria-labelledby` wired automatically
- **Transitions** — Enter/leave animations with `prefers-reduced-motion` support

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | `false` | v-model visibility |
| `title` | `string` | — | Dialog title (accessible label) |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Modal width |
| `closeOnEsc` | `boolean` | `true` | Close on Escape key |
| `closeOnBackdrop` | `boolean` | `true` | Close on backdrop click |
| `hideClose` | `boolean` | `false` | Hide default close button |

**Events:** `update:modelValue: [value: boolean]`, `open`, `close`

**Slots:** `default` (body), `header` (replaces title), `footer` (actions)

## CSS Variables (Overrides)

```css
--r-modal-bg           /* Modal background */
--r-modal-border       /* Modal border */
--r-modal-radius       /* Border radius */
--r-modal-shadow       /* Box shadow */
--r-modal-overlay      /* Backdrop overlay color */
```

### Custom Modal Theme

```css
:root {
  --r-modal-bg: var(--r-color-bg-surface);
  --r-modal-border: var(--r-color-border-subtle);
  --r-modal-radius: var(--r-radius-xl);
  --r-modal-shadow: var(--r-shadow-lg);
  --r-modal-overlay: rgb(0 0 0 / 0.6);
}

[data-theme='dark'] {
  --r-modal-overlay: rgb(0 0 0 / 0.75);
}
```

## Accessibility

| Feature | Implementation |
|---------|----------------|
| Role | `role="dialog" aria-modal="true"` |
| Label | `aria-labelledby` → title element |
| Focus trap | Focus cycles within modal (basic) |
| Return focus | Restores to trigger element on close |
| Scroll lock | `body { overflow: hidden }` while open |
| Escape | Closes when `closeOnEsc` enabled |
| Backdrop | Click outside closes when `closeOnBackdrop` enabled |
| Reduced motion | Disables transitions when `prefers-reduced-motion` |

## Testing

```ts
import { mount } from '@vue/test-utils'
import { RModal, RButton } from 'renderui'

it('opens and closes', async () => {
  const wrapper = mount({
    components: { RModal, RButton },
    template: `
      <RButton @click="open = true">Open</RButton>
      <RModal v-model="open" title="Test">Content</RModal>
    `,
    setup() { return { open: ref(false) } }
  })

  expect(wrapper.find('[role="dialog"]').exists()).toBe(false)

  await wrapper.findComponent(RButton).trigger('click')
  expect(wrapper.find('[role="dialog"]').exists()).toBe(true)
  expect(wrapper.find('[role="dialog"]').text()).toContain('Content')

  await wrapper.find('[role="dialog"]').trigger('keydown.esc')
  expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
})

it('focuses first focusable element', async () => {
  const wrapper = mount(RModal, {
    props: { modelValue: true, title: 'Test' },
    slots: {
      default: '<RButton>Focus me</RButton>',
      footer: '<RButton>Action</RButton>'
    }
  })

  const dialog = wrapper.find('[role="dialog"]')
  expect(document.activeElement).toBe(dialog.element.querySelector('button'))
})
```

## Integration Examples

### With Vue Router (Route-based Modal)

```vue
<script setup>
import { useRoute } from 'vue-router'
import { RModal } from 'renderui'

const route = useRoute()
const showModal = computed({
  get: () => route.query.modal === 'signup',
  set: (val) => router.replace({ query: { ...route.query, modal: val ? 'signup' : undefined } })
})
</script>

<template>
  <RModal v-model="showModal" title="Sign Up" size="md">
    <!-- Sign up form -->
  </RModal>
</template>
```

### With Pinia (Global Modal Store)

```ts
// stores/modal.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const modals = ref<Record<string, boolean>>({})

  function open(key: string) { modals.value[key] = true }
  function close(key: string) { modals.value[key] = false }
  function toggle(key: string) { modals.value[key] = !modals.value[key] }

  return { modals, open, close, toggle }
})
```

```vue
<!-- GlobalModalPortal.vue -->
<script setup>
import { RModal } from 'renderui'
import { useModalStore } from '@/stores/modal'

const modal = useModalStore()
</script>

<template>
  <RModal v-model="modal.modals.confirm" title="Confirm" size="sm">
    <slot name="confirm-body" />
    <template #footer>
      <RButton variant="ghost" @click="modal.close('confirm')">Cancel</RButton>
      <RButton @click="modal.close('confirm')">Confirm</RButton>
    </template>
  </RModal>
</template>
```

```vue
<!-- AnyComponent.vue -->
<script setup>
import { useModalStore } from '@/stores/modal'
const modal = useModalStore()

function deleteItem() {
  modal.open('confirm')
}
</script>
```