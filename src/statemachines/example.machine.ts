import { inject, InjectionKey, provide } from '@vue/composition-api'
import { useActor, useInterpret } from 'xstate-vue2'
import { createMachine, assign, InterpreterFrom } from 'xstate'
import { useInspector } from '@/statemachines/utils'

type ToggleEvent =
  | { type: 'TOGGLE' }
  | { type: 'SOME_OTHER_EVENT', text: string }
  | { type: 'SOME_EVENT' };

export const exampleMachine = createMachine<{ count: number }, ToggleEvent>({
  id: 'toggle',
  initial: 'inactive',
  context: {
    count: 0
  },
  states: {
    inactive: {
      on: { TOGGLE: 'active' }
    },
    active: {
      entry: assign({ count: (ctx) => ctx.count + 1 }),
      on: { TOGGLE: 'inactive' }
    }
  }
})

export type ToggleService = InterpreterFrom<typeof exampleMachine>;
export const toggleServiceSymbol: InjectionKey<ToggleService> = Symbol('toggle.service')

export function getToggleService () {
  const service = useInterpret(exampleMachine, { devTools: useInspector() })
  return service
}

export function provideToggleService () {
  const service = getToggleService()
  provide(toggleServiceSymbol, service)

  return service
}

export function useToggleService () {
  const service = inject(toggleServiceSymbol)

  if (!service) {
    throw new Error('Toggle service not provided.')
  }

  return useActor(service)
}
