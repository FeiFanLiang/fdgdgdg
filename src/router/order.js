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
    }
  ]
}
