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

export default defineComponent({
  name: 'SearchButton',
  props: {
    searchBoxToggleMachine: {
      type: Object,
      required: true
    }
  },
  setup () {
    return {}
  },
  data: () => ({
    searchText: ''
  }),
  computed: {
    searchBoxState (): string {
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
    searchText: function () {
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
