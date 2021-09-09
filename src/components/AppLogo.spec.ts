import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import AppLogo from '@/components/AppLogo.vue'
import Vuetify from 'vuetify'

describe('AppLogo.vue', () => {
  const localVue = createLocalVue()
  let vuetify: Vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(AppLogo, {
      localVue,
      vuetify,
      propsData: { msg }
    })
    console.log(wrapper.html())
    expect(wrapper.find('.v-image__image'))
  })
})
