import 'babel-polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import { Breadcrumb } from 'components'
import DeleteButton from 'components/common/delete-button.vue'
import CustomTable from 'components/common/custom-table.vue'

axios.defaults.withCredentials = true
// const VueProgressBarOptions = {
//   color: '#13ce66',
//   failedColor: '#FF4949',
//   height: '4px'
// };
// import VueProgressBar from './libs/vue-progressbar';
// import VueAxiosProgressBarInterceptor from './libs/vue-axios-progressbar-interceptor';
// Vue.use(VueProgressBar, VueProgressBarOptions);
// Vue.use(VueAxiosProgressBarInterceptor);

// import Mock from './mock';
// Mock.bootstrap();

import App from './app.vue'
import routes from './router'
import './style.scss'

// import 'plugins/'
import 'mixin/'

import store from './store/'
Vue.use(VueRouter)
Vue.use(ElementUI)

import NProgress from 'nprogress'

Vue.component('db-breadcrumb', Breadcrumb)
Vue.component('DeleteButton', DeleteButton)
Vue.component('CustomTable', CustomTable)

export const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      NProgress.start()
    }
  }
  next()
})
router.afterEach(transition => {
  NProgress.done()
})

// axios.interceptors.request.use(function(config) {
//     return config;
// }, function(error) {

//     return Promise.reject(error);
// });

axios.interceptors.response.use(
  function (response) {
    if (response.status === 320) {
      router.replace({
        name: 'login',
        query: { redirect: router.currentRoute.fullPath }
      })
    }
    return response
  }
  // function(error) {
  //    if(error&&error.stack&&typeof error.stack==='string'&&error.stack.indexOf('XMLHttpRequest.handleError')>0){
  //     // VueRouter.push({
  //     //   path:'login'
  //     // })
  //    }else{
  //     return Promise.reject(error);
  //    }

  // }
)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
