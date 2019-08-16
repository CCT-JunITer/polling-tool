import Vue from 'vue';
import Router from 'vue-router';
import axios from 'axios';
import Login from './views/Login.vue';
import Poll from './views/Poll.vue';
import CreatePoll from './views/CreatePoll.vue';
import Result from './views/Result.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/poll',
      name: 'poll',
      component: Poll,
    },
    {
      path: '/create',
      name: 'create',
      component: CreatePoll,
    },
    {
      path: '/result',
      name: 'result',
      component: Result,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});

router.beforeEach((to, from, next) => {
  const accessToken = Vue.cookies.get('access_token');
  const loggedIn = Vue.cookies.get('logged_in');

  if (to.path === '/') {
    next();
  }

  if (accessToken !== null) {
    if (loggedIn !== null && loggedIn === 1) {
      next();
    } else {
      axios.post('http://localhost:3000/check', {
        token: accessToken,
      }).then((res) => {
        if (res.data.success) {
          Vue.cookies.set('logged_in', 1);
          next();
        } else {
          next('/');
        }
      });
    }
  } else {
    next('/');
  }
});

export default router;
