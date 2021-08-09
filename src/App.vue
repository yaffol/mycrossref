<template>
  <!-- App.vue -->

  <v-app>
    <nav-drawer v-model="drawer"/>
    <header-bar :auth-machine="authMachine"></header-bar>
    <v-main>
      <v-toolbar dense dark :color="toolbarColour">
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
import { defineComponent, computed } from '@vue/composition-api'
import HeaderBar from '@/components/HeaderBar.vue'
import NavDrawer from '@/components/NavDrawer.vue'
import authenticationMachine from '@/statemachines/AuthenticationMachine'
import { useInterpret, useActor } from 'xstate-vue2'

// TODO: refine these types (no any)
interface StateMachineService {
  service:any,
  state: any,
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
    const authMachine: StateMachineService = {
      service: authMachineService,
      state: state,
      send: send
    }
    const toolbarColour = computed(() => {
      return authMachine.state.value.value === 'loggedIn' ? 'primary' : 'secondary'
    })
    return { authMachine, state, send, toolbarColour }
  },
  data: () => ({
    drawer: false
  })
})
</script>
