import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'yacss/dist/yacss.min.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

/* eslint-disable-next-line */
// @ts-ignore
initTheme({
  primaryColor: 'blue',
  accentColor: 'indigo',
  classes: ['all'],
});
