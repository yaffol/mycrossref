<template>
  <span>
    <v-btn
      v-if="!isLoggedIn"
      color="primary"
      class="ml-4"
      @click="authMachine.send({
              type: 'ATTEMPT_LOG_IN',
              userDetails: {
                username: 'pvale@crossref.org'
              }})"
    >{{ buttonText }}</v-btn>
    <v-menu
      v-if="isLoggedIn"
      class="ml-4"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          outlined
          v-bind="attrs"
          v-on="on"
          class="ml-4"
        >
          {{ userName }}
          <v-icon>mdi-menu-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="authMachine.send('LOG_OUT')">
          <v-list-item-title>{{ buttonText }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
</span>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useAuthService } from '@/statemachines/app.machine'
import { useActor } from 'xstate-vue2'
import { StateValue } from 'xstate'
import { has } from 'lodash'

export default defineComponent({
  name: 'LoginButton',
  setup () {
    const service = useAuthService()
    const authMachine = useActor(service)
    return {
      authMachine
    }
  },
  computed: {
    authState (): StateValue {
      return this.authMachine.state.value.value
    },
    userName (): string {
      return (typeof this.authMachine.state.value?.context?.userDetails !== 'undefined') ? this.authMachine.state.value.context.userDetails.username : ''
    },
    buttonText (): string {
      switch (this.authState) {
        case 'loggedIn':
          return 'Log out'
        default:
          return 'Log in'
      }
    },
    isLoggedIn (): boolean {
      return this.authState === 'loggedIn'
    }
  }
})
</script>
