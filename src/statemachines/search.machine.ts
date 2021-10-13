import {
  InjectionKey,
  provide,
  inject
} from '@vue/composition-api'
import {
  InterpreterFrom
  , assign, createMachine
} from 'xstate'
import {
  useActor,
  useInterpret
} from 'xstate-vue2'
import { useInspector } from '@/statemachines/utils'

export interface SearchBoxToggleMachineContext {
  text: string
}

export type SearchBoxToggleMachineEvent =
  | {
  type: 'TOGGLE'
}
  | {
  type: 'OPEN'
}
  | {
  type: 'CLOSE'
}
  | {
  type: 'REPORT_TEXT_CHANGE'
  text: string
}

const searchBoxToggleMachine = createMachine<
  SearchBoxToggleMachineContext,
  SearchBoxToggleMachineEvent
  >(
    {
      id: 'searchBoxToggle',
      initial: 'hidden',
      context: {
        text: ''
      },
      states: {
        hidden: {
          on: {
            TOGGLE: {
              target: 'shown'
            },
            OPEN: {
              target: 'shown'
            }
          }
        },
        shown: {
          on: {
            TOGGLE: {
              target: 'hidden',
              cond: 'searchQueryEmpty'
            },
            CLOSE: {
              target: 'shown'
            },
            REPORT_TEXT_CHANGE: {
              actions: assign({
                text: (context, event) => event.text
              })
            }
          }
        }
      }
    },
    {
      guards: {
        searchQueryEmpty: (context) => {
          return typeof context.text !== 'string' || context.text.length < 1
        }
      }
    }
  )

const searchMachine = searchBoxToggleMachine

export { searchBoxToggleMachine, searchMachine }

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
