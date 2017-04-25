import 'babel-polyfill';
import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

import { Breadcrumb } from 'components';

axios.defaults.withCredentials = true;
const VueProgressBarOptions = {
  color: '#13ce66',
  failedColor: '#FF4949',
  height: '4px'
};
import VueProgressBar from './libs/vue-progressbar';
import VueAxiosProgressBarInterceptor
  from './libs/vue-axios-progressbar-interceptor';
Vue.use(VueProgressBar, VueProgressBarOptions);
Vue.use(VueAxiosProgressBarInterceptor);

// import Mock from './mock';
// Mock.bootstrap();

import App from './app.vue';
import routes from './router/routes';
import './style.scss';

// import 'plugins/'
import 'mixin/';

import store from './store/';
Vue.use(VueRouter);
Vue.use(ElementUI);

import NProgress from 'nprogress';

Vue.component('db-breadcrumb', Breadcrumb);

export const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active'
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      NProgress.start();
    }
  }
  next();
});
router.afterEach(transition => {
  NProgress.done();
});
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
