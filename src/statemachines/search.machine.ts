import {
  InjectionKey,
  provide,
  inject
} from '@vue/composition-api'
import {
  InterpreterFrom,
  createMachine
} from 'xstate'
import {
  useInterpret
} from 'xstate-vue2'
import searchMachine from '@/statemachines/SearchBoxToggleMachine'
type SearchService = InterpreterFrom<typeof searchMachine>
const searchSymbol: InjectionKey<SearchService> = Symbol('SearchServiceInjectionKey')

export function provideSearchService () {
  const service = useInterpret(searchMachine, { devTools: true })
  // You dont necessarily have to use the provide/inject API, but I usually do since it makes it easier to pass the `appMachine` around the app and easier to test than mocking file imports.
  provide(searchSymbol, service)

  return service
}

export function useSearchService () {
  const service = inject(searchSymbol)

  if (!service) {
    throw new Error('Make sure to inject the searchService.')
  }

  return service
}
