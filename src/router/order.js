import Pages from '../pages';
module.exports = {
  path: 'order',
  component: Pages.Abstract,
  name: '订单',
  iconClass: 'el-icon-setting',
  children: [
    {
      path: 'Order',
      component: Pages.Order,
      name: '订单',
      imgUrl: 'https://o0p2g4ul8.qnssl.com/vsite%2Fbackground.jpg'
    }
  ]
};
