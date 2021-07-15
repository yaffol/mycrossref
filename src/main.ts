import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI)

Vue.config.productionTip = false
Vue.prototype.$logoImageUrl = 'https://assets.crossref.org/logo/crossref-logo-100.png'

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
