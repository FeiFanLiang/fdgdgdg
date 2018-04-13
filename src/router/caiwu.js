const _import = require('./_import_' + process.env.NODE_ENV)
import Pages from '../pages'

export default {
  path: 'order',
  component: Pages.Abstract,
  name: '财务',
  redirect: '/order/CarOrderManage',
  iconClass: 'dingdan',
  children: [
    {
      path: 'HotelsOrder',
      component: _import('order/hotels-order'),
      name: '酒店订单'
    },
    {
      path: 'FukuanList',
      component: _import('order/fukuan-list'),
      name: '待付款列表'
    },
    {
      path: 'Fukuan',
      component: _import('order/fukuan'),
      name: '付款',
      meta: {
        hidden: true
      }
    },
    {
      path: 'JietuList',
      component: _import('order/jietu-list'),
      name: '待截图列表'
    },
    {
      path: 'CheckFukuan',
      component: _import('order/check-fukuan'),
      name: '待对账付款列表'
    },
    {
      path: 'CheckShoukuan',
      component: _import('order/check-shoukuan'),
      name: '待对账收款列表'
    },
    {
      path: 'Shoukuan',
      component: _import('order/shoukuan'),
      name: '收款',
      meta: {
        hidden: true
      }
    },
    {
      path: 'Wanjie',
      component: _import('order/wanjie'),
      name: '待完结列表'
    },
    {
      path: 'HotelsOrderEnd',
      component: _import('order/hotels-order-end'),
      name: '全部完成订单'
    },
    {
      path: 'down',
      component: _import('order/down'),
      name: '支付明细'
    },
    {
      path: 'OrderReport',
      component: _import('order/order-report'),
      name: '销售报表'
    },
    {
      path: 'PaymentCheck',
      component: _import('order/payment-check'),
      name: '财务流水'
    }
  ]
}
