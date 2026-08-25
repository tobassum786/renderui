import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { RSpinner } from '@/components/RSpinner'
import { RCard } from '@/components/RCard'

describe('RSpinner', () => {
  it('is announced as a status region', () => {
    const wrapper = mount(RSpinner, { props: { label: 'Loading users' } })
    expect(wrapper.attributes('role')).toBe('status')
    expect(wrapper.text()).toContain('Loading users')
  })
})

describe('RCard', () => {
  it('renders title, body and footer sections', () => {
    const wrapper = mount(RCard, {
      props: { title: 'Team plan' },
      slots: {
        default: '$12 per user / month',
        footer: '<button>Upgrade</button>',
      },
    })
    expect(wrapper.text()).toContain('Team plan')
    expect(wrapper.text()).toContain('$12 per user / month')
    expect(wrapper.find('footer button').exists()).toBe(true)
  })

  it('omits header when no title or header slot is given', () => {
    const wrapper = mount(RCard, { slots: { default: 'Just content' } })
    expect(wrapper.find('header').exists()).toBe(false)
  })
})
