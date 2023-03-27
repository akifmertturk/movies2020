import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  vuetify,
  el: '#app',
  template: '<App/>',
  render: h => h(App)
}).$mount('#app')
