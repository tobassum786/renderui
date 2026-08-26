<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  useTheme,
  RBadge,
  RButton,
  RCard,
  RInput,
  RTextarea,
  RSelect,
  RCheckbox,
  RSwitch,
  RAlert,
  RModal,
  RSpinner,
  RProgress,
  RSkeleton,
  RTabs,
  RTooltip,
  RAvatar
} from '../src'

const { resolvedTheme, toggleTheme, theme, setTheme } = useTheme()

// Modal states
const modalOpen = ref(false)
const formModalOpen = ref(false)
const deleteModalOpen = ref(false)
const asyncModalOpen = ref(false)
const showDocs = ref(false)

// Form states
const switchOn = ref(true)
const notifications = ref(true)
const plan = ref('pro')
const country = ref('us')
const name = ref('')
const email = ref('')
const bio = ref('')
const agree = ref(false)
const asyncProcessing = ref(false)

// Progress
const progress = ref(12)
const uploadProgress = ref(0)

// Tabs
const activeTab = ref('dashboard')

// Select options
const planOptions = [
  { label: 'Free', value: 'free' },
  { label: 'Pro', value: 'pro' },
  { label: 'Team', value: 'team' },
  { label: 'Enterprise', value: 'enterprise', disabled: true }
]

const countryOptions = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
  { label: 'Japan', value: 'jp' }
]

// Simulate progress
const progressTimer = ref<number | null>(null)
const startProgress = () => {
  progress.value = 0
  progressTimer.value = window.setInterval(() => {
    progress.value = Math.min(100, progress.value + Math.random() * 15)
    if (progress.value >= 100 && progressTimer.value) clearInterval(progressTimer.value)
  }, 300)
}

// Simulate upload
const uploadTimer = ref<number | null>(null)
const startUpload = () => {
  uploadProgress.value = 0
  uploadTimer.value = window.setInterval(() => {
    uploadProgress.value = Math.min(100, uploadProgress.value + Math.random() * 10)
    if (uploadProgress.value >= 100 && uploadTimer.value) clearInterval(uploadTimer.value)
  }, 200)
}

// Async modal
const processAsync = async () => {
  asyncProcessing.value = true
  await new Promise(r => setTimeout(r, 2000))
  asyncProcessing.value = false
  asyncModalOpen.value = false
}

function submitDemo(): void {
  modalOpen.value = false
}

function resetForms() {
  name.value = ''
  email.value = ''
  bio.value = ''
  plan.value = 'pro'
  switchOn.value = true
  notifications.value = true
  agree.value = false
}

// Theme customization functions
const setCustomTheme = (color: string) => {
  const themes: Record<string, Record<string, string>> = {
    indigo: {
      '--r-color-brand-50': '#eef2ff',
      '--r-color-brand-100': '#e0e7ff',
      '--r-color-brand-200': '#c7d2fe',
      '--r-color-brand-300': '#a5b4fc',
      '--r-color-brand-400': '#818cf8',
      '--r-color-brand-500': '#6366f1',
      '--r-color-brand-600': '#4f46e5',
      '--r-color-brand-700': '#4338ca',
      '--r-color-brand-800': '#3730a3',
      '--r-color-brand-900': '#312e81',
    },
    emerald: {
      '--r-color-brand-50': '#ecfdf5',
      '--r-color-brand-100': '#d1fae5',
      '--r-color-brand-200': '#a7f3d0',
      '--r-color-brand-300': '#6ee7b7',
      '--r-color-brand-400': '#34d399',
      '--r-color-brand-500': '#10b981',
      '--r-color-brand-600': '#059669',
      '--r-color-brand-700': '#047857',
      '--r-color-brand-800': '#065f46',
      '--r-color-brand-900': '#064e3b',
    },
    violet: {
      '--r-color-brand-50': '#f5f3ff',
      '--r-color-brand-100': '#ede9fe',
      '--r-color-brand-200': '#ddd6fe',
      '--r-color-brand-300': '#c4b5fd',
      '--r-color-brand-400': '#a78bfa',
      '--r-color-brand-500': '#8b5cf6',
      '--r-color-brand-600': '#7c3aed',
      '--r-color-brand-700': '#6d28d9',
      '--r-color-brand-800': '#5b21b6',
      '--r-color-brand-900': '#4c1d95',
    },
    rose: {
      '--r-color-brand-50': '#fff1f2',
      '--r-color-brand-100': '#ffe4e6',
      '--r-color-brand-200': '#fecdd3',
      '--r-color-brand-300': '#fda4af',
      '--r-color-brand-400': '#fb7185',
      '--r-color-brand-500': '#f43f5e',
      '--r-color-brand-600': '#e11d48',
      '--r-color-brand-700': '#be123c',
      '--r-color-brand-800': '#9f1239',
      '--r-color-brand-900': '#881337',
    },
    amber: {
      '--r-color-brand-50': '#fffbeb',
      '--r-color-brand-100': '#fef3c7',
      '--r-color-brand-200': '#fde68a',
      '--r-color-brand-300': '#fcd34d',
      '--r-color-brand-400': '#fbbf24',
      '--r-color-brand-500': '#f59e0b',
      '--r-color-brand-600': '#d97706',
      '--r-color-brand-700': '#b45309',
      '--r-color-brand-800': '#92400e',
      '--r-color-brand-900': '#78350f',
    }
  }

  const root = document.documentElement
  Object.entries(themes[color]).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })
}

const resetCustomTheme = () => {
  const root = document.documentElement
  const keys = [
    '--r-color-brand-50', '--r-color-brand-100', '--r-color-brand-200',
    '--r-color-brand-300', '--r-color-brand-400', '--r-color-brand-500',
    '--r-color-brand-600', '--r-color-brand-700', '--r-color-brand-800',
    '--r-color-brand-900'
  ]
  keys.forEach(key => root.style.removeProperty(key))
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
        <RSelect v-model="theme" :options="[
          { label: 'Light', value: 'light' },
          { label: 'Dark', value: 'dark' },
          { label: 'System', value: 'system' }
        ]" placeholder="Theme" class="theme-select" />
        <RButton variant="secondary" @click="toggleTheme">
          Toggle
        </RButton>
        <RButton variant="ghost" @click="showDocs = true">
          <template #icon>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          </template>
          Docs
        </RButton>
      </div>
    </header>

    <main class="grid">
      <!-- Buttons Section -->
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
          <RButton block class="w-48">Block</RButton>
        </div>
        <div class="row wrap mt-4">
          <RButton variant="secondary">
            <template #icon>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            </template>
            Add Item
          </RButton>
          <RButton variant="ghost">
            Continue
            <template #icon-right>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </template>
          </RButton>
        </div>
      </section>

      <!-- Form Controls Section -->
      <section class="section">
        <h2>Form Controls</h2>
        <div class="stack">
          <RInput
            v-model="name"
            label="Full Name"
            placeholder="Ada Lovelace"
            hint="Your display name"
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
            hint="Max 500 characters"
          />
          <RSelect
            v-model="plan"
            label="Plan"
            :options="planOptions"
            hint="Change anytime."
          />
          <RSelect
            v-model="country"
            label="Country"
            :options="countryOptions"
            placeholder="Select country"
            searchable
          />
          <div class="pair">
            <RCheckbox v-model="agree" label="I agree to the terms" />
            <RSwitch v-model="notifications" label="Email notifications" />
          </div>
          <RSwitch v-model="switchOn" label="Dark mode sync" />
        </div>
      </section>

      <!-- Badges & Alerts -->
      <section class="section">
        <h2>Badges & Alerts</h2>
        <div class="row wrap badges">
          <RBadge>Neutral</RBadge>
          <RBadge variant="primary" dot>Primary</RBadge>
          <RBadge variant="success">Success</RBadge>
          <RBadge variant="warning">Warning</RBadge>
          <RBadge variant="danger">Danger</RBadge>
          <RBadge variant="primary" size="sm">Small</RBadge>
        </div>
        <div class="stack">
          <RAlert title="Information">
            This design system ships with semantic tokens out of the box.
          </RAlert>
          <RAlert variant="success" title="Success">
            Your changes have been saved successfully.
          </RAlert>
          <RAlert variant="warning" title="Warning">
            You're approaching your storage limit (85% used).
          </RAlert>
          <RAlert variant="danger" title="Error" dismissible>
            Failed to sync. Check your connection and try again.
          </RAlert>
        </div>
      </section>

      <!-- Cards & Avatars -->
      <section class="section">
        <h2>Cards & Avatars</h2>
        <RCard title="Team Plan" hoverable>
          Everything you need to ship accessible products faster.
          <template #footer>
            <RButton variant="ghost" size="sm">Not now</RButton>
            <RButton size="sm">Upgrade</RButton>
          </template>
        </RCard>
        <RCard flat title="Flat Card" class="mt-4">
          No elevation — great for dense layouts or nested cards.
        </RCard>
        <div class="row avatars">
          <RAvatar name="Ada Lovelace" />
          <RAvatar name="Grace Hopper" size="lg" />
          <RAvatar src="https://i.pravatar.cc/96?img=5" alt="User avatar" />
          <RAvatar name="Alan Turing" size="xl" />
        </div>
      </section>

      <!-- Feedback Components -->
      <section class="section">
        <h2>Feedback</h2>
        <div class="stack">
          <div class="row wrap">
            <RSpinner />
            <RSpinner size="lg" />
            <RSpinner variant="secondary" />
            <RSpinner variant="white" />
          </div>
          <div class="stack tight">
            <RProgress :value="progress" label="Build in progress" show-value />
            <div class="row wrap">
              <RButton size="sm" variant="secondary" @click="startProgress">Restart</RButton>
              <RButton size="sm" variant="ghost" @click="progress = 0">Reset</RButton>
            </div>
            <RProgress :value="64" variant="success" size="sm" label="Tests passing" />
            <RProgress :value="88" variant="warning" size="sm" label="Coverage" />
            <RProgress :value="100" variant="danger" size="sm" label="Errors" />
            <RProgress indeterminate variant="accent" label="Indeterminate" />
          </div>
          <div class="stack tight">
            <RSkeleton variant="text" width="85%" />
            <RSkeleton variant="text" width="60%" />
            <RSkeleton variant="rect" height="80px" width="100%" />
            <RSkeleton variant="circle" width="48" height="48" />
          </div>
        </div>
      </section>

      <!-- Tabs & Tooltip -->
      <section class="section">
        <h2>Tabs & Tooltip</h2>
        <RTabs v-model="activeTab" :tabs="[
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'analytics', label: 'Analytics' },
          { id: 'settings', label: 'Settings' }
        ]">
          <template #panel-dashboard>
            <p class="tab-content">Dashboard overview with key metrics and quick actions.</p>
            <div class="row wrap mt-4">
              <RButton variant="secondary">Refresh</RButton>
              <RButton>Export</RButton>
            </div>
          </template>
          <template #panel-analytics>
            <p class="tab-content">Analytics charts and detailed reporting goes here.</p>
            <RProgress :value="75" label="Conversion rate" class="mt-4" />
          </template>
          <template #panel-settings>
            <p class="tab-content">Manage your preferences and account settings.</p>
            <RSwitch label="Enable notifications" class="mt-4" />
          </template>
        </RTabs>
        <div class="row wrap tip-row mt-4">
          <RTooltip content="Pure CSS positioning — zero dependencies.">
            <RBadge variant="primary" dot>Hover me</RBadge>
          </RTooltip>
          <RTooltip content="Keyboard focus works too." placement="bottom">
            <RBadge>Focus me</RBadge>
          </RTooltip>
          <RTooltip content="Top placement (default)." placement="top">
            <RButton variant="ghost" size="sm">Top</RButton>
          </RTooltip>
          <RTooltip content="Right side placement." placement="right">
            <RButton variant="ghost" size="sm">Right</RButton>
          </RTooltip>
          <RTooltip content="Left side placement." placement="left">
            <RButton variant="ghost" size="sm">Left</RButton>
          </RTooltip>
        </div>
      </section>

      <!-- Progress & Modals -->
      <section class="section full">
        <h2>Progress & Modals</h2>
        <div class="split">
          <div class="stack tight grow">
            <RProgress :value="uploadProgress" label="Uploading files…" show-value />
            <div class="row wrap">
              <RButton variant="secondary" @click="startUpload">Start Upload</RButton>
              <RButton variant="ghost" @click="uploadProgress = 0">Reset</RButton>
            </div>
            <RProgress :value="45" variant="accent" size="sm" label="Processing" />
            <RProgress :value="72" variant="success" size="sm" label="Validating" />
          </div>
          <div class="modal-demo">
            <RButton variant="secondary" @click="modalOpen = true">Basic Modal</RButton>
            <RButton variant="ghost" class="mt-2" @click="formModalOpen = true">Form Modal</RButton>
            <RButton variant="danger" class="mt-2" @click="deleteModalOpen = true">Confirm Delete</RButton>
            <RButton variant="primary" class="mt-2" @click="asyncModalOpen = true">Async Action</RButton>
          </div>
        </div>
      </section>

      <!-- Modals -->
      <RModal v-model="modalOpen" title="Confirm Upgrade" size="sm">
        <p>You are about to upgrade your workspace to the Team plan.</p>
        <template #footer>
          <RButton variant="ghost" @click="modalOpen = false">Cancel</RButton>
          <RButton @click="submitDemo">Confirm</RButton>
        </template>
      </RModal>

      <RModal v-model="formModalOpen" title="Edit Profile" size="md">
        <form class="space-y-4">
          <RInput v-model="name" label="Full Name" />
          <RInput v-model="email" label="Email" type="email" />
          <RTextarea v-model="bio" label="Bio" :rows="3" />
        </form>
        <template #footer>
          <RButton variant="ghost" @click="formModalOpen = false">Cancel</RButton>
          <RButton @click="formModalOpen = false">Save Changes</RButton>
        </template>
      </RModal>

      <RModal v-model="deleteModalOpen" title="Delete Project?" size="sm">
        <div class="flex items-start gap-3">
          <svg class="w-6 h-6 text-danger mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
          </svg>
          <p>This action cannot be undone. All data associated with "Acme Project" will be permanently deleted.</p>
        </div>
        <template #footer>
          <RButton variant="ghost" @click="deleteModalOpen = false">Cancel</RButton>
          <RButton variant="danger" @click="deleteModalOpen = false">Delete permanently</RButton>
        </template>
      </RModal>

      <RModal v-model="asyncModalOpen" title="Processing" size="sm">
        <div v-if="!asyncProcessing" class="text-center py-4">
          <p>This action will process your data. Continue?</p>
        </div>
        <div v-else class="flex flex-col items-center gap-4 py-4">
          <RSpinner size="lg" />
          <p>Processing… please don't close this window.</p>
        </div>
        <template #footer>
          <RButton v-if="!asyncProcessing" variant="ghost" @click="asyncModalOpen = false">Cancel</RButton>
          <RButton v-if="!asyncProcessing" @click="processAsync">Confirm</RButton>
          <RButton v-else variant="ghost" disabled>Processing…</RButton>
        </template>
      </RModal>

      <!-- Theme Customization Demo -->
      <section class="section full">
        <h2>Token Customization Demo</h2>
        <p class="text-secondary mb-4">Try changing the brand color via CSS custom properties:</p>
        <div class="row wrap">
          <RButton @click="setCustomTheme('indigo')">Indigo (Default)</RButton>
          <RButton @click="setCustomTheme('emerald')">Emerald</RButton>
          <RButton @click="setCustomTheme('violet')">Violet</RButton>
          <RButton @click="setCustomTheme('rose')">Rose</RButton>
          <RButton @click="setCustomTheme('amber')">Amber</RButton>
          <RButton @click="resetCustomTheme">Reset</RButton>
        </div>
        <div class="demo-surface mt-4 p-4">
          <div class="row wrap">
            <RButton>Primary</RButton>
            <RButton variant="secondary">Secondary</RButton>
            <RButton variant="ghost">Ghost</RButton>
            <RButton variant="danger">Danger</RButton>
          </div>
          <RCard class="mt-4" title="Themed Card">
            This card uses the same semantic tokens. Changing the brand primitive updates everything.
          </RCard>
          <RAlert variant="info" title="Themed Alert" class="mt-4">
            Alerts also adapt to the brand color automatically.
          </RAlert>
        </div>
      </section>

      <!-- Code Snippets -->
      <section class="section full">
        <h2>Quick Reference</h2>
        <div class="demo-grid">
          <RCard title="Installation" flat>
            <pre class="code-block"><code>npm install renderui</code></pre>
            <pre class="code-block"><code>import { RenderUI } from 'renderui'
import 'renderui/styles.css'

createApp(App).use(RenderUI).mount('#app')</code></pre>
          </RCard>
          <RCard title="Cherry-pick" flat>
            <pre class="code-block"><code>import { RButton, RModal, useTheme } from 'renderui'
import 'renderui/styles.css'</code></pre>
          </RCard>
          <RCard title="Theming" flat>
            <pre class="code-block"><code>:root {
  --r-color-brand-500: #0ea5e9;
  --r-color-brand-600: #0284c7;
}</code></pre>
          </RCard>
          <RCard title="Custom Button" flat>
            <pre class="code-block"><code>:root {
  --r-button-radius: var(--r-radius-full);
  --r-button-bg: var(--r-color-success-600);
}</code></pre>
          </RCard>
        </div>
      </section>
    </main>
  </div>

  <!-- Documentation Modal -->
  <RModal v-model="showDocs" title="Documentation" size="lg" :hide-close="true">
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <svg class="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          </div>
          <div>
            <h3 class="font-semibold">RenderUI Documentation</h3>
            <p class="text-sm text-muted-color">Complete guides, API reference & examples</p>
          </div>
        </div>
        <a href="https://github.com/tobassum786/renderui" target="_blank" rel="noopener" class="text-muted-color hover:text-primary transition-colors" title="GitHub">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
        </a>
      </div>
    </template>
    <div class="docs-content">
      <nav class="docs-nav">
        <div class="docs-section">
          <h4 class="docs-section-title">Getting Started</h4>
          <ul class="docs-links">
            <li><a href="/guide/getting-started" target="_blank" rel="noopener">Installation & Quick Start</a></li>
            <li><a href="/guide/theming" target="_blank" rel="noopener">Theming & Tokens</a></li>
            <li><a href="/guide/integrations" target="_blank" rel="noopener">Framework Integrations</a></li>
            <li><a href="/guide/migration" target="_blank" rel="noopener">Migration Guide</a></li>
          </ul>
        </div>
        <div class="docs-section">
          <h4 class="docs-section-title">Components</h4>
          <ul class="docs-links">
            <li><a href="/components/button" target="_blank" rel="noopener">Button</a></li>
            <li><a href="/components/card" target="_blank" rel="noopener">Card</a></li>
            <li><a href="/components/badge" target="_blank" rel="noopener">Badge</a></li>
            <li><a href="/components/avatar" target="_blank" rel="noopener">Avatar</a></li>
            <li><a href="/components/input" target="_blank" rel="noopener">Input</a></li>
            <li><a href="/components/textarea" target="_blank" rel="noopener">Textarea</a></li>
            <li><a href="/components/select" target="_blank" rel="noopener">Select</a></li>
            <li><a href="/components/checkbox" target="_blank" rel="noopener">Checkbox</a></li>
            <li><a href="/components/switch" target="_blank" rel="noopener">Switch</a></li>
            <li><a href="/components/alert" target="_blank" rel="noopener">Alert</a></li>
            <li><a href="/components/modal" target="_blank" rel="noopener">Modal</a></li>
            <li><a href="/components/spinner" target="_blank" rel="noopener">Spinner</a></li>
            <li><a href="/components/progress" target="_blank" rel="noopener">Progress</a></li>
            <li><a href="/components/skeleton" target="_blank" rel="noopener">Skeleton</a></li>
            <li><a href="/components/tabs" target="_blank" rel="noopener">Tabs</a></li>
            <li><a href="/components/tooltip" target="_blank" rel="noopener">Tooltip</a></li>
          </ul>
        </div>
        <div class="docs-section">
          <h4 class="docs-section-title">Reference</h4>
          <ul class="docs-links">
            <li><a href="/reference/api" target="_blank" rel="noopener">API Reference</a></li>
          </ul>
        </div>
      </nav>
      <div class="docs-actions">
        <RButton variant="secondary" @click="showDocs = false">Close</RButton>
        <a href="https://tobassum786.github.io/renderui/" target="_blank" rel="noopener">
          <RButton>Open Full Docs Site</RButton>
        </a>
      </div>
    </div>
  </RModal>
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
  flex-wrap: wrap;
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
  flex-wrap: wrap;
}

.theme-select {
  min-width: 120px;
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

.stack.tight {
  gap: var(--r-space-3);
}

.pair {
  display: flex;
  align-items: center;
  gap: var(--r-space-3);
  flex-wrap: wrap;
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

.tab-content {
  font-size: var(--r-font-size-sm);
  color: var(--r-color-text-secondary);
  padding-block: 0.5rem;
}

.tip-row {
  margin-top: 1rem;
  cursor: default;
}

.split {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.grow {
  flex: 1;
  min-width: 0;
}

.modal-demo {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: var(--r-space-3);
  min-width: 200px;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--r-space-6);
  margin-top: var(--r-space-6);
}

.demo-surface {
  border: 1px solid var(--r-color-border-subtle);
  border-radius: var(--r-radius-lg);
  background: var(--r-color-bg-surface);
  padding: var(--r-space-4);
}

.code-block {
  margin: 0;
  padding: var(--r-space-3);
  background: var(--r-color-bg-sunken);
  border-radius: var(--r-radius-md);
  overflow-x: auto;
  font-size: var(--r-font-size-xs);
  line-height: var(--r-line-height-relaxed);
}

.code-block code {
  font-family: var(--r-font-mono);
  color: var(--r-color-text-primary);
}

.mt-4 { margin-top: var(--r-space-4); }
.w-48 { width: 12rem; }

@media (max-width: 48rem) {
  .grid {
    grid-template-columns: 1fr;
  }
  .split {
    flex-direction: column;
    align-items: stretch;
  }
  .modal-demo {
    flex-direction: row;
    flex-wrap: wrap;
  }
}

.docs-content {
  padding: var(--r-space-2) 0;
}

.docs-nav {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--r-space-6);
  margin-bottom: var(--r-space-6);
}

.docs-section-title {
  font-size: var(--r-font-size-sm);
  font-weight: var(--r-font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--r-color-text-muted);
  margin-bottom: var(--r-space-3);
}

.docs-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--r-space-2);
}

.docs-links a {
  display: block;
  padding: var(--r-space-2) var(--r-space-3);
  border-radius: var(--r-radius-md);
  color: var(--r-color-text-secondary);
  text-decoration: none;
  font-size: var(--r-font-size-sm);
  transition: background-color var(--r-duration-fast) var(--r-ease-out), color var(--r-duration-fast) var(--r-ease-out);
}

.docs-links a:hover {
  background: var(--r-color-bg-sunken);
  color: var(--r-color-text-primary);
}

.docs-actions {
  display: flex;
  gap: var(--r-space-3);
  justify-content: flex-end;
  padding-top: var(--r-space-4);
  border-top: 1px solid var(--r-color-border-subtle);
}
</style>