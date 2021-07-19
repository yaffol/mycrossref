<template>
  <!-- App.vue -->

  <v-app>
    <nav-drawer v-model="drawer"/>
    <header-bar :auth-machine="authMachine"></header-bar>
    <v-main>
      <v-toolbar dense dark color="secondary">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Home</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-icon>mdi-magnify</v-icon>
      </v-toolbar>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
<!--        <theme />-->
        <!-- If using vue-router -->
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import HeaderBar from '@/components/HeaderBar.vue'
import NavDrawer from '@/components/NavDrawer.vue'
import authenticationMachine from '@/statemachines/AuthenticationMachine'
import { useInterpret, useActor } from 'xstate-vue2'

interface StateMachine {
  service:any,
  state: ReturnType<typeof useActor>['state'],
  send: any
}

export default defineComponent({
  name: 'App',
  components: { NavDrawer, HeaderBar },
  setup () {
    const authMachineService = useInterpret(
      authenticationMachine,
      { devTools: true },
      (state) => {
        // subscribes to state changes
        console.log(state.value)
      })
    const { state, send } = useActor(authMachineService)
    const authMachine: StateMachine = {
      service: authMachineService,
      state: state,
      send: send
    }
    return { authMachine, state, send }
  },
  data: () => ({
    drawer: false
  })
})
</script>
