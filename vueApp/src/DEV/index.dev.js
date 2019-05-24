import Vue from 'vue'
// import Vuex from 'vuex'

import App from '@/vue/App.vue'
// import store from './store'

// load plugins
// Vue.use(Vuex)

Vue.config.productionTip = false


new Vue({
  // provide the store using the "store" option.
  // this will inject the store instance to all child components.
  // store,
  render: h => h(App)
}).$mount('#app')
