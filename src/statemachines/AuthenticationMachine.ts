import { assign, createMachine, Sender } from 'xstate'
import { fetchLoginState } from '@/services/fetchers'
import { context } from 'msw'
import { Response } from '@/api/Auth'
import { AxiosResponse } from 'axios'

export interface AttemptedUserDetails {
  username: string;
}

export interface UserDetails {
  username: string;
}

export type AuthenticationMachineContext = {
  attemptedUserDetails?: AttemptedUserDetails,
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

const authenticationMachine = createMachine<
  AuthenticationMachineContext,
  AuthenticationMachineEvent
  >(
    {
      id: 'authentication',
      initial: 'idle',
      states: {
        idle: {
          on: {
            ATTEMPT_LOG_IN: {
              actions: 'assignAttemptedUserDetailsToContext',
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
            const loginResponse = await fetchLoginState(ctx.attemptedUserDetails)
            console.log(loginResponse)
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
        assignAttemptedUserDetailsToContext: assign((context, event) => {
          if (event.type !== 'ATTEMPT_LOG_IN') {
            return {}
          }
          return {
            attemptedUserDetails: event.userDetails
          }
        }),
        assignUserDetailsToContext: assign((context, event) => {
          if (event.type !== 'REPORT_IS_LOGGED_IN' && event.type !== 'LOG_IN') {
            return {}
          }
          debugger
          const attemptedUserDetails: AttemptedUserDetails = (({ username }) => ({ username }))(event.userDetails)
          return {
            userDetails: attemptedUserDetails
          }
        }),
        clearUserDetailsFromContext: assign((context) => {
          return { userDetails: undefined }
        })
      }
    }
  )

export default authenticationMachine
