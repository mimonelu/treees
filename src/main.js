import Vue from 'vue'
import App from '@/App.vue'
import '@/registerServiceWorker'
import router from '@/router'
import store from '@/store'

import '@/assets/main.scss'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/base16-dark.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
