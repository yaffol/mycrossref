import { assign, createMachine, Sender } from 'xstate'

interface UserDetails {
  username: string;
}

export type AuthenticationMachineContext = {
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
              target: 'checkIfLoggedIn'
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
              target: 'checkIfLoggedIn'
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
        checkIfLoggedIn: () => async (
          send: Sender<AuthenticationMachineEvent>
        ) => {
        // Perform some async check here
          const isLoggedIn = false
          if (isLoggedIn) {
            send({
              type: 'REPORT_IS_LOGGED_IN',
              userDetails: {
                username: 'demo_user@name.com'
              }
            })
          } else {
            send({
              type: 'REPORT_IS_LOGGED_OUT'
            })
          }
        }
      },
      actions: {
        navigateToAuthPage: () => {
        // When the user is logged out, we
        // should take them to the /auth route
        },
        assignUserDetailsToContext: assign((context, event) => {
          if (event.type !== 'REPORT_IS_LOGGED_IN' && event.type !== 'LOG_IN') {
            return {}
          }
          return {
            userDetails: event.userDetails
          }
        }),
        clearUserDetailsFromContext: assign((context) => {
          return { userDetails: undefined }
        })
      }
    }
  )

export default authenticationMachine
