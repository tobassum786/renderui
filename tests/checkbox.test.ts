import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { RCheckbox } from '@/components/RCheckbox'

describe('RCheckbox', () => {
  it('toggles via the native input and emits boolean', async () => {
    const wrapper = mount(RCheckbox, {
      props: { modelValue: false, label: 'Subscribe' },
    })
    expect(wrapper.text()).toContain('Subscribe')
    await wrapper.find('input').setValue(true)
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
  })

  it('renders description text', () => {
    const wrapper = mount(RCheckbox, {
      props: { label: 'Terms', description: 'I accept the TOS.' },
    })
    expect(wrapper.text()).toContain('I accept the TOS.')
  })

  it('disables interaction when disabled', async () => {
    const wrapper = mount(RCheckbox, {
      props: { modelValue: false, disabled: true },
    })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('marks box invalid state class when invalid', () => {
    const wrapper = mount(RCheckbox, { props: { invalid: true } })
    expect(wrapper.find('[aria-hidden="true"]').classes()).toContain('invalid')
  })
})
