import Pages from '../pages'
export default {
  path: 'weixin-scan-code',
  component: Pages.WeixinScanCode,
  name: '微信扫码',
  redirect: '/weixin-scan-code/weixin-scan-code',
  iconClass: 'el-icon-setting',
  children: [
    {
      path: 'weixin-scan-code',
      component: Pages.WeixinScanCode,
      name: '微信扫码'
    }
  ]
}
