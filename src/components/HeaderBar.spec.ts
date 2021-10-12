import { createLocalVue, mount } from '@vue/test-utils'
import HeaderBar from '@/components/HeaderBar.vue'
import Vuetify from 'vuetify'
import CompositionApi from '@vue/composition-api'
import { authSymbol, getAuthService } from '@/statemachines/auth.machine'
import { useActor } from 'xstate-vue2'

describe('HeaderBar.vue', () => {
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
  let authService

  beforeEach(() => {
    vuetify = new Vuetify()
    authServiceToProvide = getAuthService()
    provideWithExportedSymbol = {
      [authSymbol as symbol]: authServiceToProvide
    }
    authService = useActor(authServiceToProvide)
  })

  it('should have a custom title and match snapshot', () => {
    const wrapper = mount(HeaderBar, {
      localVue,
      vuetify,
      provide: provideWithExportedSymbol,
      propsData: { title: 'Foobar' }
    })

    // With jest we can create snapshot files of the HTML output
    expect(wrapper.html()).toMatchSnapshot()
  })
})
