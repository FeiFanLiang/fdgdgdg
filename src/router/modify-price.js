const _import = require('./_import_' + process.env.NODE_ENV)
import Pages from '../pages'
export default {
  path: 'modify-price',
  component: Pages.Abstract,
  name: '比价',
  redirect: '/modify-price/modify-price',
  iconClass: 'lianjie',
  children: [
    {
      path: 'modify-price-once',
      component: _import('modify-price/once'),
      name: '一次性比价'
    },
    {
      path: 'modify-price-log',
      component: _import('modify-price/log'),
      name: '比价日志'
    }
    // {
    //   path: 'modify-price',
    //   component: _import('modify-price/modify-price'),
    //   name: '比价'
    // }
  ]
}
