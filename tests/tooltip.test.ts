import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { RTooltip } from '@/components/RTooltip'

describe('RTooltip', () => {
  it('wraps trigger content and links describedby', () => {
    const wrapper = mount(RTooltip, {
      props: { content: 'Helpful info' },
      slots: { default: 'Hover me' },
    })
    expect(wrapper.text()).toContain('Hover me')
    const tip = wrapper.find('[role="tooltip"]')
    expect(tip.exists()).toBe(true)
    expect(wrapper.find('.trigger').attributes('aria-describedby')).toBe(
      tip.attributes('id'),
    )
  })

  it('renders slot content over the content prop', () => {
    const wrapper = mount(RTooltip, {
      props: { content: 'prop text' },
      slots: { content: '<strong>rich</strong>' },
    })
    expect(wrapper.find('[role="tooltip"]').text()).toContain('rich')
  })

  it('applies placement class', () => {
    const wrapper = mount(RTooltip, {
      props: { content: 'x', placement: 'right' },
    })
    expect(wrapper.find('[role="tooltip"]').classes()).toContain('right')
  })
})
