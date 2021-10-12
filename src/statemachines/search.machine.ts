import {
  InjectionKey,
  provide,
  inject
} from '@vue/composition-api'
import {
  InterpreterFrom
} from 'xstate'
import {
  useActor,
  useInterpret
} from 'xstate-vue2'
import { searchMachine } from '@/statemachines/SearchMachine'
import { useInspector } from '@/statemachines/utils'

export type SearchService = InterpreterFrom<typeof searchMachine>
export const searchSymbol: InjectionKey<SearchService> = Symbol('search.service')

export function getSearchService () {
  const service = useInterpret(searchMachine, { devTools: useInspector() })
  return service
}

// const searchSymbol = 'searchMachine'
export function provideSearchService () {
  const service = getSearchService()
  // You dont necessarily have to use the provide/inject API, but I usually do since it makes it easier to pass the machine around the app and easier to test than mocking file imports.
  provide(searchSymbol, service)

  return service
}

export function useSearchService () {
  const service = inject(searchSymbol)

  if (!service) {
    throw new Error('Make sure to inject the searchService.')
  }

  return useActor(service)
}
