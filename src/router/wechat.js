const _import = require('./_import_' + process.env.NODE_ENV)
import Pages from '../pages'

export default {
  path: 'wechat',
  component: Pages.Abstract,
  name: '微信',
  redirect: '/wechat/CustomMenu',
  iconClass: 'weixin',
  children: [
    {
      path: 'CustomMenu',
      component: _import('weichat/custom-menu'),
      name: '自定义菜单'
    },
    {
      path: 'CustomService',
      component: _import('weichat/custom-service'),
      name: '客服消息'
    },
    {
      path: 'PayWeichat',
      component: _import('weichat/pay-weichat'),
      name: '微信支付'
    },
    {
      path: 'Card',
      component: _import('weichat/card'),
      name: '卡卷功能'
    },
    {
      path: 'Datas',
      component: _import('weichat/datas'),
      name: '数据与对账',
      meta: {
        hidden: true
      }
    },
    {
      path: 'Texts',
      component: _import('weichat/texts'),
      name: '编辑器',
      meta: {
        hidden: true
      }
    }
  ]
}
