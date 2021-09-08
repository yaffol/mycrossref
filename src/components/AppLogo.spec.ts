import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import HelloWorld from '@/components/AppLogo.vue'
import Vuetify from 'vuetify'

describe('AppLogo.vue', () => {
  const localVue = createLocalVue()
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    console.log(wrapper.html())
    expect(wrapper.find('.v-image__image'))
  })
})
