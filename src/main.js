import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
// 挂载
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
