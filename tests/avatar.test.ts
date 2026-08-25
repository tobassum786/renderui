import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { RAvatar } from '@/components/RAvatar'

describe('RAvatar', () => {
  it('derives up to two initials from the name', () => {
    const wrapper = mount(RAvatar, {
      props: { name: 'Ada Lovelace' },
    })
    expect(wrapper.text()).toBe('AL')
  })

  it('falls back to an icon when there is no image or name', () => {
    const wrapper = mount(RAvatar)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('swaps to initials when the image fails to load', async () => {
    const wrapper = mount(RAvatar, {
      props: { src: '/broken.png', name: 'Grace Hopper' },
    })
    expect(wrapper.find('img').exists()).toBe(true)
    await wrapper.find('img').trigger('error')
    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.text()).toContain('GH')
  })
})
