import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import config from './config'
import global from './global'
import leftmenu from './leftmenu'
import router from './router'
import user from './userinfo'

export default new Vuex.Store({
  modules: {
    config,
    global,
    leftmenu,
    router,
    user
  }
})