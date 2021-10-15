<template>
  <div>
    test 1
    <button @click="send('TOGGLE')">
      Click me ({{ state.matches("active") ? "✅" : "❌" }})
    </button>
    <code>
      Toggled
      <strong>{{ state.context.count }}</strong> times
    </code>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useToggleService } from '../statemachines/example.machine'

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
