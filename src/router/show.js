import Pages from '../pages';
module.exports = {
  path: 'show',
  component: Pages.Abstract,
  name: '展示信息',
  iconClass: 'el-icon-setting',
  children: [
    {
      path: 'bargains-room',
      component: Pages.BargainsRoom,
      name: '特价房型展示',
      imgUrl: 'https://o0p2g4ul8.qnssl.com/vsite%2Fbackground.jpg'
    }
  ]
};
