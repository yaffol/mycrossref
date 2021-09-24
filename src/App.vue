<template>
  <!-- App.vue -->

  <v-app>
    <nav-drawer v-model="drawer"/>
    <header-bar></header-bar>
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
import { interpretMachineToService, StateMachineService } from '@/statemachines/utils'
import SearchButton from '@/components/SearchButton.vue'
import { provideAppService } from '@/statemachines/app.machine'
import { provideSearchService } from '@/statemachines/search.machine'
import { useActor } from 'xstate-vue2'

export default defineComponent({
  name: 'App',
  components: { SearchButton, NavDrawer, HeaderBar },
  setup () {
    const service = provideAppService()
    const searchService = provideSearchService()
    const { state, send } = useActor(service)
    const authMachine: StateMachineService = {
      service: authenticationMachine,
      state: state,
      send: send
    }
    // const authMachine = interpretMachineToService(authenticationMachine)
    const searchBoxMachine = useActor(searchService)
    // Declare a computed value
    const toolbarColour = computed(() => {
      return authMachine.state.value.value === 'loggedIn' ? 'primary' : 'secondary'
    })
    return { service, authMachine, searchBoxMachine, toolbarColour }
  },
  data: () => ({
    drawer: false
  })
})
</script>
