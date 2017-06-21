import Pages from '../pages'
export default {
  path: 'policy',
  component: Pages.Abstract,
  name: '政策',
  redirect: '/policy/pay-company',
  iconClass: 'el-icon-setting',
  children: [
    {
      path: 'pay-company',
      name: '公司支付账号',
      component: Pages.PayCompany
    },
    {
      path: 'hotel-paymode',
      name: '支付方式',
      component: Pages.HotelPayMode
    }
  ]
}
