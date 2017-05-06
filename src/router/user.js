import Pages from '../pages';
module.exports = {
  path: 'user',
  component: Pages.Abstract,
  name: '用户管理',
  iconClass: 'el-icon-setting',
  children: [
    {
      path: 'user',
      component: Pages.User,
      name: '用户管理',
      imgUrl: 'https://o0p2g4ul8.qnssl.com/vsite%2Fbackground.jpg'
    }
  ]
};
