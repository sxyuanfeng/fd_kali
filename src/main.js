import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router/index';

Vue.use(ElementUI);

Vue.config.productionTip = false;

//设置BUS
const Bus = new Vue();

Vue.prototype.$bus = Bus;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
