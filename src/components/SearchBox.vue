<template>
    <v-text-field
      prepend-inner-icon="mdi-magnify"
      placeholder="Search"
      :class="{'expanding-search': true, 'closed': searchClosed   }"
      :value="searchText"
      @focus="toggle"
      @blur="toggle"
      @input="onChange"
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
import { defineComponent, computed } from '@vue/composition-api'
import { useSearchService } from '@/statemachines/search.machine'
import { StateValue } from 'xstate'

export default defineComponent({
  name: 'SearchButton',
  setup () {
    const searchBoxToggleMachine = useSearchService()
    const searchText = computed(() => {
      // useActor type bug https://github.com/statelyai/xstate/issues/2727
      /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
      // @ts-ignore
      return searchBoxToggleMachine.state.value.context.text
    })
    const toggle = () => {
      /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
      // @ts-ignore
      searchBoxToggleMachine.send('TOGGLE')
    }
    const onChange = (e: string) => {
      searchBoxToggleMachine.send({
        /*
      Ignore upstream type definition bug
      https://github.com/statelyai/xstate/issues/2727
       */
        /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
        // @ts-ignore
        type: 'REPORT_TEXT_CHANGE',
        /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
        // @ts-ignore
        text: e
      })
    }
    return {
      searchBoxToggleMachine, searchText, onChange, toggle
    }
  },
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
