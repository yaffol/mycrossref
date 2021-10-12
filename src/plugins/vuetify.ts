import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import en from '@/locales/en'
import es from '@/locales/es'
import fr from '@/locales/fr'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

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
    locales: { en, es, fr },
    current: 'en'
  }
})
