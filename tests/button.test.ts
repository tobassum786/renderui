import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { RButton } from '@/components/RButton'

describe('RButton', () => {
  it('renders default slot content', () => {
    const wrapper = mount(RButton, { slots: { default: 'Save changes' } })
    expect(wrapper.text()).toContain('Save changes')
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('defaults to type="button" and primary variant', () => {
    const wrapper = mount(RButton)
    const button = wrapper.find('button')
    expect(button.attributes('type')).toBe('button')
    expect(button.classes()).toContain('primary')
  })

  it('applies size and block modifiers', () => {
    const wrapper = mount(RButton, { props: { size: 'lg', block: true } })
    const classes = wrapper.find('button').classes()
    expect(classes).toContain('lg')
    expect(classes).toContain('block')
  })

  it('emits click when enabled', async () => {
    const wrapper = mount(RButton)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(RButton, { props: { disabled: true } })
    const button = wrapper.find('button')
    expect(button.attributes('disabled')).toBeDefined()
    await button.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('shows spinner state while loading and blocks interaction', async () => {
    const wrapper = mount(RButton, { props: { loading: true } })
    const button = wrapper.find('button')
    expect(button.attributes('aria-busy')).toBe('true')
    expect(button.attributes('disabled')).toBeDefined()
    expect(wrapper.find('[role="status"]').exists()).toBe(true)
    await button.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })
})
