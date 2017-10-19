const _import = require('./_import_' + process.env.NODE_ENV)

export default {
  path: 'test',
  component: _import('test/test'),
  name: '测试专用',
  redirect: '/test/test',
  iconClass: 'lianjie',
  children: [
    {
      path: 'test',
      component: _import('test/test'),
      name: '测试专用'
    }
  ]
}
