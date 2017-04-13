import Vue from 'vue'
import Pages from '../pages'

const root = Vue.component('root', {
  template: '<router-view></router-view>'
})

let routes = [
  {
    path: '/login',
    component: Pages.Login,
    name: 'login',
    meta: {
      hidden: true
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
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'test',
        name: 'test',
        component: Pages.Test,
        imgUrl: 'https://o0p2g4ul8.qnssl.com/vsite%2Fbackground.jpg'
      },
      {
        path: 'list',
        component: Pages.Abstract,
        name: '列表',
        iconClass: 'el-icon-message',
        children: [
          {
            path: 'filters',
            name: '搜索条件',
            component: Pages.ListWithFilters,
            imgUrl: 'https://o0p2g4ul8.qnssl.com/vsite%2Fbackground.jpg'
          }
        ]
      },
      {
        path: 'form',
        component: Pages.Abstract,
        name: '表单',
        iconClass: 'el-icon-document',
        children: [
          {
            path: 'big-form',
            name: '简历管理',
            component: Pages.BigForm,
            imgUrl: 'https://o0p2g4ul8.qnssl.com/vsite%2Fbackground.jpg'
          }
        ]
      },
      {
        path: 'chart',
        component: Pages.chart,
        name: '图表',
        iconClass: 'el-icon-document'
        /* children: [
          {
            path: 'big-form',
            name: '简历管理',
            component: BigForm,
            imgUrl: 'https://o0p2g4ul8.qnssl.com/vsite%2Fbackground.jpg'
          }
        ]*/
      }
    ]
  },
  {
    path: '*',
    redirect: {path: '/404'}
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
