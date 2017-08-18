import Pages from '../pages'
export default {
  path: 'evaluate-scan',
  component: Pages.Abstract,
  name: '扫码&统计',
  redirect: '/evaluate-scan/driver-evaluate',
  iconClass: 'el-icon-setting',
  children: [
    {
      path: 'driver-evaluate',
      name: '业绩统计',
      component: Pages.DriverEvaluate
    },
    {
      path: 'weixin-scan-code',
      name: '扫码链接',
      component: Pages.WeixinScanCode
    },
  ]
}
