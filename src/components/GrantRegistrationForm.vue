<template>
  <span>
      <v-row class="mt-1">
    <v-col cols="12">
      <v-card>
        <v-card-title class="pa-6">
              <v-avatar color="primary">
                <span class="white--text text-h5">Gr</span>
              </v-avatar>
          <span class="text-h5 text--secondary ml-4">cracked-pots-grant.json</span>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="6">
      <json-forms
        v-bind:data="data"
        v-bind:schema="example.input.schema"
        v-bind:renderers="renderers"
        v-bind:i18n="i18n"
        @change="onChange"
      />
    </v-col>
    <v-col cols="6">
      <pre>{{ JSON.stringify(data, null, 2) }}</pre>
    </v-col>
  </v-row>
  </span>

</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { JsonForms, JsonFormsChangeEvent } from '@jsonforms/vue2'
import { vuetifyRenderers } from '@jsonforms/vue2-vuetify'
import { examples } from '@/schema'
import {
  JsonFormsI18nState
} from '@jsonforms/core'
import { createTranslator, SupportedLocales } from '../i18n'

export default defineComponent({
  name: 'ExampleJsonForms',
  components: {
    JsonForms
  },
  setup () {
    // declare a reactive property within the composition API's setup method
    const example = ref(examples[0])

    // return properties - these get merged with data() below
    return { example }
  },
  props: {
    locale: {
      required: false,
      type: String,
      default: 'en'
    }
  },
  data () {
    return {
      i18n: {
        locale: this.locale,
        translate: createTranslator(this.locale as SupportedLocales)
      } as JsonFormsI18nState,
      // freeze renderers for performance gains
      renderers: Object.freeze(vuetifyRenderers),
      data: {
      }
    }
  },

  watch: {
    // passed in a a prop from App.vue, bound to the value of this.$vuetify.lang.current
    locale (newLocale: SupportedLocales): void {
      console.log('LOCALE SWITCH', newLocale)
      this.i18n.locale = newLocale
      this.i18n.translate = createTranslator(newLocale)
    }
  },
  methods: {
    onChange (event: JsonFormsChangeEvent) {
      this.data = event.data
    }
  }
})
</script>
