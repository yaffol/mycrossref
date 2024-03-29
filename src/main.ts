import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
import VueCompositionAPI from '@vue/composition-api'
import { inspect } from '@xstate/inspect'
import { useInspector } from '@/statemachines/utils'
import { worker } from '@/mocks/browser'

if (process.env.NODE_ENV === 'development') {
  worker.start()
}

// TODO: consider wrapping this in a test for "DEV mode"
if (useInspector()) {
  inspect({
    iframe: false
  })
}

Vue.use(VueCompositionAPI)

Vue.config.productionTip = false
Vue.prototype.$logoImageUrl = 'https://assets.crossref.org/logo/crossref-logo-100.png'

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
