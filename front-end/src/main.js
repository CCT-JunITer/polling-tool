import Vue from 'vue';
import VueCookies from 'vue-cookies';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';

import 'vue-cirrus/dist/vue-cirrus.css';
import 'vue-cirrus';

Vue.prototype.$api = axios;

Vue.use(VueCookies);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
