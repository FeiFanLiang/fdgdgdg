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
        redirect: '/hotel/HotelBase',
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
            redirect: { name: '酒店信息编辑' },
            component: Pages.Abstract,
            name: 'HotelBaseEdit',
            children: [
              {
                path: 'base',
                component: Pages.HotelBaseEdit,
                name: '酒店信息编辑'
              },
              {
                path: 'policy',
                component: Pages.HotelPolicyList,
                name: '酒店政策信息编辑'
              },
              {
                path: 'room',
                component: Pages.HotelRoomList,
                name: '酒店房间信息编辑'
              },
              {
                path: 'platform',
                component: Pages.HotelPlatformInfo,
                name: '酒店平台信息编辑'
              },
              {
                path: 'price',
                component: Pages.HotelPrice,
                name: '酒店价格信息编辑'
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
      {
        path: 'user',
        component: Pages.Abstract,
        name: '用户管理',
        iconClass: 'el-icon-setting',
        children: [
          {
            path: 'user',
            component: Pages.User,
            name: '用户管理',
            imgUrl: 'https://o0p2g4ul8.qnssl.com/vsite%2Fbackground.jpg'
          }
        ]
      },
      {
        path: 'role',
        component: Pages.Abstract,
        name: '角色管理',
        iconClass: 'el-icon-setting',
        children: [
          {
            path: 'role',
            component: Pages.Role,
            name: '角色管理',
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
