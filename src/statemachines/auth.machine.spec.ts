import { interpret } from 'xstate'
import { authenticationMachine } from '@/statemachines/auth.machine'
import { server } from '@/mocks/server'

beforeAll(() => {
  // Enable the mocking in tests.
  server.listen()
})

afterEach(() => {
  // Reset any runtime handlers tests may use.
  server.resetHandlers()
})

afterAll(() => {
  // Clean up once the tests are done.
  server.close()
})

describe('authentication machine', () => {
  it('should eventually reach "loggedIn" with valid credentials', (done) => {
    const authService = interpret(authenticationMachine).onTransition((state) => {
      // this is where you expect the state to eventually
      // be reaches
      if (state.matches('loggedIn')) {
        done()
      }
    })

    authService.start()

    // send zero or more events to the service that should
    // cause it to eventually reach its expected state
    authService.send({ type: 'ATTEMPT_LOG_IN', userDetails: { username: 'someone@crossref.org' } })
  })
})
