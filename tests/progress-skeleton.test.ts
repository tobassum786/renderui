import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { RProgress } from '@/components/RProgress'
import { RSkeleton } from '@/components/RSkeleton'

describe('RProgress', () => {
  it('exposes progressbar semantics with clamped values', () => {
    const wrapper = mount(RProgress, {
      props: { value: 150, max: 100, label: 'Uploading', showValue: true },
    })
    const bar = wrapper.find('[role="progressbar"]')
    expect(bar.attributes('aria-valuemax')).toBe('100')
    expect(bar.attributes('aria-label')).toBe('Uploading')
    expect(wrapper.text()).toContain('100%')
  })

  it('fills proportionally', () => {
    const wrapper = mount(RProgress, { props: { value: 25 } })
    const fill = wrapper.find('.fill')
    expect(fill.attributes('style')).toContain('width: 25%')
  })
})

describe('RSkeleton', () => {
  it('is hidden from assistive tech', () => {
    const wrapper = mount(RSkeleton)
    expect(wrapper.attributes('aria-hidden')).toBe('true')
  })

  it('applies variant classes', () => {
    const circle = mount(RSkeleton, { props: { variant: 'circle' } })
    expect(circle.classes()).toContain('circle')

    const rect = mount(RSkeleton, {
      props: { variant: 'rect', width: '200px', height: '80px' },
    })
    expect(rect.classes()).toContain('rect')
    expect(rect.attributes('style')).toContain('width: 200px')
  })
})
