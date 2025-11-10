import { mount } from '@vue/test-utils'
import App from '../../src/App.vue'

describe('App', () => {
  it('mounts', () => {
    const w = mount(App)
    expect(w.exists()).toBe(true)
  })
})
