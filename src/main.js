import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css";
// import ECharts from 'vue-echarts'
// import 'echarts/lib/chart/line'
// Vue.component('chart', ECharts)
// import myCharts from './comm/js/myCharts.js'
// Vue.use(myCharts)
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.use(ElementUI);

// Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
