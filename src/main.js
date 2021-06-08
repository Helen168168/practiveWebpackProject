import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import * as filters from './filters'
Vue.config.productionTip = false

//全局注册过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
