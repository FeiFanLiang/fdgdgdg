const _import = require('./_import_' + process.env.NODE_ENV)

export default {
  path: 'wechat-user',
  component: _import('wechat-user/wechat-user'),
  name: '微信用户',
  redirect: '/wechat-user/wechat-user',
  iconClass: 'cf-c02',
  children: [
    {
      path: 'wechat-user',
      component: _import('wechat-user/wechat-user'),
      name: '微信用户'
    }
  ]
}
