import Pages from '../pages';
module.exports = {
  path: 'role',
  component: Pages.Abstract,
  name: '角色管理',
  iconClass: 'el-icon-setting',
  children: [
    {
      path: 'role',
      component: Pages.Role,
      name: '角色管理',
      imgUrl: 'https://o0p2g4ul8.qnssl.com/vsite%2Fbackground.jpg'
    }
  ]
};
