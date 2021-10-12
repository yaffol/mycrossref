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
  useActor,
  useInterpret
} from 'xstate-vue2'
import authenticationMachine from '@/statemachines/AuthenticationMachine'
import { useInspector } from '@/statemachines/utils'

export type AuthService = InterpreterFrom<typeof authenticationMachine>
export const authSymbol: InjectionKey<AuthService> = Symbol('AuthServiceInjectionKey')

export function getAuthService () {
  const service = useInterpret(authenticationMachine, { devTools: useInspector() })
  return service
}

export function provideAuthService () {
  const service = getAuthService()
  // You dont necessarily have to use the provide/inject API, but I usually do since it makes it easier to pass the `appMachine` around the app and easier to test than mocking file imports.
  provide(authSymbol, service)

  return service
}

export function useAuthService () {
  const service = inject(authSymbol)

  if (!service) {
    throw new Error('Make sure to provide the authService.')
  }

  return useActor(service)
}
