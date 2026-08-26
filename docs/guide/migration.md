# Migration Guide

Guide for upgrading RenderUI versions and migrating from other design systems.

## Upgrading RenderUI

### v0.1.x → v0.2.x (Planned)

> **Note:** RenderUI is currently pre-1.0. Breaking changes may occur in minor versions. Pin your dependency:

```json
{
  "dependencies": {
    "renderui": "^0.1.0"
  }
}
```

### Breaking Changes Checklist

| Area | Change | Migration |
|------|--------|-----------|
| Tokens | Renamed `--r-color-primary-*` → `--r-color-brand-*` | Find/replace in your CSS |
| Components | `RSelect` `options` format changed | Update to `{ label, value, disabled? }` |
| Composables | `useTheme()` returns `resolvedTheme` (computed) | Use `.value` in JS, auto-unwraps in templates |

---

## Migrating from Other Design Systems

### From Vuetify

**Key Differences:**
- Vuetify: Heavy, opinionated, Material Design
- RenderUI: Lightweight, unopinionated, token-based

**Migration Strategy:**

1. **Install side-by-side**
```bash
npm install renderui
# Keep vuetify for now
```

2. **Replace component by component**
```vue
<!-- Before (Vuetify) -->
<v-btn color="primary" variant="tonal">Submit</v-btn>

<!-- After (RenderUI) -->
<RButton variant="primary">Submit</RButton>
```

3. **Map common patterns**

| Vuetify | RenderUI |
|---------|----------|
| `v-btn` | `RButton` |
| `v-card` | `RCard` |
| `v-text-field` | `RInput` |
| `v-select` | `RSelect` |
| `v-checkbox` | `RCheckbox` |
| `v-switch` | `RSwitch` |
| `v-dialog` | `RModal` |
| `v-progress-linear` | `RProgress` |
| `v-skeleton-loader` | `RSkeleton` |
| `v-tabs` | `RTabs` |
| `v-tooltip` | `RTooltip` |
| `v-chip` | `RBadge` |
| `v-avatar` | `RAvatar` |
| `v-alert` | `RAlert` |
| `v-progress-circular` | `RSpinner` |

4. **Theming migration**

```scss
// Vuetify: SASS variables
$material-light: (
  'primary': #6366f1,
  'secondary': #64748b,
);

// RenderUI: CSS custom properties
:root {
  --r-color-brand-500: #6366f1;
  --r-color-brand-600: #4f46e5;
  --r-color-neutral-500: #64748b;
}
```

5. **Remove Vuetify** once all components migrated.

---

### From Element Plus

**Key Differences:**
- Element Plus: Component-heavy, Chinese-origin, extensive
- RenderUI: Minimal, accessible, token-first

**Component Mapping:**

| Element Plus | RenderUI |
|--------------|----------|
| `ElButton` | `RButton` |
| `ElCard` | `RCard` |
| `ElInput` | `RInput` |
| `ElSelect` | `RSelect` |
| `ElCheckbox` | `RCheckbox` |
| `ElSwitch` | `RSwitch` |
| `ElDialog` | `RModal` |
| `ElProgress` | `RProgress` |
| `ElSkeleton` | `RSkeleton` |
| `ElTabs` | `RTabs` |
| `ElTooltip` | `RTooltip` |
| `ElTag` | `RBadge` |
| `ElAvatar` | `RAvatar` |
| `ElAlert` | `RAlert` |
| `ElLoading` | `RSpinner` |

**Theming:**

```scss
// Element Plus: SCSS override
$colors: (
  'primary': #6366f1,
);

// RenderUI: CSS custom properties
:root {
  --r-color-brand-500: #6366f1;
  --r-color-brand-600: #4f46e5;
}
```

---

### From PrimeVue

**Key Differences:**
- PrimeVue: Feature-rich, many components, paid themes
- RenderUI: Core components only, free, CSS-token theming

**Component Mapping:**

| PrimeVue | RenderUI |
|----------|----------|
| `Button` | `RButton` |
| `Card` | `RCard` |
| `InputText` | `RInput` |
| `Dropdown` | `RSelect` |
| `Checkbox` | `RCheckbox` |
| `ToggleSwitch` | `RSwitch` |
| `Dialog` | `RModal` |
| `ProgressBar` | `RProgress` |
| `Skeleton` | `RSkeleton` |
| `TabView` | `RTabs` |
| `Tooltip` | `RTooltip` |
| `Tag` | `RBadge` |
| `Avatar` | `RAvatar` |
| `Alert` | `RAlert` |
| `Spinner` | `RSpinner` |

**Theming:**

```css
/* PrimeVue: CSS variables (v3+) or SASS */
:root {
  --primary-color: #6366f1;
}

/* RenderUI: More granular */
:root {
  --r-color-brand-500: #6366f1;
  --r-color-brand-600: #4f46e5;
}
```

---

### From Headless UI / Radix Vue

**Key Differences:**
- Headless/Radix: Unstyled, bring-your-own-CSS
- RenderUI: Pre-styled with token-based customization

**Migration is straightforward** — replace unstyled components with styled equivalents:

```vue
<!-- Headless UI -->
<Menu as="div">
  <Menu.Button>Options</Menu.Button>
  <Menu.Items>
    <Menu.Item>Item 1</Menu.Item>
  </Menu.Items>
</Menu>

<!-- RenderUI: Use RSelect or compose with RButton + RTooltip + custom dropdown -->
<RSelect :options="[{label: 'Item 1', value: '1'}]" placeholder="Options" />
```

**For custom composites**, use RenderUI tokens in your CSS:

```css
.my-dropdown {
  background: var(--r-color-bg-surface);
  border: 1px solid var(--r-color-border-strong);
  border-radius: var(--r-radius-lg);
  box-shadow: var(--r-shadow-lg);
  padding: var(--r-space-2);
}
```

---

### From Tailwind UI / shadcn-vue

**Key Differences:**
- Tailwind/shadcn: Copy-paste components, utility-first
- RenderUI: Installable library, token-first

**If you like utility-first**, use RenderUI components + Tailwind utilities:

```vue
<RCard class="shadow-xl hover:shadow-2xl transition-shadow">
  <RButton class="w-full py-3 text-lg">Tailwind + RenderUI</RButton>
</RCard>
```

**If you want pure RenderUI**, map components:

| shadcn-vue | RenderUI |
|------------|----------|
| `Button` | `RButton` |
| `Card` | `RCard` |
| `Input` | `RInput` |
| `Select` | `RSelect` |
| `Checkbox` | `RCheckbox` |
| `Switch` | `RSwitch` |
| `Dialog` | `RModal` |
| `Progress` | `RProgress` |
| `Skeleton` | `RSkeleton` |
| `Tabs` | `RTabs` |
| `Tooltip` | `RTooltip` |
| `Badge` | `RBadge` |
| `Avatar` | `RAvatar` |
| `Alert` | `RAlert` |
| `Spinner` | `RSpinner` |

---

### From Bootstrap Vue / Buefy

Similar to above — map component names and replace utility classes with RenderUI tokens.

---

## Migration Checklist

- [ ] Audit current component usage
- [ ] Create component mapping table
- [ ] Set up RenderUI in parallel
- [ ] Migrate one page/feature at a time
- [ ] Update theming (CSS variables)
- [ ] Run visual regression tests
- [ ] Update tests to use RenderUI components
- [ ] Remove old design system
- [ ] Update documentation/storybook

## Codemods (Future)

Planned: `@renderui/codemod` for automated migrations.

```bash
npx @renderui/codemod vuetify-to-renderui
npx @renderui/codemod element-plus-to-renderui
```