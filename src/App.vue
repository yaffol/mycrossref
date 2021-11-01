<template>
  <!-- App.vue -->

  <v-app :style="{background: $vuetify.theme.themes[theme].background}">
    <nav-drawer v-model="drawer"/>
    <header-bar></header-bar>
    <v-main>
      <toolbar v-bind:drawer="drawer" v-on:update:drawer="drawer = !drawer" title="Page Title"/>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <v-row class="mt-1">
          <v-col cols="12">
            <v-card>
              <v-card-text class="pa-6">
                <v-btn color="primary" @click="currentComponent='ExampleJsonForms'">JSON Forms example</v-btn>
                <v-btn class="ml-4" outlined color="primary" @click="currentComponent='ExampleComponent'">Toggle component exmaple</v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-card elevation="0">
              <v-card-text>
                <v-row>
                  <v-col cols="12">
                    <component v-bind:is="currentComponent"></component>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

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
import { VCard, VBtn } from 'vuetify/lib'
import HeaderBar from '@/components/HeaderBar.vue'
import NavDrawer from '@/components/NavDrawer.vue'
import Toolbar from '@/components/ToolBar.vue'
import { provideAuthService } from '@/statemachines/auth.machine'
import { provideSearchService } from '@/statemachines/search.machine'
import { useActor } from 'xstate-vue2'
import colors from 'vuetify/lib/util/colors'
import ExampleComponent from '@/components/ExampleComponent.vue'
import ExampleJsonForms from '@/components/ExampleJsonForms.vue'
import { provideToggleService } from '@/statemachines/example.machine'

export default defineComponent({
  name: 'App',
  components: { Toolbar, NavDrawer, HeaderBar, ExampleJsonForms, ExampleComponent, VCard, VBtn },
  setup () {
    const toggleService = provideToggleService()
    const toggleMachine = useActor(toggleService)
    const authService = provideAuthService()
    const searchService = provideSearchService()
    const authMachine = useActor(authService)
    const searchBoxMachine = useActor(searchService)
    // Declare a computed value
    const toolbarColour = computed(() => {
      return authMachine.state.value.value === 'loggedIn' ? 'primary' : 'secondary'
    })
    const components = ['ExampleComponent', 'ExampleJsonForms']
    const currentComponent = components[1]
    return { backgroundColour: toolbarColour, currentComponent, authService: authService, authMachine, searchBoxMachine, toolbarColour }
  },
  data: () => ({
    drawer: false,
    // TODO: wire up theme choice to $vuetify property
    theme: 'light'
  }),
  computed: {
  }
})
</script>
