import Pages from '../pages';
module.exports = {
  path: 'policy',
  component: Pages.Abstract,
  name: '政策',
  iconClass: 'el-icon-setting',
  children: [
    {
      path: 'pay-company',
      name: '公司支付账号',
      component: Pages.PayCompany,
      imgUrl: 'https://o0p2g4ul8.qnssl.com/vsite%2Fbackground.jpg'
    },
    {
      path: 'hotel-paymode',
      name: '支付方式',
      component: Pages.HotelPayMode,
      imgUrl: 'https://o0p2g4ul8.qnssl.com/vsite%2Fbackground.jpg'
    }
  ]
};
