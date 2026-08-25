<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const copied = ref(false)
const showModal = ref(false)
const activeTab = ref('preview')
const notifications = ref(true)
const plan = ref('pro')
const email = ref('')
const progress = ref(12)

let timer
onMounted(() => {
  timer = setInterval(() => {
    progress.value = progress.value >= 100 ? 8 : progress.value + 3
  }, 700)
})
onUnmounted(() => clearInterval(timer))

async function copyInstall() {
  try {
    await navigator.clipboard.writeText('npm install renderui')
    copied.value = true
    setTimeout(() => (copied.value = false), 1600)
  } catch {}
}
</script>

<template>
<div class="landing">

  <!-- ============================== HERO ============================== -->
  <section class="hero">
    <div class="wrap">
      <a class="pill" href="/guide/theming">
        <span class="pill-dot" /> v0.1 · design tokens + dark mode
      </a>

      <h1 class="title">
        Design once.<br />
        <span class="gradient">Theme everywhere.</span>
      </h1>

      <p class="sub">
        RenderUI is a Vue 3 design system built on three-layer CSS tokens and
        CSS Modules — accessible components with dark mode baked in, shipped as
        tree-shakeable ESM.
      </p>

      <div class="cta-row">
        <a class="btn-primary" href="/guide/getting-started">Get started</a>
        <a class="btn-ghost" href="#components">Browse components</a>
      </div>

      <button class="install" type="button" @click="copyInstall">
        <span class="prompt">$</span> npm install renderui
        <span class="copy-hint">{{ copied ? 'copied ✓' : 'click to copy' }}</span>
      </button>

      <div class="stats">
        <div class="stat"><strong>16</strong><span>components</span></div>
        <div class="stat"><strong>51</strong><span>unit tests</span></div>
        <div class="stat"><strong>~10 kB</strong><span>gzipped ESM</span></div>
        <div class="stat"><strong>0</strong><span>runtime deps</span></div>
      </div>
    </div>
  </section>

  <!-- ============================ SHOWCASE ============================ -->
  <section id="components" class="showcase">
    <div class="wrap">
      <h2 class="section-title">Every component. Live.</h2>
      <p class="section-sub">
        No screenshots — everything below is the real library running in this page.
        Toggle dark mode in the navbar and watch it re-theme instantly.
      </p>

      <div class="bento">
        <!-- Forms -->
        <article class="card span-2">
          <header><h3>Form controls</h3><p>Labels, hints & errors wired for ARIA.</p></header>
          <div class="stack">
            <RInput v-model="email" label="Email" placeholder="you@example.com"
              :error="email && !email.includes('@') ? 'Enter a valid email' : undefined" />
            <RSelect v-model="plan" label="Plan" hint="Change anytime."
              :options="[
                { label: 'Free', value: 'free' },
                { label: 'Pro', value: 'pro' },
                { label: 'Enterprise', value: 'ent', disabled: true },
              ]" />
            <div class="pair">
              <RCheckbox v-model="notifications" label="Notifications" />
              <RSwitch label="Auto-sync" />
            </div>
          </div>
        </article>

        <!-- Buttons -->
        <article class="card">
          <header><h3>Buttons</h3><p>Four variants × three sizes.</p></header>
          <div class="rows">
            <div class="pair wrap-row">
              <RButton>Primary</RButton>
              <RButton variant="secondary">Secondary</RButton>
            </div>
            <div class="pair wrap-row">
              <RButton variant="ghost">Ghost</RButton>
              <RButton variant="danger">Danger</RButton>
            </div>
            <div class="pair wrap-row">
              <RButton size="sm">Small</RButton>
              <RButton loading>Loading</RButton>
            </div>
          </div>
        </article>

        <!-- Feedback -->
        <article class="card">
          <header><h3>Feedback</h3><p>Alerts, spinners, skeletons.</p></header>
          <div class="stack tight">
            <RAlert variant="success" title="Deployed">Build #42 is live.</RAlert>
            <RAlert variant="warning" title="Quota at 92%">
              Consider upgrading storage.
            </RAlert>
            <div class="pair center-row">
              <RSpinner size="lg" />
              <RAvatar name="Ada Lovelace" />
              <RAvatar name="Grace Hopper" />
              <RAvatar src="https://i.pravatar.cc/96?img=5" alt="Member" />
            </div>
            <RSkeleton variant="text" width="85%" />
            <RSkeleton variant="text" width="60%" />
          </div>
        </article>

        <!-- Tabs + tooltip -->
        <article class="card">
          <header><h3>Tabs & tooltips</h3><p>Keyboard navigable.</p></header>
          <RTabs v-model="activeTab" :tabs="[
            { id: 'preview', label: 'Preview' },
            { id: 'code', label: 'Code' },
          ]">
            <template #panel-preview>
              <p class="tab-text">Panels keep their state while you switch.</p>
            </template>
            <template #panel-code>
              <p class="tab-text"><code>&lt;RTabs&gt;</code> roves focus with arrow keys.</p>
            </template>
          </RTabs>
          <div class="pair center-row tip-row">
            <RTooltip content="Pure CSS positioning — zero dependencies.">
              <RBadge variant="primary" dot>Hover me</RBadge>
            </RTooltip>
            <RTooltip content="Keyboard focus works too." placement="bottom">
              <RBadge>Focus me</RBadge>
            </RTooltip>
          </div>
        </article>

        <!-- Progress + modal -->
        <article class="card span-2">
          <header><h3>Progress & overlays</h3><p>Determinate bars, teleporting dialogs.</p></header>
          <div class="split">
            <div class="stack tight grow">
              <RProgress :value="progress" label="Streaming build…" show-value />
              <RProgress :value="64" variant="success" size="sm" />
              <RProgress :value="88" variant="warning" size="sm" />
            </div>
            <div class="modal-demo">
              <RButton variant="secondary" @click="showModal = true">Open modal</RButton>
              <RModal v-model="showModal" title="Welcome to RenderUI" size="sm">
                Focus is trapped-ish: Esc closes, backdrop closes, scroll locks,
                focus returns to the trigger on close.
                <template #footer>
                  <RButton variant="ghost" @click="showModal = false">Close</RButton>
                  <RButton @click="showModal = false">Nice</RButton>
                </template>
              </RModal>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- ============================= TOKENS ============================= -->
  <section class="tokens">
    <div class="wrap narrow">
      <h2 class="section-title">Tokens are the API</h2>
      <p class="section-sub">
        Semantic roles map to primitive scales once per theme. Components read
        variables — never literals — so one attribute re-themes everything.
      </p>
      <div class="swatches">
        <div v-for="c in ['50', '300', '500', '600', '700']" :key="c" class="swatch-col">
          <span class="dot" :style="{ background: `var(--r-color-brand-${c})` }" />
          <small>brand-{{ c }}</small>
        </div>
      </div>
      <div class="chips">
        <code>--r-space-4 → 1rem</code>
        <code>--r-radius-lg → .75rem</code>
        <code>--r-duration-base → 200ms</code>
        <code>--r-shadow-md → …</code>
      </div>
    </div>
  </section>

  <!-- ============================ FEATURES ============================ -->
  <section class="features-band">
    <div class="wrap">
      <div class="features">
        <div class="feature"><span class="ico">🎨</span><h3>Three-layer tokens</h3><p>Primitives → semantic roles → per-component overrides. Rebrand from one file.</p></div>
        <div class="feature"><span class="ico">🌗</span><h3>Dark mode built-in</h3><p><code>useTheme()</code> tracks system preference, persists choice, flips instantly.</p></div>
        <div class="feature"><span class="ico">♿</span><h3>Accessible by default</h3><p>ARIA wiring, focus-visible rings, keyboard operation, reduced-motion support.</p></div>
        <div class="feature"><span class="ico">📦</span><h3>Zero lock-in</h3><p>CSS Modules compile away; Vue is the only dependency; import per-component.</p></div>
      </div>
    </div>
  </section>

  <!-- =============================== CTA =============================== -->
  <section class="final-cta">
    <div class="wrap narrow">
      <h2>Ship your next UI in hours, not weeks.</h2>
      <div class="cta-row centered">
        <a class="btn-primary" href="/guide/getting-started">Read the guide</a>
        <a class="btn-ghost" href="https://github.com/tobassum786/renderui">Star on GitHub</a>
      </div>
    </div>
  </section>

</div>
</template>

<style scoped>
.landing {
  margin-top: calc(var(--vp-nav-height) * -1);
}

.wrap {
  max-width: 1120px;
  margin-inline: auto;
  padding-inline: clamp(1rem, 4vw, 2.5rem);
}

.wrap.narrow {
  max-width: 720px;
  text-align: center;
}

/* Hero ------------------------------------------------------------- */
.hero {
  padding-block: clamp(5rem, 12vw, 9rem) clamp(3rem, 7vw, 5rem);
  background:
    radial-gradient(60% 80% at 70% 0%, color-mix(in srgb, var(--r-color-brand-500) 16%, transparent), transparent),
    radial-gradient(40% 60% at 15% 20%, color-mix(in srgb, var(--r-color-info-500) 10%, transparent), transparent);
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.9rem;
  border-radius: var(--r-radius-full);
  border: 1px solid var(--r-color-border-subtle);
  background: var(--r-color-bg-surface);
  font-size: var(--r-font-size-xs);
  font-weight: var(--r-font-weight-medium);
  color: var(--r-color-text-secondary);
  text-decoration: none;
  transition: border-color var(--r-duration-fast) var(--r-ease-out);
}

.pill:hover { border-color: var(--r-color-accent); }

.pill-dot {
  width: 0.45rem;
  height: 0.45rem;
  border-radius: var(--r-radius-full);
  background: var(--r-color-success);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--r-color-success) 25%, transparent);
}

.title {
  margin-top: 1.25rem;
  font-size: clamp(2.6rem, 6.5vw, 4.4rem);
  line-height: 1.05;
  letter-spacing: -0.03em;
  font-weight: var(--r-font-weight-bold);
  color: var(--r-color-text-primary);
}

.gradient {
  background: linear-gradient(92deg, var(--r-color-brand-500), var(--r-color-info-500));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.sub {
  margin-top: 1.25rem;
  max-width: 34rem;
  font-size: var(--r-font-size-lg);
  line-height: var(--r-line-height-relaxed);
  color: var(--r-color-text-secondary);
}

.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2rem;
}

.cta-row.centered { justify-content: center; }

.btn-primary,
.btn-ghost {
  display: inline-flex;
  align-items: center;
  height: 2.75rem;
  padding-inline: 1.5rem;
  border-radius: var(--r-radius-md);
  font-weight: var(--r-font-weight-semibold);
  font-size: var(--r-font-size-sm);
  text-decoration: none;
  transition:
    transform var(--r-duration-fast) var(--r-ease-out),
    background-color var(--r-duration-fast) var(--r-ease-out),
    border-color var(--r-duration-fast) var(--r-ease-out);
}

.btn-primary {
  background: linear-gradient(135deg, var(--r-color-brand-600), var(--r-color-brand-500));
  color: #fff;
  box-shadow: var(--r-shadow-md);
}

.btn-primary:hover { transform: translateY(-1px); }

.btn-ghost {
  border: 1px solid var(--r-color-border-strong);
  color: var(--r-color-text-primary);
  background: var(--r-color-bg-surface);
}

.btn-ghost:hover { border-color: var(--r-color-accent); }

.install {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 1.5rem;
  padding: 0.65rem 1rem;
  border: 1px dashed var(--r-color-border-strong);
  border-radius: var(--r-radius-md);
  background: var(--r-color-bg-surface);
  font-family: var(--r-font-mono);
  font-size: var(--r-font-size-sm);
  color: var(--r-color-text-primary);
  cursor: copy;
  transition: border-color var(--r-duration-fast) var(--r-ease-out);
}

.install:hover { border-color: var(--r-color-accent); }
.prompt { color: var(--r-color-accent); user-select: none; }
.copy-hint {
  margin-left: auto;
  font-family: var(--r-font-sans);
  font-size: var(--r-font-size-xs);
  color: var(--r-color-text-muted);
}

.stats {
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
  margin-top: 3rem;
}

.stats .stat strong { display:block; font-size: var(--r-font-size-2xl); font-weight: var(--r-font-weight-bold); color: var(--r-color-text-primary); }
.stats .stat span { font-size: var(--r-font-size-xs); color: var(--r-color-text-muted); }

/* Sections ---------------------------------------------------------- */
.section-title {
  font-size: var(--r-font-size-3xl);
  letter-spacing: -0.02em;
  font-weight: var(--r-font-weight-bold);
  color: var(--r-color-text-primary);
}

.section-sub {
  margin-top: 0.75rem;
  max-width: 38rem;
  color: var(--r-color-text-secondary);
  line-height: var(--r-line-height-relaxed);
}

.showcase { padding-block: clamp(3rem, 7vw, 5rem); }

.bento {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem;
  margin-top: 2.5rem;
}

.card {
  border: 1px solid var(--r-color-border-subtle);
  border-radius: var(--r-radius-xl);
  background: var(--r-color-bg-surface);
  padding: 1.5rem;
  box-shadow: var(--r-shadow-xs);
  transition: box-shadow var(--r-duration-base) var(--r-ease-out);
}

.card:hover { box-shadow: var(--r-shadow-md); }
.span-2 { grid-column: span 2; }

.card header h3 {
  font-size: var(--r-font-size-md);
  font-weight: var(--r-font-weight-semibold);
  color: var(--r-color-text-primary);
}

.card header p {
  margin-top: 0.2rem;
  font-size: var(--r-font-size-xs);
  color: var(--r-color-text-muted);
}

.stack { display: flex; flex-direction: column; gap: 1rem; margin-top: 1.25rem; }
.stack.tight { gap: 0.75rem; }
.pair { display: flex; align-items: center; gap: 0.75rem; }
.wrap-row { flex-wrap: wrap; row-gap: 0.5rem; }
.center-row { justify-content: flex-start; margin-top: 0.25rem; }
.rows { display: flex; flex-direction: column; gap: 0.75rem; margin-top: 1.25rem; }
.tab-text { font-size: var(--r-font-size-sm); color: var(--r-color-text-secondary); padding-block: 0.5rem; }
.tip-row { margin-top: 1rem; cursor: default; }
.split { display: flex; gap: 2rem; align-items: center; margin-top: 1.25rem; }
.grow { flex: 1; }
.modal-demo { flex-shrink: 0; }

@media (max-width: 56rem) {
  .bento { grid-template-columns: 1fr; }
  .span-2 { grid-column: auto; }
  .split { flex-direction: column; align-items: stretch; }
}

/* Tokens ------------------------------------------------------------ */
.tokens {
  padding-block: clamp(3rem, 7vw, 5rem);
  background: var(--r-color-bg-canvas);
  border-block: 1px solid var(--r-color-border-subtle);
}

.swatches {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
}

.swatch-col { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }
.dot { width: 3rem; height: 3rem; border-radius: var(--r-radius-full); box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.15), var(--r-shadow-sm); }
.swatch-col small { font-family: var(--r-font-mono); font-size: 0.65rem; color: var(--r-color-text-muted); }

.chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.75rem;
}

.chips code {
  padding: 0.3rem 0.7rem;
  border-radius: var(--r-radius-full);
  background: var(--r-color-bg-surface);
  border: 1px solid var(--r-color-border-subtle);
  font-size: var(--r-font-size-xs);
  color: var(--r-color-text-secondary);
}

/* Features ---------------------------------------------------------- */
.features-band { padding-block: clamp(3rem, 7vw, 5rem); }

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: 1.5rem;
}

.feature {
  padding: 1.5rem;
  border-radius: var(--r-radius-lg);
  border: 1px solid transparent;
  transition: border-color var(--r-duration-fast) var(--r-ease-out);
}

.feature:hover { border-color: var(--r-color-border-subtle); }
.ico { font-size: 1.5rem; }
.feature h3 { margin-top: 0.6rem; font-size: var(--r-font-size-md); color: var(--r-color-text-primary); }
.feature p { margin-top: 0.4rem; font-size: var(--r-font-size-sm); line-height: var(--r-line-height-relaxed); color: var(--r-color-text-secondary); }

/* Final CTA --------------------------------------------------------- */
.final-cta {
  padding-block: clamp(4rem, 9vw, 6rem);
  background:
    radial-gradient(50% 100% at 50% 100%, color-mix(in srgb, var(--r-color-brand-500) 18%, transparent), transparent);
}

.final-cta h2 {
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  letter-spacing: -0.02em;
  font-weight: var(--r-font-weight-bold);
  color: var(--r-color-text-primary);
}
</style>