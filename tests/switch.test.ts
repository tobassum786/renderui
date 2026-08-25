import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { RSwitch } from '@/components/RSwitch'

describe('RSwitch', () => {
  it('exposes switch semantics and initial state', () => {
    const wrapper = mount(RSwitch, { props: { modelValue: false } })
    const track = wrapper.find('[role="switch"]')
    expect(track.exists()).toBe(true)
    expect(track.attributes('aria-checked')).toBe('false')
  })

  it('toggles and emits update:modelValue', async () => {
    const wrapper = mount(RSwitch, { props: { modelValue: false } })
    await wrapper.find('[role="switch"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
    expect(wrapper.emitted('change')?.[0]).toEqual([true])
  })

  it('respects the checked prop visually', () => {
    const wrapper = mount(RSwitch, { props: { modelValue: true } })
    expect(
      wrapper.find('[role="switch"]').attributes('aria-checked'),
    ).toBe('true')
  })

  it('does nothing when disabled', async () => {
    const wrapper = mount(RSwitch, {
      props: { modelValue: false, disabled: true },
    })
    await wrapper.find('[role="switch"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
})
