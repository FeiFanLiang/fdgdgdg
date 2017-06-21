import Pages from '../pages'
export default {
  path: 'user',
  component: Pages.Abstract,
  name: '用户管理',
  redirect: '/user/user',
  iconClass: 'el-icon-setting',
  children: [
    {
      path: 'user',
      component: Pages.User,
      name: '用户管理'
    }
  ]
}
