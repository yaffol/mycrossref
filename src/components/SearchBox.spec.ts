import { createLocalVue, mount, Wrapper } from '@vue/test-utils'
import SearchBox from '@/components/SearchBox.vue'
import Vuetify from 'vuetify'
import { getSearchService, searchSymbol, useSearchService } from '@/statemachines/search.machine'
import CompositionApi from '@vue/composition-api'
import { useActor } from 'xstate-vue2'

const toggleSearchBox = async (wrapper: Wrapper<any>) => {
  const input = wrapper.find('input')
  await input.trigger('focus')
}

const updateSearchText = async (wrapper: Wrapper<any>, searchText: string) => {
  const input = wrapper.find('input')
  await toggleSearchBox(wrapper)
  await input.setValue(searchText)
}

describe('SearchBox.vue', () => {
  const localVue = createLocalVue()
  localVue.use(CompositionApi)
  let vuetify: Vuetify
  let searchServiceToProvide: ReturnType<typeof getSearchService>
  let provideWithExportedSymbol: Record<string, unknown>
  let searchService

  function mountFunction (options = {}) {
    return mount(SearchBox, {
      localVue,
      vuetify,
      provide: provideWithExportedSymbol,
      ...options
    })
  }

  function mountAttachedToDOM () {
    /*
    When triggering 'focus' with jsdom v16.4.0+, the component must be mounted with the
    attachTo option, see https://vue-test-utils.vuejs.org/api/wrapper/trigger.html
     */
    const div = document.createElement('div')
    div.id = 'root'
    document.body.appendChild(div)
    const wrapper = mountFunction({
      attachTo: '#root'
    })
    return wrapper
  }
  beforeEach(() => {
    vuetify = new Vuetify()
    searchServiceToProvide = getSearchService()
    provideWithExportedSymbol = {
      [searchSymbol as symbol]: searchServiceToProvide
    }
    searchService = useActor(searchServiceToProvide)
  })
  it('should work', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })
  it('Has the right icon', () => {
    const wrapper = mountFunction()
    expect(wrapper.find('i.v-icon').exists()).toBe(true)
  })
  it('Has the correct initial classnames', () => {
    const wrapper = mountFunction()
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['expanding-search', 'closed']))
  })
  it('Has the correct initial (blank) search text', () => {
    const wrapper = mountFunction()
    /*
       VTU wrapper is typed as a generic Vue instance and can't infer the types from the component
       when it's an SFC, so we must declare the component - wrapper.vm - as any
       https://github.com/vuejs/vue-test-utils/issues/255
     */
    expect((wrapper.vm as any).searchText).toEqual('')
  })
  it('Has the correct classnames on click to open', async () => {
    const wrapper = mountAttachedToDOM()
    await toggleSearchBox(wrapper)
    expect(wrapper.classes()).not.toContain('closed')
    /*
    https://vue-test-utils.vuejs.org/api/options.html#attachto
    When attaching to the DOM, you should call wrapper.destroy() at the end of your test to remove
    the rendered elements from the document and destroy the component instance.
     */
    wrapper.destroy()
  })
  it('Updates the search text on input', async () => {
    const wrapper = mountAttachedToDOM()
    const newSearchText = 'Some new search text'
    await updateSearchText(wrapper, newSearchText)
    expect((wrapper.vm as any).searchText).toEqual(newSearchText)
    wrapper.destroy()
  })
  it('Applies the closed class on blur, when search text is empty', async () => {
    const wrapper = mountAttachedToDOM()
    await toggleSearchBox(wrapper)
    const input = wrapper.find('input')
    await input.trigger('blur')
    expect(wrapper.classes()).toContain('closed')
  })
  it('Does not apply the closed class on blur, when the search text is not empty', async () => {
    const wrapper = mountAttachedToDOM()
    const newSearchText = 'Some other new search text in Korean 한국어로 된 다른 새로운 검색 텍스트'
    await updateSearchText(wrapper, newSearchText)
    expect((wrapper.vm as any).searchText).toEqual(newSearchText)
    const input = wrapper.find('input')
    input.trigger('blur')
    expect(wrapper.classes()).not.toContain('closed')
  })
})
