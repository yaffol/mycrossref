<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        outlined
        light
        v-bind="attrs"
        v-on="on"
      >
        <v-icon light left>mdi-translate</v-icon>
        {{ $vuetify.lang.t('$vuetify.language_menu_button') }}
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(item) in locales"
        :key="item.title"
        @click="changeLocale(item.locale)"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">/**
 * A drop-down menu presenting the available language choices
 */
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'LanguageMenu',
  methods: {
    /**
     *
     * @param v The locale to switch to
     */
    changeLocale: function (v: string) {
      this.$vuetify.lang.current = v
    }
  },
  data: () => ({
    /**
     * The available locales
     */
    locales: [
      {
        locale: 'en',
        title: 'English'
      },
      {
        locale: 'de',
        title: 'German'
      },
      {
        locale: 'fr',
        title: 'Français'
      },
      {
        locale: 'es',
        title: 'Español'
      }
    ]
  })
})
</script>

<style scoped>

</style>
