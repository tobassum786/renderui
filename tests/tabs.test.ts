import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { RTabs } from '@/components/RTabs'

const tabs = [
  { id: 'a', label: 'Alpha' },
  { id: 'b', label: 'Beta' },
  { id: 'c', label: 'Gamma', disabled: true },
]

describe('RTabs', () => {
  it('applies tablist/tab semantics with roving tabindex', () => {
    const wrapper = mount(RTabs, { props: { tabs } })
    expect(wrapper.find('[role="tablist"]').exists()).toBe(true)
    const tabButtons = wrapper.findAll('[role="tab"]')
    expect(tabButtons).toHaveLength(3)
    expect(tabButtons[0].attributes('tabindex')).toBe('0')
    expect(tabButtons[1].attributes('tabindex')).toBe('-1')
    expect(tabButtons[0].attributes('aria-selected')).toBe('true')
  })

  it('switches panels on click', async () => {
    const wrapper = mount(RTabs, {
      props: { tabs },
      slots: { 'panel-a': 'A content', 'panel-b': 'B content' },
    })
    const hidden = (p: { attributes: (a: string) => string | undefined }) =>
      p.attributes('style')?.includes('display: none') ?? false

    const panels = wrapper.findAll('[role="tabpanel"]')
    expect(hidden(panels[0])).toBe(false)

    await wrapper.findAll('[role="tab"]')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['b'])
    expect(hidden(panels[1])).toBe(false)
    expect(hidden(panels[0])).toBe(true)
  })

  it('ignores disabled tabs on click', async () => {
    const wrapper = mount(RTabs, { props: { tabs } })
    await wrapper.findAll('[role="tab"]')[2].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('moves selection with arrow keys', async () => {
    const wrapper = mount(RTabs, { props: { tabs } })
    const list = wrapper.find('[role="tablist"]')
    await list.trigger('keydown', { key: 'ArrowRight' })
    // Gamma is disabled, so selection skips from Alpha to... Beta (index 1).
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['b'])
  })
})
