import { createLocalVue, mount } from '@vue/test-utils'
import NavDrawer from '@/components/NavDrawer.vue'
import Vuetify from 'vuetify'
import CompositionApi from '@vue/composition-api'

describe('NavDrawer.vue', () => {
  const localVue = createLocalVue()
  localVue.use(CompositionApi)
  let vuetify: Vuetify
  function mountFunction (options = {}) {
    return mount(NavDrawer, {
      localVue,
      vuetify,
      ...options
    })
  }
  beforeEach(() => {
    vuetify = new Vuetify()
  })
  it('should work', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })
  // Open and close on activator and outside component click better handled in an e2e test
  it('Expands and collapses menu item with children on click', async () => {
    const wrapper = mountFunction()
    const menuItemWithChildren = wrapper.find('.v-list-group')
    const menuItemElementActivator = menuItemWithChildren.find('.v-list-item')
    await menuItemElementActivator.trigger('click')
    expect(menuItemWithChildren.classes()).toContain('v-list-group--active')
    await menuItemElementActivator.trigger('click')
    expect(menuItemWithChildren.classes()).not.toContain('v-list-group--active')
  })
})
