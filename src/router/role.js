import Pages from '../pages';
module.exports = {
  path: 'role',
  component: Pages.Abstract,
  name: '角色管理',
  redirect: '/role/role',
  iconClass: 'el-icon-setting',
  children: [
    {
      path: 'role',
      component: Pages.Role,
      name: '角色管理',
    }
  ]
};
