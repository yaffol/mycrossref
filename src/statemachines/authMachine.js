import { Machine } from 'xstate'

export const authMachine = Machine({
  id: 'authMachine',
  initial: 'unauthenticated',
  states: {
    unauthenticated: {
      id: 'unauthenticated',
      on: {
        SEND_CREDENTIALS: 'authenticating'
      }
    },
    authenticating: {
      on: {
        AUTH_SUCCESS: 'authenticated',
        AUTH_FAIL: 'unauthenticated'
      }
    },
    authenticated: {
      id: 'authenticated',
      initial: 'idle',
      states: {
        idle: {
          on: {
            ROLES_EMPTY: 'noRolesAssigned',
            ROLES_ASSIGNED: 'rolesAssigned'
          }
        },
        noRolesAssigned: {
          on: {
            RESTART: '#unauthenticated'
          }
        },
        rolesAssigned: {
          id: 'rolesAssigned',
          initial: 'idle',
          states: {
            idle: {
              on: {
                ROLE_SELECTED: '#rolesAssigned.authorisingRole',
                GO_BACK: '#unauthenticated'
              }
            },
            authorisingRole: {
              on: {
                AUTHORISE_SUCCESS: 'roleAuthorised',
                AUTHORISE_FAIL: '#authenticated.rolesAssigned'
              }
            },
            roleAuthorised: {
              on: {
                LOGOUT: '#unauthenticated'
              }
            }
          },
          on: {
            GO_BACK: '#unauthenticated'
          }
        }
      }
    }
  }
})
