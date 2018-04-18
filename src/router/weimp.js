const _import = require('./_import_' + process.env.NODE_ENV)
import Pages from '../pages'

export default {
  path: 'business',
  component: Pages.Abstract,
  name: '业务信息',
  redirect: '/business/hotel-business',
  iconClass: 'dingdan',
  children: [
    {
      path: 'hotel-business',
      name: '业务信息',
      component: _import('order/hotel-business')
    }
  
 
  ]
}
