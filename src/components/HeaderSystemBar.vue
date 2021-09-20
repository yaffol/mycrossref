<template>
  <div>
    <v-app-bar
      app
      flat
      color="white"
    >
      <a href="/">
        <app-logo></app-logo>
      </a>
      <v-spacer/>
      <language-menu/>
      <login-button :auth-machine="authMachine"/>
    </v-app-bar>
  </div>

</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import LanguageMenu from '@/components/LanguageMenu.vue'
import LoginButton from '@/components/LoginButton.vue'
import SearchButton from '@/components/SearchButton.vue'
import AppLogo from '@/components/AppLogo.vue'
import {
  useAppService
} from '@/statemachines/app.machine'
import { StateMachineService } from '@/statemachines/utils'
import { useActor } from 'xstate-vue2'

export default defineComponent({
  name: 'HeaderBar',
  setup () {
    const service = useAppService()
    const { state, send } = useActor(service)
    const authMachine: StateMachineService = {
      service: service,
      state: state,
      send: send
    }
    return {
      authMachine
    }
  },
  components: { AppLogo, SearchButton, LoginButton, LanguageMenu }
})
</script>

<style scoped>

</style>
