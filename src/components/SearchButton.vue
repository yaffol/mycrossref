<template>
    <v-text-field
      v-model="searchText"
      prepend-inner-icon="mdi-magnify"
      placeholder="Search"
      :class="{'expanding-search': true, 'closed': searchClosed   }"
      @focus="searchBoxToggleMachine.send('TOGGLE')"
      @blur="searchBoxToggleMachine.send('TOGGLE')"
      single-line
      clearable
      solo-inverted
      hide-details
      filled
      outlined
      dense
    ></v-text-field>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useAuthService } from '@/statemachines/app.machine'
import { useActor } from 'xstate-vue2'
import { useSearchService } from '@/statemachines/search.machine'
import { StateValue } from 'xstate'

export default defineComponent({
  name: 'SearchButton',
  setup () {
    const service = useSearchService()
    const searchBoxToggleMachine = useActor(service)
    return {
      searchBoxToggleMachine
    }
  },
  data: () => ({
    searchText: ''
  }),
  computed: {
    searchBoxState (): StateValue {
      return this.searchBoxToggleMachine.state.value.value
    },
    isShown (): boolean {
      return this.searchText.length > 0 || this.searchBoxState === 'shown'
    },
    searchClosed (): boolean {
      return this.searchBoxState === 'hidden'
    }
  },
  watch: {
    searchText: function (): void {
      this.searchBoxToggleMachine.send({ type: 'REPORT_TEXT_CHANGE', text: this.searchText })
    }
  }
})
</script>

<style lang="sass">
  .v-input.expanding-search
    transition: max-width 0.3s ease-out
    max-width: 200px
    &.closed
      transition: max-width 0.3s ease-in
      max-width: 45px
</style>
