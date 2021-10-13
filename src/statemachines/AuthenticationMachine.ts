import { assign, createMachine, Sender } from 'xstate'
import { delay, fetchLoginState } from '@/services/fetchers'

export interface userProvidedCredentials {
  username: string;
}

export interface UserDetails {
  username: string;
}

export type AuthenticationMachineContext = {
  userProvidedCredentials?: userProvidedCredentials,
  userDetails?: UserDetails;
};

export type AuthenticationMachineEvent =
  | {
  type: 'REPORT_IS_LOGGED_IN';
  userDetails: UserDetails;
}
  | {
  type: 'REPORT_IS_LOGGED_OUT';
}
  | {
  type: 'LOG_OUT';
}
  | {
  type: 'ATTEMPT_LOG_IN';
  userDetails: UserDetails;
}
  | {
  type: 'LOG_IN';
  userDetails: UserDetails;
};

const initialContext = <AuthenticationMachineContext>{}

const authenticationMachine = createMachine<
  AuthenticationMachineContext,
  AuthenticationMachineEvent
  >(
    {
      id: 'authentication',
      context: initialContext,
      initial: 'idle',
      states: {
        idle: {
          on: {
            ATTEMPT_LOG_IN: {
              actions: 'assignUserProvidedCredentialsToContext',
              target: 'checkingIfLoggedIn'
            }
          }
        },
        checkingIfLoggedIn: {
          invoke: {
            src: 'checkIfLoggedIn',
            onError: {
              target: 'loggedOut'
            }
          },
          on: {
            REPORT_IS_LOGGED_IN: {
              target: 'loggedIn',
              actions: 'assignUserDetailsToContext'
            },
            REPORT_IS_LOGGED_OUT: 'loggedOut'
          }
        },
        loggedIn: {
          on: {
            LOG_OUT: {
              target: 'loggedOut'
            }
          }
        },
        loggedOut: {
          entry: ['navigateToAuthPage', 'clearUserDetailsFromContext'],
          on: {
            ATTEMPT_LOG_IN: {
              target: 'checkingIfLoggedIn'
            },
            LOG_IN: {
              target: 'loggedIn',
              actions: 'assignUserDetailsToContext'
            }
          }
        }
      }
    },
    {
      services: {
        checkIfLoggedIn: (ctx) => async (
          send: Sender<AuthenticationMachineEvent>
        ) => {
        // Perform some async check here
          let isLoggedIn = false
          let username = 'not logged in'
          try {
            const loginResponse = await fetchLoginState(ctx.userProvidedCredentials)
            if (loginResponse.firstName) {
              isLoggedIn = true
              username = loginResponse.firstName
            }
            if (isLoggedIn) {
              send({
                type: 'REPORT_IS_LOGGED_IN',
                userDetails: {
                  username: username
                }
              })
            } else {
              send({
                type: 'REPORT_IS_LOGGED_OUT'
              })
            }
          } catch (e) {
            console.log(e)
          }
        }
      },
      actions: {
        navigateToAuthPage: () => {
        // When the user is logged out, we
        // should take them to the /auth route
        },
        assignUserProvidedCredentialsToContext: assign((context, event) => {
          if (event.type !== 'ATTEMPT_LOG_IN') {
            return {}
          }
          return {
            userProvidedCredentials: event.userDetails
          }
        }),
        assignUserDetailsToContext: assign((context, event) => {
          if (event.type !== 'REPORT_IS_LOGGED_IN' && event.type !== 'LOG_IN') {
            return {}
          }
          const userProvidedCredentials: userProvidedCredentials = (({ username }) => ({ username }))(event.userDetails)
          return {
            userDetails: userProvidedCredentials
          }
        }),
        clearUserDetailsFromContext: assign((context) => {
          return { userDetails: undefined }
        })
      }
    }
  )

export default authenticationMachine
