const _import = require('./_import_' + process.env.NODE_ENV)
import Pages from '../pages'

export default {
  path: 'policy',
  component: Pages.Abstract,
  name: '政策',
  redirect: '/policy/pay-company',
  iconClass: 'zhengce',
  children: [
    {
      path: 'pay-company',
      name: '公司支付账号',
      component: _import('policy/pay-company/pay-company')
    },
    {
      path: 'hotel-paymode',
      name: '支付方式',
      component: _import('policy/hotel-paymode/hotel-paymode')
    }
  ]
}
