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
const childrenOne = [
  hotelRoute, // 酒店
  showRoute, // 展示信息
  orderRoute, // 订单
  fleetRoute, // 车队
  evaluateScanRoute, // 扫码 链接
  wechatRoute, // 微信
  policyRoute, // 政策
  roleRoute, // 角色
  userRoute, // 用户
  dwz // 短链接
]
const childrenTwo = [
  hotelRoute, // 酒店
  showRoute, // 展示信息
  orderRoute, // 订单
  fleetRoute, // 车队
  evaluateScanRoute // 扫码 链接
]
/**
 * 获取到json数据
 * 根据json数据动态拼装成路由信息
 * 根据路由信息加载路由
 *
 * 维护json数据 增删改
 */
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
  }
]

export function getPermissionRoute (role) {
  let asyncRoute
  if (role === 'admin') {
    asyncRoute = asyncRoute = [
      {
        path: '/',
        component: root,
        name: '主页',
        meta: {
          requiresAuth: true
        },
        children: childrenOne
      },

      {
        path: '*',
        redirect: { path: '/404' }
      }
    ]
  } else {
    asyncRoute = [
      {
        path: '/',
        component: root,
        name: '主页',
        meta: {
          requiresAuth: true
        },
        children: childrenTwo
      },
      {
        path: '*',
        redirect: { path: '/404' }
      }
    ]
  }
  return asyncRoute
}

export default routes
