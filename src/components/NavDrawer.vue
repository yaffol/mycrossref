<template>
  <v-navigation-drawer
    v-model="localDrawer"
    temporary
    app
  >
    <v-system-bar color="secondary"></v-system-bar>
<!--    <v-img :src="this.$logoImageUrl"></v-img>-->
    <v-list>
      <v-list-item class="py-6 py-xs-2">
        <app-logo></app-logo>
      </v-list-item>

      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            John Leider
          </v-list-item-title>
          <v-list-item-subtitle>john@vuetifyjs.com</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-icon>mdi-menu-down</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import AppLogo from '@/components/AppLogo.vue'

export default defineComponent({
  name: 'NavDrawer',
  components: { AppLogo },
  props: {
    value: {
      type: Boolean
    }
  },
  data: () => ({
    localDrawer: false,
    fish: 1
  }),
  watch: {
    value: function () {
      this.localDrawer = this.value
    },
    localDrawer: function () {
      this.$emit('input', this.localDrawer)
    }
  }
})
</script>

<style scoped>

</style>
