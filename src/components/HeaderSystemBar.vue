<template>
  <div>
    <v-app-bar
      app
      flat
      color="white"
    >
      <a href="/">
        <v-img src="https://assets.crossref.org/logo/crossref-logo-100.png" alt="Crossref logo" aspect-ratio="1.538"
             max-height="50px" max-width="72px" min-height="36px" min-width="72px"/>
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

export default defineComponent({
  name: 'HeaderBar',
  props: {
    authMachine: Object
  },
  components: { SearchButton, LoginButton, LanguageMenu }
})
</script>

<style scoped>

</style>
