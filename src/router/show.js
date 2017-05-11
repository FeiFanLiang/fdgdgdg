import Pages from '../pages';
module.exports = {
  path: 'show',
  component: Pages.Abstract,
  name: '展示管理',
  iconClass: 'el-icon-setting',
  children: [
    {
      path: 'hotel',
      component: Pages.HotelShow,
      name: '酒店展示列表',
      imgUrl: 'https://o0p2g4ul8.qnssl.com/vsite%2Fbackground.jpg'
    },
    {
      path: 'hotel/:ID',
      component: Pages.HotelShowAdd,
      name: '添加酒店展示',
      imgUrl: 'https://o0p2g4ul8.qnssl.com/vsite%2Fbackground.jpg',
      meta: {
        hidden: true
      }
    }
  ]
};
