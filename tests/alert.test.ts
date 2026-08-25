import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { RAlert } from '@/components/RAlert'

describe('RAlert', () => {
  it('announces itself with role="alert"', () => {
    const wrapper = mount(RAlert, {
      props: { variant: 'warning', title: 'Heads up' },
      slots: { default: 'Your trial ends soon.' },
    })
    expect(wrapper.attributes('role')).toBe('alert')
    expect(wrapper.text()).toContain('Heads up')
    expect(wrapper.text()).toContain('Your trial ends soon.')
  })

  it('emits dismiss only when dismissible', async () => {
    const passive = mount(RAlert)
    expect(passive.find('button').exists()).toBe(false)

    const wrapper = mount(RAlert, { props: { dismissible: true } })
    await wrapper.find('button[aria-label="Dismiss"]').trigger('click')
    expect(wrapper.emitted('dismiss')).toHaveLength(1)
  })
})
