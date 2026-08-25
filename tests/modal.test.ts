import { afterEach, describe, expect, it } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { RModal } from '@/components/RModal'

const mounted: VueWrapper[] = []

function mountModal(props: Record<string, unknown> = {}): VueWrapper {
  const wrapper = mount(RModal, {
    props: { modelValue: true, ...props },
    attachTo: document.body,
  })
  mounted.push(wrapper)
  return wrapper
}

afterEach(() => {
  for (const wrapper of mounted.splice(0)) wrapper.unmount()
  document.body.innerHTML = ''
})

describe('RModal', () => {
  it('teleports an open dialog to body with accessible title', () => {
    mountModal({ title: 'Delete account?' })
    const dialog = document.querySelector('[role="dialog"]')
    expect(dialog).toBeTruthy()
    expect(dialog?.getAttribute('aria-modal')).toBe('true')
    const labelledby = dialog?.getAttribute('aria-labelledby')
    expect(labelledby).toBeTruthy()
    expect(document.getElementById(labelledby!)?.textContent).toContain(
      'Delete account?',
    )
  })

  it('renders nothing when closed', () => {
    const wrapper = mount(RModal, {
      props: { modelValue: false },
      attachTo: document.body,
    })
    mounted.push(wrapper)
    expect(document.querySelector('[role="dialog"]')).toBeNull()
  })

  it('closes on Escape', async () => {
    const wrapper = mountModal()
    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
    )
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })

  it('ignores Escape when closeOnEsc is false', async () => {
    const wrapper = mountModal({ closeOnEsc: false })
    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
    )
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('closes on backdrop mousedown', async () => {
    const wrapper = mountModal()
    const overlay = document.querySelector('[class*="overlay"]') as HTMLElement
    overlay.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
  })

  it('keeps open on backdrop click when closeOnBackdrop is false', async () => {
    const wrapper = mountModal({ closeOnBackdrop: false })
    const overlay = document.querySelector(
      '[class*="overlay"]',
    ) as HTMLElement
    overlay.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('locks body scroll while open and restores after close', async () => {
    const wrapper = mountModal()
    expect(document.body.style.overflow).toBe('hidden')

    await wrapper.setProps({ modelValue: false })
    expect(document.body.style.overflow).not.toBe('hidden')
  })
})
