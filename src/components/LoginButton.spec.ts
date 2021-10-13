import { createLocalVue, mount } from '@vue/test-utils'
import LoginButton from '@/components/LoginButton.vue'
import Vuetify from 'vuetify'
import CompositionApi from '@vue/composition-api'
import { getAuthService, authSymbol } from '@/statemachines/auth.machine'
import { useActor } from 'xstate-vue2'

describe('LoginButton.vue', () => {
  const localVue = createLocalVue()
  localVue.use(CompositionApi)
  let vuetify: Vuetify
  let authServiceToProvide: ReturnType<typeof getAuthService>
  let provideWithExportedSymbol: Record<string, unknown>
  let authService
  function mountFunction (options = {}) {
    return mount(LoginButton, {
      localVue,
      vuetify,
      provide: provideWithExportedSymbol,
      ...options
    })
  }
  beforeEach(() => {
    vuetify = new Vuetify()
    authServiceToProvide = getAuthService()
    provideWithExportedSymbol = {
      [authSymbol as symbol]: authServiceToProvide
    }
    authService = useActor(authServiceToProvide)
  })
  it('should work', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })
  it('Updates button text on login success', async () => {
    const wrapper = mountFunction()
    const button = wrapper.find('button')
    await button.trigger('click')
  })
  // Probably a better candidate for an e2e test
  // it('Calls the changeLocale method with the new locale on menu item click', async () => {
  //   const wrapper = mountFunction()
  //   await wrapper.find('button').trigger('click')
  //   const menuItems = wrapper.findAll('.v-list-item')
  //   const newLocateItem = menuItems.at(2)
  //   await newLocateItem.trigger('click')
  //   expect(spy).toBeCalledTimes(1)
  //   expect(menuItems).toHaveLength(3)
  // })
})
