import Pages from '../pages'
export default {
  path: 'dwz',
  component: Pages.Dwz,
  name: '短链接信息',
  redirect: '/dwz/dwz',
  iconClass: 'el-icon-setting',
  children: [
    {
      path: 'dwz',
      component: Pages.Dwz,
      name: '短链接信息'
    }
  ]
}
