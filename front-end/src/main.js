import Vue from 'vue';
import VueCookies from 'vue-cookies';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';

import 'vue-cirrus/dist/vue-cirrus.css';
import 'vue-cirrus';

const ajax = axios.create({
  baseURL: (process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : ''),
});
Vue.prototype.$api = ajax;

Vue.use(VueCookies);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
