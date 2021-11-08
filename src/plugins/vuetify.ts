import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import en from '@/locales/vuetify/en'
import es from '@/locales/vuetify/es'
import fr from '@/locales/vuetify/fr'
import colors from 'vuetify/lib/util/colors'
import { createTranslator, SupportedLocales } from '../i18n'

Vue.use(Vuetify)

const defaultLocale = 'en'

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#3eb1c8',
        secondary: '#4f5858',
        accent: '#3eb1c8',
        error: '#ef3340',
        info: '#2972fa',
        success: '#00ab84',
        warning: '#ffc72c',
        background: colors.grey.lighten3
      }
    }
  },
  lang: {
    t: (key, ...params) => createTranslator(defaultLocale as SupportedLocales),
    current: 'en'
  }
})
