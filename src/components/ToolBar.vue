<template>
  <v-toolbar dense dark :class="toolbarColour">
    <v-app-bar-nav-icon @click="sendUpdateDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <search-button/>
  </v-toolbar>
</template>

<script type="ts">
import { computed, defineComponent } from '@vue/composition-api'
import { useSearchService } from '@/statemachines/search.machine'
import { useAuthService } from '@/statemachines/auth.machine'
import SearchButton from '@/components/SearchBox.vue'

export default defineComponent({
  name: 'Toolbar',
  components: {
    SearchButton
  },
  props: {
    drawer: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: false
    }
  },
  setup () {
    const searchBoxMachine = useSearchService()
    const authMachine = useAuthService()
    const toolbarColour = computed(() => {
      return authMachine.state.value.value === 'loggedIn' ? 'primary' : 'secondary'
    })
    return { toolbarColour, searchBoxMachine, authMachine }
  },
  methods: {
    sendUpdateDrawer () {
      this.$emit('update:drawer')
    }
  }
})
</script>
