import Pages from '../pages';
module.exports = {
  path: 'show',
  component: Pages.Abstract,
  name: '展示管理',
  iconClass: 'el-icon-setting',
  children: [
    {
      path: 'hotel/:ID',
      component: Pages.HotelShow,
      name: '酒店展示管理',
      imgUrl: 'https://o0p2g4ul8.qnssl.com/vsite%2Fbackground.jpg'
    }
  ]
};
