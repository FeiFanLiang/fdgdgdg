import Vue from 'vue';
import Pages from '../pages';

const root = Vue.component('root', {
  template: '<router-view></router-view>'
});

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
            path: 'HotelBase',
            component: Pages.HotelBase,
            name: '酒店基础信息',
            imgUrl: 'https://o0p2g4ul8.qnssl.com/vsite%2Fbackground.jpg'
          },
          {
            path: 'HotelBaseAdd',
            component: Pages.HotelBaseAdd,
            name: '添加酒店',
            meta: {
              hidden: true
            }
          },
          {
            path: 'HotelBaseEdit/:ID',
            component: Pages.Abstract,
            name: 'HotelBaseEdit',
            children: [
              {
                path: '',
                component: Pages.HotelBaseEdit,
                name: 'HotelBaseEditBase'
              },
              {
                path: 'policy',
                component: Pages.HotelPolicyList,
                name: 'HotelBaseEdit.PolicyList'
              },
              {
                path: 'room',
                component: Pages.HotelRoomList,
                name: 'HotelBaseEdit.RoomList'
              },
              {
                path: 'platform',
                component: Pages.HotelPlatformInfo,
                name: 'HotelBaseEdit.Platform'
              },
              {
                path: 'price',
                component: Pages.HotelPrice,
                name: 'HotelBaseEdit.Price'
              }
            ],
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
            name: '公司支付账号',
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
      },
      // images
      {
        path: 'images',
        component: Pages.Abstract,
        name: '截图信息',
        iconClass: 'el-icon-picture',
        children: [
          {
            path: 'imagesInfo',
            component: Pages.ImagesInfo,
            name: '截图信息',
            imgUrl: 'https://o0p2g4ul8.qnssl.com/vsite%2Fbackground.jpg'
          },
          {
            path: 'imagesInfoAdd',
            component: Pages.ImagesInfoAdd,
            name: 'imagesInfoAdd',
            meta: {
              hidden: true
            }
          },
          {
            path: 'imagesInfoEdit/:id',
            component: Pages.ImagesInfoEdit,
            name: 'imagesInfoEdit',
            meta: {
              hidden: true
            }
          },
          {
            path: 'imagesInfoList/:id',
            component: Pages.ImagesInfoList,
            name: 'imagesInfoList',
            meta: {
              hidden: true
            }
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
