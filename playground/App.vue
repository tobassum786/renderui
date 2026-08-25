<script setup lang="ts">
import { ref } from 'vue'
import { useTheme, RBadge, RButton, RCard } from '../src'

const { resolvedTheme, toggleTheme } = useTheme()

const modalOpen = ref(false)
const switchOn = ref(true)
const name = ref('')
const email = ref('')
const bio = ref('')

function submitDemo(): void {
  modalOpen.value = false
}
</script>

<template>
  <div class="page">
    <header class="header">
      <div>
        <h1 class="brand">RenderUI</h1>
        <p class="tagline">Design tokens · Accessible components · Dark mode</p>
      </div>
      <div class="header-actions">
        <RBadge :variant="resolvedTheme === 'dark' ? 'primary' : 'neutral'" dot>
          {{ resolvedTheme }}
        </RBadge>
        <RButton variant="secondary" @click="toggleTheme">
          Toggle theme
        </RButton>
      </div>
    </header>

    <main class="grid">
      <section class="section full">
        <h2>Buttons</h2>
        <div class="row wrap">
          <RButton>Primary</RButton>
          <RButton variant="secondary">Secondary</RButton>
          <RButton variant="ghost">Ghost</RButton>
          <RButton variant="danger">Danger</RButton>
          <RButton loading>Loading</RButton>
          <RButton disabled>Disabled</RButton>
          <RButton size="sm">Small</RButton>
          <RButton size="lg">Large</RButton>
        </div>
      </section>

      <section class="section">
        <h2>Form controls</h2>
        <div class="stack">
          <label class="field-label" for="pg-name">Name</label>
          <input
            id="pg-name"
            v-model="name"
            class="native-input"
            placeholder="Ada Lovelace"
          />
          <RInput
            v-model="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            hint="We never share your email."
            :error="email && !email.includes('@') ? 'Enter a valid email' : undefined"
          />
          <RTextarea
            v-model="bio"
            label="Bio"
            placeholder="Tell us about yourself…"
            :rows="3"
          />
          <RSwitch v-model="switchOn" label="Email notifications" />
        </div>
      </section>

      <section class="section">
        <h2>Badges & alerts</h2>
        <div class="row wrap badges">
          <RBadge>Neutral</RBadge>
          <RBadge variant="primary" dot>Primary</RBadge>
          <RBadge variant="success">Success</RBadge>
          <RBadge variant="warning">Warning</RBadge>
          <RBadge variant="danger">Danger</RBadge>
        </div>
        <div class="stack">
          <RAlert title="Heads up">
            This design system ships with semantic tokens out of the box.
          </RAlert>
          <RAlert variant="success" title="All good">
            Your changes have been saved.
          </RAlert>
        </div>
      </section>

      <section class="section">
        <h2>Cards & avatars</h2>
        <RCard title="Team plan" hoverable>
          Everything you need to ship accessible products faster.
          <template #footer>
            <RButton variant="ghost" size="sm">Not now</RButton>
            <RButton size="sm">Upgrade</RButton>
          </template>
        </RCard>
        <div class="row avatars">
          <RAvatar name="Ada Lovelace" />
          <RAvatar name="Grace Hopper" size="lg" />
          <RAvatar src="https://i.pravatar.cc/96?img=5" alt="User avatar" />
        </div>
      </section>

      <section class="section full center">
        <h2>Modal</h2>
        <div class="row">
          <RSpinner />
          <RButton variant="secondary" @click="modalOpen = true">
            Open modal
          </RButton>
        </div>
        <RModal
          v-model="modalOpen"
          title="Confirm upgrade"
          size="sm"
        >
          <p>You are about to upgrade your workspace to the Team plan.</p>
          <template #footer>
            <RButton variant="ghost" @click="modalOpen = false">Cancel</RButton>
            <RButton @click="submitDemo">Confirm</RButton>
          </template>
        </RModal>
      </section>
    </main>
  </div>
</template>

<style scoped>
.page {
  max-width: 64rem;
  margin-inline: auto;
  padding: var(--r-space-10) var(--r-space-6) var(--r-space-24);
}

.header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--r-space-4);
  margin-bottom: var(--r-space-10);
}

.brand {
  font-size: var(--r-font-size-3xl);
  font-weight: var(--r-font-weight-bold);
  letter-spacing: -0.02em;
  color: var(--r-color-text-primary);
}

.tagline {
  margin-top: var(--r-space-1);
  color: var(--r-color-text-secondary);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--r-space-3);
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--r-space-8);
}

.section.full {
  grid-column: 1 / -1;
}

.section h2 {
  font-size: var(--r-font-size-sm);
  font-weight: var(--r-font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--r-color-text-muted);
  margin-bottom: var(--r-space-4);
}

.row {
  display: flex;
  align-items: center;
  gap: var(--r-space-3);
}

.wrap {
  flex-wrap: wrap;
}

.stack {
  display: flex;
  flex-direction: column;
  gap: var(--r-space-4);
}

.badges {
  margin-bottom: var(--r-space-4);
}

.avatars {
  margin-top: var(--r-space-4);
}

.center {
  text-align: center;
}

.center .row {
  justify-content: center;
}

.field-label {
  font-size: var(--r-font-size-sm);
  font-weight: var(--r-font-weight-medium);
  color: var(--r-color-text-primary);
}

.native-input {
  padding: var(--r-space-2) var(--r-space-3);
  border: 1px solid var(--r-color-border-strong);
  border-radius: var(--r-radius-md);
  background: var(--r-color-bg-surface);
}

@media (max-width: 48rem) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
