import Vue from 'vue';
import Pages from '../pages';

const root = Vue.component('root', {
  template: '<router-view></router-view>'
});

let routes = [
  {
    path: '/test',
    component: Pages.Test,
    name: 'test'
  },
  {
    path: '/testone',
    component: Pages.TestOne,
    name: 'testone'
  },
  {
    path: '/login',
    component: Pages.Login,
    name: 'login',
    meta: {
      hidden: true
    }
  },
  {
    path: '/register',
    component: Pages.Register,
    name: 'register',
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
      // hotel
      {
        path: 'hotel',
        component: Pages.Abstract,
        name: '酒店',
        iconClass: 'el-icon-setting',
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
            path: '/HotelBaseAdd',
            component: Pages.HotelBaseAdd,
            name: 'HotelBaseAdd',
            meta: {
              hidden: true
            }
          },
          {
            path: '/HotelBaseEdit/:id',
            component: Pages.HotelBaseEdit,
            name: 'HotelBaseEdit',
            meta: {
              hidden: true
            }
          }
        ]
      },
      // policy
      {
        path: 'policy',
        component: Pages.Abstract,
        name: '政策',
        iconClass: 'el-icon-setting',
        children: [
          {
            path: 'pay-company',
            name: '银行信息',
            component: Pages.PayCompany,
            imgUrl: 'https://o0p2g4ul8.qnssl.com/vsite%2Fbackground.jpg'
          },
          {
            path: 'pay-type',
            name: 'PayType',
            component: Pages.PayType,
            imgUrl: 'https://o0p2g4ul8.qnssl.com/vsite%2Fbackground.jpg'
          },
          {
            path: 'hotel-paymode',
            name: '支付方式',
            component: Pages.HotelPayMode,
            imgUrl: 'https://o0p2g4ul8.qnssl.com/vsite%2Fbackground.jpg'
          },
          {
            path: 'PolicyImages',
            name: '政策图片',
            component: Pages.PolicyImages,
            imgUrl: 'https://o0p2g4ul8.qnssl.com/vsite%2Fbackground.jpg'
          }
        ]
      },
      // order
      {
        path: 'order',
        component: Pages.Abstract,
        name: '订单',
        iconClass: 'el-icon-setting',
        children: [
          {
            path: 'Order',
            component: Pages.Order,
            name: '订单',
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
