import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { RSelect } from '@/components/RSelect'

const options = [
  { label: 'Small', value: 's' },
  { label: 'Medium', value: 'm' },
  { label: 'Large', value: 'l', disabled: true },
]

describe('RSelect', () => {
  it('renders options from the options prop', () => {
    const wrapper = mount(RSelect, { props: { options } })
    const rendered = wrapper.findAll('option')
    expect(rendered).toHaveLength(3)
    expect(rendered[2].attributes('disabled')).toBeDefined()
  })

  it('emits the original value type on change', async () => {
    const wrapper = mount(RSelect, {
      props: { options: [{ label: 'One', value: 1 }] },
    })
    const select = wrapper.find('select')
    select.element.value = '1'
    await select.trigger('change')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([1])
  })

  it('shows placeholder as a disabled empty option', () => {
    const wrapper = mount(RSelect, {
      props: { options, placeholder: 'Choose…' },
    })
    const first = wrapper.find('option')
    expect(first.text()).toBe('Choose…')
    expect(first.attributes('disabled')).toBeDefined()
  })

  it('flags aria-invalid when error is present', () => {
    const wrapper = mount(RSelect, {
      props: { options, error: 'Required' },
    })
    expect(wrapper.find('select').attributes('aria-invalid')).toBe('true')
    expect(wrapper.text()).toContain('Required')
  })
})
