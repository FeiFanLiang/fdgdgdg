<<<<<<< HEAD
import Vue from 'vue'
import Pages from '../pages'
import HotelBaseAdd from '../pages/policy/hotel-base/HotelBaseAdd'
import HotelBaseEdit from '../pages/policy/hotel-base/HotelBaseEdit'
=======
import Vue from 'vue';
import Pages from '../pages';
import HotelBaseAdd from '../pages/policy/hotel-base/HotelBaseAdd';
>>>>>>> fd0a6ad6e694a635d2dc65b2ebaaa42fe8a1e52e

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
            path: 'bank-information',
            name: '银行信息',
            component: Pages.BankInformation,
            imgUrl: 'https://o0p2g4ul8.qnssl.com/vsite%2Fbackground.jpg'
          },{
            path: 'hotel-payinfo',
            name: '酒店账户信息',
            component: Pages.HotelPayInfo,
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
