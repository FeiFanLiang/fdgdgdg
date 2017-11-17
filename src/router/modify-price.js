const _import = require('./_import_' + process.env.NODE_ENV)

export default {
  path: 'modify-price',
  component: _import('modify-price/modify-price'),
  name: '比价',
  redirect: '/modify-price/modify-price',
  iconClass: 'lianjie',
  children: [
    {
      path: 'modify-price',
      component: _import('modify-price/modify-price'),
      name: '比价'
    }
  ]
}
