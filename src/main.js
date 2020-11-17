import Vue from 'vue'
import { Button, Cell, Collapse, CollapseItem, Field, Tab, Tabs, Notify, Toast } from 'vant'
import App from './App.vue'
import router from './router'
import api from './api'

Vue.config.productionTip = false

Vue.prototype.$api = api

Vue.use(Button)
Vue.use(Cell)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Field)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Notify)
Vue.use(Toast)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
