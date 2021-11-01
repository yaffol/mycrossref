<template>
  <v-card>
    <v-card-title>Toggle Machine</v-card-title>
    <v-card-text>
      <v-switch data-cy="example-component__toggle-switch" @click="send('TOGGLE')"  :label="`State: ${state.value}`">
      Click me ({{ state.matches("active") ? "✅" : "❌" }})
      </v-switch>
      <span data-cy="example-component__toggle-switch--toggle-count-text">Toggled
      <strong>{{ state.context.count }}</strong> times</span>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useToggleService } from '../statemachines/example.machine'
import { examples as schema } from '@/schema'

export default defineComponent({
  setup () {
    const { state, send } = useToggleService()
    return {
      state,
      send
    }
  }
})
</script>
