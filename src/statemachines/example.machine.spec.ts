import { interpret } from 'xstate'
import { exampleMachine } from '@/statemachines/example.machine'

beforeAll(() => {
})

afterEach(() => {
})

afterAll(() => {
})

describe('example machine', () => {
  it('should reach active after one toggle', (done) => {
    const authService = interpret(exampleMachine).onTransition((state) => {
      // this is where you expect the state to eventually
      // be reached
      if (state.matches('active')) {
        done()
      }
    })

    authService.start()

    // send zero or more events to the service that should
    // cause it to eventually reach its expected state
    authService.send('TOGGLE')
  })
})
