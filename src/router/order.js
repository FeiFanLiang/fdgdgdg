const _import = require('./_import_' + process.env.NODE_ENV)
import Pages from '../pages'

export default {
  path: 'order',
  component: Pages.Abstract,
  name: '订单',
  redirect: '/order/CarOrderManage',
  iconClass: 'dingdan',
  children: [
    {
      path: 'CarOrderManage',
      component: _import('order/car-order-manage'),
      name: '专车订单'
    },
    {
      path: 'HotelOrder',
      component: _import('order/hotel-order'),
      name: '特价房订单'
    },
    // {
    //   path: 'HotelsOrder',
    //   component: _import('order/hotels-order'),
    //   name: '酒店订单'
    // },
    // {
    //   path: 'HotelsOrderEdit/:ID/:POrderID/:type',
    //   component: _import('order/hotels-order-edit'),
    //   name: '酒店订单信息编辑',
    //   meta: {
    //     hidden: true
    //   }
    // },
    // {
    //   path: 'ShenheSave/:ID/:POrderID/:HotelPolicyID',
    //   component: _import('order/shenhe-save'),
    //   name: '订单审核',
    //   meta: {
    //     hidden: true
    //   }
    // },
    // {
    //   path: 'Huitian',
    //   component: _import('order/huitian'),
    //   name: '待回填列表'
    // },
    // {
    //   path: 'Shenhe',
    //   component: _import('order/shenhe'),
    //   name: '待审核列表'
    // },
    // {
    //   path: 'Tuigai',
    //   component: _import('order/tuigai'),
    //   name: '待退改单列表'
    // },
    // {
    //   path: 'Jietu',
    //   component: _import('order/jietu'),
    //   name: '待截图列表'
    // },
    // {
    //   path: 'PaymentCheck',
    //   component: _import('order/payment-check'),
    //   name: '财务流水'
    // },
    // {
    //   path: 'Fukuan',
    //   component: _import('order/fukuan'),
    //   name: '付款',
    //   meta: {
    //     hidden: true
    //   }
    // },
    // {
    //   path: 'Shoukuan',
    //   component: _import('order/shoukuan'),
    //   name: '收款',
    //   meta: {
    //     hidden: true
    //   }
    // },
    // {
    //   path: 'FukuanList',
    //   component: _import('order/fukuan-list'),
    //   name: '待付款列表'
    // },
    // {
    //   path: 'CheckShoukuan',
    //   component: _import('order/check-shoukuan'),
    //   name: '待对账收款列表'
    // },
    // {
    //   path: 'CheckFukuan',
    //   component: _import('order/check-fukuan'),
    //   name: '待对账付款列表'
    // },
    // {
    //   path: 'Wanjie',
    //   component: _import('order/wanjie'),
    //   name: '待完结列表'
    // },
  ]
}
