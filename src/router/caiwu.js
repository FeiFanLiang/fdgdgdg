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
      path: 'PaymentCheck',
      component: _import('order/payment-check'),
      name: '财务流水'
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
      path: 'Shoukuan',
      component: _import('order/shoukuan'),
      name: '收款',
      meta: {
        hidden: true
      }
    },
    {
      path: 'FukuanList',
      component: _import('order/fukuan-list'),
      name: '待付款列表'
    },
    {
      path: 'CheckShoukuan',
      component: _import('order/check-shoukuan'),
      name: '待对账收款列表'
    },
    {
      path: 'CheckFukuan',
      component: _import('order/check-fukuan'),
      name: '待对账付款列表'
    },
    {
      path: 'Wanjie',
      component: _import('order/wanjie'),
      name: '待完结列表'
    },
  ]
}
