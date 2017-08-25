const _import = require('./_import_' + process.env.NODE_ENV)

export default {
  path: 'dwz',
  component: _import('dwz/dwz'),
  name: '短链接信息',
  redirect: '/dwz/dwz',
  iconClass: 'lianjie',
  children: [
    {
      path: 'dwz',
      component: _import('dwz/dwz'),
      name: '短链接信息'
    }
  ]
}
