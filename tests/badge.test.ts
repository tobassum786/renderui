import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { RBadge } from '@/components/RBadge'

describe('RBadge', () => {
  it('applies variant styling', () => {
    const wrapper = mount(RBadge, {
      props: { variant: 'success' },
      slots: { default: 'Active' },
    })
    expect(wrapper.classes()).toContain('success')
    expect(wrapper.text()).toContain('Active')
  })

  it('shows a dot indicator when requested', () => {
    const wrapper = mount(RBadge, { props: { dot: true } })
    expect(wrapper.find('span[aria-hidden="true"]').exists()).toBe(true)
  })
})
