<template>
  <span>
    <v-btn
      v-if="!isLoggedIn"
      color="primary"
      class="ml-4"
      @click="authMachine.send({
              type: 'LOG_IN',
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

export default defineComponent({
  name: 'LoginButton',
  props: {
    authMachine: {
      type: Object,
      required: true
    }
  },
  setup () {
    return {}
  },
  computed: {
    authState (): string {
      return this.authMachine.state.value.value
    },
    userName (): string {
      if (
        !this.authMachine.state.value.context
      ) {
        return ''
      }
      if (!this.authMachine.state.value.context.userDetails) {
        return ''
      }
      if (!this.authMachine.state.value.context.userDetails.username) {
        return ''
      }
      return this.authMachine.state.value.context.userDetails.username
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
