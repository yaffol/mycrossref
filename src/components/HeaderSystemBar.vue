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

export default defineComponent({
  name: 'HeaderBar',
  props: {
    authMachine: Object
  },
  components: { AppLogo, SearchButton, LoginButton, LanguageMenu }
})
</script>

<style scoped>

</style>
