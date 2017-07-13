import Pages from '../pages'
export default {
  path: 'wechat',
  component: Pages.Abstract,
  name: '微信',
  redirect: '/wechat/CustomMenu',
  iconClass: 'el-icon-picture',
  children: [
    {
      path: 'CustomMenu',
      component: Pages.CustomMenu,
      name: '自定义菜单'
    },
    {
      path: 'CustomService',
      component: Pages.CustomService,
      name: '客服消息'
    },
    {
      path: 'PayWeichat',
      component: Pages.PayWeichat,
      name: '微信支付'
    },
    {
      path: 'Card',
      component: Pages.Card,
      name: '卡卷功能'
    },
    {
      path: 'Datas',
      component: Pages.Datas,
      name: '数据与对账',
      meta: {
        hidden: true
      }
    },
    {
      path: 'Texts',
      component: Pages.Texts,
      name: '编辑器',
      meta: {
        hidden: true
      }
    },
  ]
}
