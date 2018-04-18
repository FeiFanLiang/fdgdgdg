import Vue from 'vue'
import Pages from '../pages'

import hotelRoute from './hotel'
import showRoute from './show'
import orderRoute from './order'
import policyRoute from './policy'
import roleRoute from './role'
import userRoute from './user'
import fleetRoute from './fleet'
import evaluateScanRoute from './evaluate-scan'
import wechatRoute from './wechat'
import dwz from './dwz'
import wechatUser from './wechat-user'
import modifyPrice from './modify-price'
import kefuRoute from './kefu'
import caiwuRoute from './caiwu'
import qita from './qita'
import yewu from './weimp'



const children = [
  hotelRoute, // 酒店
 // showRoute, // 展示信息
 // orderRoute, // 订单
  kefuRoute, //客服
  caiwuRoute, //财务
 // yewu,
 // fleetRoute, // 车队
 // evaluateScanRoute, // 扫码 链接
 // wechatRoute, // 微信
 // policyRoute, // 政策
 // roleRoute, // 角色
 // userRoute, // 用户
 // dwz, // 短链接
 // wechatUser, // 微信用户
 // modifyPrice, // 比价
  qita //其它
]
const root = Vue.component('root', {
  template: '<router-view></router-view>'
})

let routes = [
  {
    path: '/login',
    component: Pages.Login,
    name: 'login',
    meta: {
      hidden: true,
      alone: true
    }
  },
  {
    path: '/register',
    component: Pages.Register,
    name: 'register',
    meta: {
      hidden: true,
      alone: true
    }
  },
  {
    path: '/404',
    component: Pages.NotFound,
    name: '404',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/',
    component: root,
    name: '主页',
    meta: {
      requiresAuth: true
    },
    children: children
  },
  {
    path: '*',
    redirect: { path: '/404' }
  }
]
let menuCount = routes.length
routes[menuCount - 2].children.forEach(route => {
  if (route.children) {
    if (!route.meta) route.meta = {}
    route.meta.children = route.children
  }
})

export default routes
