const _import = require('./_import_' + process.env.NODE_ENV)
import Pages from '../pages'

export default {
  path: 'evaluate-scan',
  component: Pages.Abstract,
  name: '扫码&统计',
  redirect: '/evaluate-scan/driver-evaluate',
  iconClass: 'zhanshi',
  children: [
    {
      path: 'driver-evaluate',
      name: '业绩统计',
      component: _import('fleet/evaluate-scan/driver-evaluate')
    },
    {
      path: 'weixin-scan-code',
      name: '扫码链接',
      component: _import('fleet/evaluate-scan/weixin-scan-code')
    }
  ]
}
