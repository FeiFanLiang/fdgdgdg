import 'babel-polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './libs/date'
import { Breadcrumb } from 'components'
import DeleteButton from 'components/common/delete-button.vue'
import CustomTable from 'components/common/custom-table.vue'
import CustomTableCopy from 'components/common/custom-table-copy.vue'
import CustomSearch from 'components/common/custom-search.vue'
import CustomSearchCopy from 'components/common/custom-search-copy.vue'

axios.defaults.withCredentials = true

axios.defaults.timeout = 3 * 60 * 1000

import App from './app.vue'
import routes from './router'

import './styles/index.scss'

// import 'plugins/'
import 'mixin/'

// import store from './store/'
Vue.use(VueRouter)
Vue.use(ElementUI)

import NProgress from 'nprogress'

Vue.component('db-breadcrumb', Breadcrumb)
Vue.component('DeleteButton', DeleteButton)
Vue.component('CustomTable', CustomTable)
Vue.component('CustomTableCopy', CustomTableCopy)
Vue.component('CustomSearch', CustomSearch)
Vue.component('CustomSearchCopy', CustomSearchCopy)

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

axios.interceptors.request.use(
  function (config) {
    // if (config.url.indexOf('weixinredirect.qdjp.cn') > -1) {
    //   config.withCredentials = false
    // }
    // console.log(config)
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

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
  router
  // store
}).$mount('#app')
