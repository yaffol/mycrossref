import { createLocalVue, mount } from '@vue/test-utils'
import ToolBar from '@/components/ToolBar.vue'
import Vuetify from 'vuetify'
import CompositionApi from '@vue/composition-api'
import { authSymbol, getAuthService } from '@/statemachines/auth.machine'
import { useActor } from 'xstate-vue2'
import LoginButton from '@/components/LoginButton.vue'
import { getSearchService, searchSymbol } from '@/statemachines/search.machine'

describe('ToolBar.vue', () => {
  // DO NOT use Vuetify on the localInstance
  // This is bootstrapped in the jest setup
  // file located in ./tests/setup.ts
  //
  // localVue.use(Vuetify)

  const localVue = createLocalVue()
  localVue.use(CompositionApi)
  let vuetify: Vuetify
  let authServiceToProvide: ReturnType<typeof getAuthService>
  let provideWithExportedSymbol: Record<string, unknown>
  let searchServiceToProvide: ReturnType<typeof getSearchService>
  let authService
  let searchService

  function mountFunction (options = {}) {
    return mount(ToolBar, {
      localVue,
      vuetify,
      provide: provideWithExportedSymbol,
      ...options
    })
  }

  beforeEach(() => {
    vuetify = new Vuetify()
    authServiceToProvide = getAuthService()
    searchServiceToProvide = getSearchService()
    provideWithExportedSymbol = {
      [authSymbol as symbol]: authServiceToProvide,
      [searchSymbol as symbol]: searchServiceToProvide
    }
    authService = useActor(authServiceToProvide)
  })

  it('should have a custom title and match snapshot', () => {
    const titleText = 'Foobar title'
    const wrapper = mountFunction({
      propsData: {
        title: titleText
      }
    })

    // With jest we can create snapshot files of the HTML output
    expect(wrapper.html()).toMatchSnapshot()

    // We could also verify this differently
    // by checking the text content
    const title = wrapper.find('.v-toolbar__title')

    expect(title.text()).toBe(titleText)
  })
})
