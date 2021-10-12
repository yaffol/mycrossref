import { createLocalVue, mount } from '@vue/test-utils'
import LanguageMenu from '@/components/LanguageMenu.vue'
import Vuetify from 'vuetify'

describe('LanguageMenu.vue', () => {
  const localVue = createLocalVue()
  let vuetify: Vuetify
  function mountFunction (options = {}) {
    options = {
      data: {
        locales: [
          {
            locale: 'en',
            title: 'English'
          },
          {
            locale: 'fr',
            title: 'Français'
          },
          {
            locale: 'es',
            title: 'Español'
          }
        ]
      },
      ...options
    }
    return mount(LanguageMenu, {
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
  it('Has the right icon', () => {
    const wrapper = mountFunction()
    expect(wrapper.find('i.v-icon').exists()).toBe(true)
  })
  it('Uses correct translation key for button text', () => {
    const wrapper = mountFunction()
    const comp = wrapper.find('.v-btn__content')
    expect(comp.text()).toEqual('$vuetify.language_menu_button')
  })
  it('Has a menu entry for each locale', async () => {
    const wrapper = mountFunction()
    await wrapper.find('button').trigger('click')
    const menuItems = wrapper.findAll('.v-list-item')
    expect(menuItems).toHaveLength(3)
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
