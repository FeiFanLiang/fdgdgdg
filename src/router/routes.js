<<<<<<< HEAD

import Vue from 'vue'
import Pages from '../pages'
import HotelBaseAdd from '../pages/policy/hotel-base/HotelBaseAdd'
import HotelBaseEdit from '../pages/policy/hotel-base/HotelBaseEdit'
=======
import Vue from 'vue';
import Pages from '../pages';
import HotelBaseAdd from '../pages/policy/hotel-base/HotelBaseAdd';
import HotelBaseEdit from '../pages/policy/hotel-base/HotelBaseEdit';
>>>>>>> 1d45d3bc4e894dfb3aa3a8efd04625c5bbb9dcf0

const root = Vue.component('root', {
  template: '<router-view></router-view>'
});

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
    path: '/HotelBaseAdd',
    component: HotelBaseAdd,
    name: 'HotelBaseAdd'
  },
  {
    path: '/HotelBaseEdit',
    component: HotelBaseEdit,
    name: 'HotelBaseEdit'
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
        path: 'policy',
        component: Pages.Abstract,
        name: '政策',
        iconClass: 'el-icon-message',
        children: [
          {
            path: 'HotelPlatform',
            component: Pages.HotelPlatform,
            name: '酒店平台',
            imgUrl: 'https://o0p2g4ul8.qnssl.com/vsite%2Fbackground.jpg'
          },
          {
            path: 'HotelBase',
            component: Pages.HotelBase,
            name: '酒店基础信息',
            imgUrl: 'https://o0p2g4ul8.qnssl.com/vsite%2Fbackground.jpg'
          },
          {
            path: 'pay-company',
            name: '银行信息',
            component: Pages.PayCompany,
            imgUrl: 'https://o0p2g4ul8.qnssl.com/vsite%2Fbackground.jpg'
          },
          {
            path: 'hotel-paymode',
            name: '支付方式',
            component: Pages.HotelPayMode,
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
      }
    ]
  },
  {
    path: '*',
    redirect: { path: '/404' }
  }
];
let menuCount = routes.length;
routes[menuCount - 2].children.forEach(route => {
  if (route.children) {
    if (!route.meta) route.meta = {};
    route.meta.children = route.children;
  }
});

export default routes;
