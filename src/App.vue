<template>
  <!-- App.vue -->

  <v-app>
    <nav-drawer v-model="drawer"/>
    <header-bar :auth-machine="authMachine"></header-bar>
    <v-main>
      <v-toolbar dense dark :class="toolbarColour">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Home</v-toolbar-title>
        <v-spacer></v-spacer>
          <search-button :search-box-toggle-machine="searchBoxMachine"/>
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
import HeaderBar from '@/components/HeaderSystemBar.vue'
import NavDrawer from '@/components/NavDrawer.vue'
import authenticationMachine from '@/statemachines/AuthenticationMachine'
import searchBoxToggleMachine from '@/statemachines/SearchBoxToggleMachine'
import { useInterpret, useActor } from 'xstate-vue2'
import { StateMachineService, interpretMachineToService } from '@/statemachines/utils'
import SearchButton from '@/components/SearchButton.vue'

export default defineComponent({
  name: 'App',
  components: { SearchButton, NavDrawer, HeaderBar },
  setup () {
    // const authMachineService = useInterpret(
    //   authenticationMachine,
    //   { devTools: true },
    //   (state) => {
    //     // subscribes to state changes
    //     console.log(state.value)
    //   })
    // const { state, send } = useActor(authMachineService)
    // const authMachine: StateMachineService = {
    //   service: authMachineService,
    //   state: state,
    //   send: send
    // }
    const authMachine = interpretMachineToService(authenticationMachine)
    const searchBoxMachine = interpretMachineToService(searchBoxToggleMachine)
    const toolbarColour = computed(() => {
      return authMachine.state.value.value === 'loggedIn' ? 'primary' : 'secondary'
    })
    return { authMachine, searchBoxMachine, toolbarColour }
  },
  data: () => ({
    drawer: false
  })
})
</script>
