import { assign, createMachine } from 'xstate'

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
