<template>
  <v-img :src=this.URL_LOGO_HORIZONTAL_RECTANGLE alt="Crossref logo" aspect-ratio="1.538"
         max-height="50px" max-width="72px" min-height="36px" min-width="72px"/>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { URL_LOGO_HORIZONTAL_RECTANGLE } from '@/constants/urls'

export default defineComponent({
  name: 'AppLogo',
  setup () {
    return {
      // This is deliberately not reactive
      URL_LOGO_HORIZONTAL_RECTANGLE
    }
  }
})
</script>

<style scoped>

</style>
