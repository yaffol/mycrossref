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
      <login-button/>
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
  useAuthService
} from '@/statemachines/app.machine'
import { StateMachineService } from '@/statemachines/utils'
import { useActor } from 'xstate-vue2'

export default defineComponent({
  name: 'HeaderBar',
  setup () {
    const service = useAuthService()
    const authMachine = useActor(service)
    return {
      authMachine
    }
  },
  components: { AppLogo, SearchButton, LoginButton, LanguageMenu }
})
</script>

<style scoped>

</style>
