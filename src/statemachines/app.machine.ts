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
import authenticationMachine from '@/statemachines/AuthenticationMachine'

const appMachine = authenticationMachine

type AppService = InterpreterFrom<typeof appMachine>
const appSymbol: InjectionKey<AppService> = Symbol('AppServiceInjectionKey')

export function provideAppService () {
  const service = useInterpret(appMachine, { devTools: true })
  // You dont necessarily have to use the provide/inject API, but I usually do since it makes it easier to pass the `appMachine` around the app and easier to test than mocking file imports.
  provide(appSymbol, service)

  return service
}

export function useAuthService () {
  const service = inject(appSymbol)

  if (!service) {
    throw new Error('Make sure to inject the appService.')
  }

  return service
}
