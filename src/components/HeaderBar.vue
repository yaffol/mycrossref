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
import AppLogo from '@/components/AppLogo.vue'
import {
  useAuthService
} from '@/statemachines/auth.machine'

export default defineComponent({
  name: 'HeaderBar',
  setup () {
    const authMachine = useAuthService()
    return {
      authMachine
    }
  },
  components: { AppLogo, LoginButton, LanguageMenu }
})
</script>

<style scoped>

</style>
