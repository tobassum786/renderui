import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { RInput } from '@/components/RInput'

describe('RInput', () => {
  it('binds modelValue both ways', async () => {
    const wrapper = mount(RInput, {
      props: { modelValue: 'initial' },
    })
    const input = wrapper.find('input')
    expect((input.element as HTMLInputElement).value).toBe('initial')

    input.element.value = 'typed'
    await input.trigger('input')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['typed'])
  })

  it('associates the label with the input', () => {
    const wrapper = mount(RInput, {
      props: { label: 'Email address' },
      attrs: { id: 'email' },
    })
    const label = wrapper.find('label')
    expect(label.text()).toBe('Email address')
    expect(label.attributes('for')).toBe('email')
    expect(wrapper.find('input').attributes('id')).toBe('email')
  })

  it('renders hint text by default', () => {
    const wrapper = mount(RInput, {
      props: { hint: 'We never share your email.' },
    })
    expect(wrapper.text()).toContain('We never share your email.')
    expect(wrapper.find('p').classes()).not.toContain('error')
  })

  it('replaces hint with error and flags aria-invalid', () => {
    const wrapper = mount(RInput, {
      props: { hint: 'ignored now', error: 'Required field' },
    })
    expect(wrapper.text()).toContain('Required field')
    expect(wrapper.text()).not.toContain('ignored now')
    expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
    expect(wrapper.find('input').classes()).toContain('invalid')
  })

  it('disables the native input', () => {
    const wrapper = mount(RInput, { props: { disabled: true } })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })
})
